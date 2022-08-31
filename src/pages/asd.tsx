import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillDelete, AiFillEdit, AiFillSave } from "react-icons/ai";
import Modal from "react-modal";
import "react-datepicker/dist/react-datepicker.css";
import Router from "next/router";

import {
  DashboardLayout,
  DeleteProjectModal,
  PrimaryButton,
} from "../components";
import { AuthContext } from "../contexts/AuthContext";
import { api, getAPIClient } from "../services";
import { AddNewTaskModal, TasksTable } from "../components/tasks";

Modal.setAppElement("#__next");

type DataForm = {
  name: string;
  userId: string;
};

type AddNewTaskProps = {
  id: string;
  name: string;
  responsible: string;
  status: string;
  finishDate: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
};

type Task = {
  id: string;
  name: string;
  projectId: string;
  responsible: string;
  status: string;
  finishDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

const Asd = ({ parsedProject }) => {
  const [disable, setDisable] = useState(true);
  const [error, setError] = useState("");
  const [fetchData, setFetchData] = useState(false);
  const [fetchTasks, setFetchTasks] = useState(false);
  const [isAddNewTaskModalOpen, setIsAddNewTaskModalOpen] = useState(false);
  const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] =
    useState(false);
  const [name, setName] = useState("");
  const [project, setProject] = useState(parsedProject);
  const [success, setSuccess] = useState("");
  const { register, handleSubmit } = useForm();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await api.get(`/project/${parsedProject.id}`);
      setProject(data);
    };

    fetch();
  }, [fetchData]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function clearErrorAndSuccessMsg() {
    setError("");
    setSuccess("");
  }

  function handleEdit() {
    setDisable(false);
  }

  function handleOpenDeleteProjectModal() {
    setIsDeleteProjectModalOpen(true);
  }

  function handleOpenAddNewTaskModal() {
    setIsAddNewTaskModalOpen(true);
  }

  function handleCloseDeleteProjectModal() {
    setIsDeleteProjectModalOpen(false);
  }

  function handleCloseAddNewTaskModal() {
    setIsAddNewTaskModalOpen(false);
  }

  async function handleDeleteProjectButton() {
    setDisable(true);
    handleOpenDeleteProjectModal();
  }

  async function handleEditProjectSubmit(data: DataForm) {
    const sendData = {
      name: data.name,
      userId: user.id,
    };

    try {
      await api.put(`/project/${project.id}`, sendData);
      setName("");
      setSuccess(`Projeto ${project.name} editado com sucesso!`);
      setDisable(true);
      setFetchData(!fetchData);
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleDeleteProject() {
    try {
      await api.delete(`/project/${project.id}`);
      Router.push("/projetos");
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleAddNewTask(data: AddNewTaskProps) {
    const sendData = {
      name: data.name,
      responsible: data.responsible,
      status: data.status,
      finishDate: data.finishDate,
      projectId: project.id,
    };

    try {
      await api.post("/task", sendData);
      setSuccess(`Tarefa ${data.name} adicionada com sucesso!`);
      setFetchTasks(!fetchTasks);
      handleCloseAddNewTaskModal();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <DashboardLayout user={user} title={project.name}>
      <div>
        <PrimaryButton
          onClick={handleOpenAddNewTaskModal}
          title="Adicionar nova tarefa"
        />
        <h3 className="">Tarefas:</h3>
        <TasksTable project={project} fetch={fetchTasks} />
      </div>

      <form onSubmit={handleSubmit(handleEditProjectSubmit)} className="mt-8">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Nome do projeto
        </label>
        <div className="relative mt-1 rounded-md">
          <input
            {...register("name")}
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            onFocus={() => clearErrorAndSuccessMsg()}
            id="name"
            disabled={disable}
            className={`block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              disable ? "cursor-not-allowed" : ""
            }`}
            placeholder={project.name}
          />

          <div className="mt-4 flex items-center justify-end">
            <>
              <div
                onClick={handleEdit}
                className={`focus:outline-none group relative mr-4 w-full cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-xs font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  disable ? "flex" : "hidden"
                }`}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <AiFillEdit
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Editar
              </div>

              <button
                type="submit"
                className={`focus:outline-none group relative mr-4 w-full cursor-pointer justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-xs font-medium text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                  disable ? "hidden" : "flex"
                }`}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <AiFillSave
                    className="h-5 w-5 text-green-500 group-hover:text-green-400"
                    aria-hidden="true"
                  />
                </span>
                Salvar
              </button>
            </>
            <>
              <div
                onClick={handleDeleteProjectButton}
                className="hover:bg-indiredgo-700 focus:outline-none group relative flex w-full cursor-pointer justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-xs font-medium text-white focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <AiFillDelete
                    className="h-5 w-5 text-red-500 group-hover:text-red-400"
                    aria-hidden="true"
                  />
                </span>
                Deletar projeto
              </div>
            </>
          </div>
        </div>
        {error && (
          <div className="text-start pt-4 text-sm text-red-500">{error}</div>
        )}
        {success && (
          <div className="text-start pt-4 text-sm text-green-500">
            {success}
          </div>
        )}
      </form>

      <Modal
        isOpen={isDeleteProjectModalOpen}
        onRequestClose={handleCloseDeleteProjectModal}
        overlayClassName="bg-gray-500 bg-opacity-75 fixed inset-0 z-10"
        className="absolute bottom-0 w-full rounded-md bg-white p-4 md:bottom-auto md:top-1/2 md:left-1/2 md:w-auto md:-translate-x-1/2 md:-translate-y-1/2 md:transform"
        contentLabel="Delete Project Modal"
      >
        <DeleteProjectModal
          closeModal={handleCloseDeleteProjectModal}
          deleteProject={handleDeleteProject}
        />
      </Modal>

      <Modal
        isOpen={isAddNewTaskModalOpen}
        onRequestClose={handleCloseAddNewTaskModal}
        overlayClassName="bg-gray-500 bg-opacity-75 fixed inset-0 z-10"
        className="absolute bottom-0 w-full rounded-md bg-white p-4 md:bottom-auto md:top-1/2 md:left-1/2 md:w-auto md:-translate-x-1/2 md:-translate-y-1/2 md:transform"
        contentLabel="Delete Project Modal"
      >
        <AddNewTaskModal
          closeModal={handleCloseAddNewTaskModal}
          addNewTask={handleAddNewTask}
          projectId={project.id}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default Asd;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = "d8768e16-a497-481f-8f38-50fc4e463c84";

  const apiClient = getAPIClient(ctx);
  const { ["nextauth.token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const projectData = await apiClient.get(`/project/${id}`);
  const parsedProject = JSON.parse(JSON.stringify(projectData.data));

  return {
    props: {
      parsedProject,
    },
  };
};
