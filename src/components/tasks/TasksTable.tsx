import Modal from "react-modal";
import { Fragment, useEffect, useState } from "react";

import { api } from "../../services";
import { DeleteTaskModal, EditTaskModal } from ".";

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

export const TasksTable = ({ project, fetch }) => {
  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState();
  const [filteredTask, setFilteredTask] = useState("Status");

  function handleFilteredTask(filter: string) {
    if (filter === "Status") {
      return tasks.filter((task: Task) => task.projectId === project.id);
    } else {
      return tasks.filter(
        (task: Task) => task.projectId === project.id && task.status === filter
      );
    }
  }

  const tasksToDisplay = handleFilteredTask(filteredTask);

  function handleCloseDeleteTaskModal() {
    setIsDeleteTaskModalOpen(false);
  }

  function handleOpenDeleteTaskModal(id: string) {
    setIsDeleteTaskModalOpen(true);
    setSelectedTask(id);
  }

  function handleCloseEditTaskModal() {
    setIsEditTaskModalOpen(false);
  }

  function handleOpenEditTaskModal(task) {
    setIsEditTaskModalOpen(true);
    setEditTask(task);
  }

  function refetchTasks() {
    setFetchData(!fetchData);
  }

  async function handleDeleteTask() {
    try {
      await api.delete(`/task/${selectedTask}`);
      setFetchData(!fetchData);
      handleCloseDeleteTaskModal();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchTask = async () => {
      const { data } = await api.get(`/task`);
      setTasks(data);
    };

    fetchTask();
  }, [fetchData, fetch]);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="inline-block w-full p-1.5 align-middle">
          <div className="overflow-hidden overflow-x-auto rounded-lg border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 "
                  >
                    Tarefa
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 "
                  >
                    Responsável
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 "
                  >
                    Data limite
                  </th>
                  <th>
                    <div>
                      {
                        <form>
                          <select
                            name="status"
                            id="status"
                            className="border-none bg-transparent py-3 text-left text-xs font-bold uppercase text-gray-500"
                            defaultValue={"Status"}
                            onChange={(e) => setFilteredTask(e.target.value)}
                          >
                            <option value="Status">Status</option>
                            <option className="" value="Concluída">
                              Concluída
                            </option>
                            <option value="Pendente">Pendente</option>
                            <option value="Vencida">Vencida</option>
                          </select>
                        </form>
                      }
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-bold uppercase text-gray-500 "
                  >
                    Editar
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-bold uppercase text-gray-500"
                  >
                    Deletar
                  </th>
                </tr>
              </thead>
              {tasksToDisplay.reverse().map((task: Task) => {
                return (
                  <Fragment key={task.id}>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
                          {task.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
                          {task.responsible}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
                          {new Date(task.finishDate).toLocaleDateString(
                            "pt-BR",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
                          {task.status}
                        </td>
                        <td
                          className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium"
                          onClick={() => handleOpenEditTaskModal(task)}
                        >
                          <a
                            className="text-green-500 hover:text-green-700"
                            href="#"
                          >
                            Editar
                          </a>
                        </td>
                        <td
                          className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium"
                          onClick={() => handleOpenDeleteTaskModal(task.id)}
                        >
                          <a
                            className="text-red-500 hover:text-red-700"
                            href="#"
                          >
                            Deletar
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </Fragment>
                );
              })}
            </table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isDeleteTaskModalOpen}
        onRequestClose={handleCloseDeleteTaskModal}
        overlayClassName="bg-gray-500 bg-opacity-75 fixed inset-0 z-10"
        className="absolute bottom-0 w-full rounded-md bg-white p-4 md:bottom-auto md:top-1/2 md:left-1/2 md:w-auto md:-translate-x-1/2 md:-translate-y-1/2 md:transform"
        contentLabel="Delete Task Modal"
      >
        <DeleteTaskModal
          closeModal={handleCloseDeleteTaskModal}
          deleteTask={handleDeleteTask}
        />
      </Modal>

      <Modal
        isOpen={isEditTaskModalOpen}
        onRequestClose={handleCloseEditTaskModal}
        overlayClassName="bg-gray-500 bg-opacity-75 fixed inset-0 z-10"
        className="absolute bottom-0 w-full rounded-md bg-white p-4 md:bottom-auto md:top-1/2 md:left-1/2 md:w-auto md:-translate-x-1/2 md:-translate-y-1/2 md:transform"
        contentLabel="Edit Task Modal"
      >
        <EditTaskModal
          closeModal={handleCloseEditTaskModal}
          task={editTask}
          fetchTasks={refetchTasks}
        />
      </Modal>
    </div>
  );
};
