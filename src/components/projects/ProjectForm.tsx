import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services";

type DataForm = {
  name: string;
};

type Props = {
  updateData: () => void;
};

export const ProjectForm = ({ updateData }: Props) => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [name, setName] = useState("");
  const { user } = useContext(AuthContext);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function clearErrorAndSuccessMsg() {
    setError("");
    setSuccess("");
  }

  async function handleAddProject(data: DataForm) {
    const sendData = {
      name: data.name,
      userId: user.id,
    };

    try {
      await api.post("/project", sendData);
      setName("");
      setSuccess(`Projeto ${data.name} criado com sucesso!`);
      updateData();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleAddProject)}>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Adicione um novo projeto
      </label>
      <div className="relative mt-1 flex items-center justify-between rounded-md shadow-sm">
        <input
          {...register("name")}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          onFocus={() => clearErrorAndSuccessMsg()}
          id="name"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Nome do projeto"
        />

        <button
          type="submit"
          className="ml-2 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >
          Add
        </button>
      </div>
      {error && (
        <div className="text-start pt-4 text-sm text-red-500">{error}</div>
      )}
      {success && (
        <div className="text-start pt-4 text-sm text-green-500">{success}</div>
      )}
    </form>
  );
};
