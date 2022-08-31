import { AiOutlineClose, AiFillDelete } from "react-icons/ai";

export const DeleteProjectModal = ({ closeModal, deleteProject }) => {
  return (
    <>
      <button onClick={closeModal} className="absolute right-2 top-2">
        <AiOutlineClose />
      </button>
      <div className="mt-8">Tem certeza que deseja deletar este projeto?</div>
      <div className="mt-4">
        Todas as tarefas contidas neste projetos também serão apagadas
      </div>

      <div className="mt-4 md:flex md:items-center md:justify-between">
        <div
          onClick={deleteProject}
          className="focus:outline-none group relative mb-4 flex w-full cursor-pointer justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 md:mb-0 md:mr-4"
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <AiFillDelete
              className="h-5 w-5 text-red-500 group-hover:text-red-400"
              aria-hidden="true"
            />
          </span>
          Deletar
        </div>
        <div
          onClick={closeModal}
          className="focus:outline-none group relative flex w-full cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <AiOutlineClose
              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              aria-hidden="true"
            />
          </span>
          Manter
        </div>
      </div>
    </>
  );
};
