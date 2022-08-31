import { useForm } from "react-hook-form";
import { AiFillEdit, AiOutlineClose } from "react-icons/ai";
import Datepicker, { registerLocale } from "react-datepicker";
import { useState } from "react";
import ptBR from "date-fns/locale/pt-BR";
registerLocale("pt-BR", ptBR);

import { api } from "../../services";

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

export const EditTaskModal = ({ closeModal, task, fetchTasks }) => {
  const { register, handleSubmit } = useForm();
  const [startDate, setStartDate] = useState(new Date(task.finishDate));
  const [name, setName] = useState(task.name);
  const [responsible, setResponsible] = useState(task.responsible);

  async function handleEditTask(data) {
    const sendData = {
      name: data.name,
      projectId: task.projectId,
      responsible: data.responsible,
      status: data.status,
      finishDate: startDate,
    };

    await editTask(sendData);
    closeModal();
  }

  async function editTask(data) {
    try {
      await api.put(`/task/${task.id}`, data);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="lg:w-96">
      <h2>Editar tarefa</h2>

      <button onClick={closeModal} className="absolute right-2 top-2">
        <AiOutlineClose />
      </button>

      <form onSubmit={handleSubmit(handleEditTask)} className="mt-8">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nome da tarefa
          </label>
          <input
            {...register("name")}
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="focus:outline-none relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="responsible"
            className="block text-sm font-medium text-gray-700"
          >
            Responsável
          </label>
          <input
            {...register("responsible")}
            id="responsible"
            name="responsible"
            type="text"
            value={responsible}
            onChange={(event) => setResponsible(event.target.value)}
            required
            className="focus:outline-none relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder={task.responsible}
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            {...register("status")}
            id="status"
            name="status"
            className="h-full w-full rounded-md border border-transparent border-gray-300 bg-transparent px-3 py-2 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
            placeholder={task.status}
          >
            <option selected={task.status === "Concluída" ? true : false}>
              Concluída
            </option>
            <option selected={task.status === "Pendente" ? true : false}>
              Pendente
            </option>
            <option selected={task.status === "Vencida" ? true : false}>
              Vencida
            </option>
          </select>
        </div>

        <div className="mt-4">
          <label
            htmlFor="finishDate"
            className="block text-sm font-medium text-gray-700"
          >
            Data limite
          </label>
          <Datepicker
            {...register("finishDate")}
            id="finishDate"
            name="finishDate"
            className="h-full w-full rounded-md border border-transparent border-gray-300 bg-transparent px-3 py-2 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholderText={task.finishDate}
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            locale="pt-BR"
            dateFormat="dd/MM/yyyy"
            required
          />
        </div>

        <div className="mt-4 md:flex md:items-center md:justify-between">
          <button
            type="submit"
            className="focus:outline-none group relative mb-4 flex w-full cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:mb-0"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <AiFillEdit
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Editar
          </button>

          <div
            onClick={closeModal}
            className="focus:outline-none group relative flex w-full cursor-pointer justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 md:ml-4"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <AiOutlineClose
                className="h-5 w-5 text-red-500 group-hover:text-red-400"
                aria-hidden="true"
              />
            </span>
            Cancelar
          </div>
        </div>
      </form>
    </div>
  );
};
