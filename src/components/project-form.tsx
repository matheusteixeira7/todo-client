import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form'
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../services/api';

type DataForm = {
  name: string
}

export const ProjectForm = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [name, setName] = useState('')
  const { user } = useContext(AuthContext)

  function handleChange(event) {
    setName(event.target.value)
  }

  function clearErrorAndSuccessMsg() {
    setError('')
    setSuccess('')
  }

  async function handleAddProject(data: DataForm) {
    const sendData = {
      name: data.name,
      userId: user.id
    }

    try {
      await api.post('/project', sendData)
      setName('')
      setSuccess(`Projeto ${data.name} criado com sucesso!`)
    } catch (error) {
      setError(error.message)
    }
  }


  return (
    <form onSubmit={handleSubmit(handleAddProject)}>
      <label
        htmlFor="name"
        className="block text-sm font-medium text-gray-700"
      >
        Adicione um novo projeto
      </label>
      <div className="mt-1 relative rounded-md shadow-sm flex justify-between items-center">
        <input
          {...register('name')}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          onFocus={() => clearErrorAndSuccessMsg()}
          id="name"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="Nome do projeto"
        />


        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded">
          Add
        </button>
      </div>
      {error && <div className="text-red-500 text-sm text-start pt-4">{error}</div>}
      {success && <div className="text-green-500 text-sm text-start pt-4">{success}</div>}
    </form>
  );
}
