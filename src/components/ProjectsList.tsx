import { AuthContext } from '../contexts/AuthContext'
import { RiShareForwardLine } from 'react-icons/ri'
import { useContext } from 'react'

type Project = {
  id: string
  name: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

type ProjectListProps = {
  projects: Project[]
}

export const ProjectsList = ({ projects }: ProjectListProps) => {
  const { user } = useContext(AuthContext)

  const filteredProjects = projects.filter((project) => project.userId === user.id)

  return (
    <>
      {filteredProjects.reverse().map(project => {
        return (
          <div key={project.id}>
            <div className="mt-4 w-full flex justify-between items-center px-3 py-2 border border-gray-300 rounded-md text-gray-500 shadow-sm sm:text-sm cursor-pointer hover:border-indigo-500 hover:text-indigo-500">
              <span>{project.name}</span>
              <RiShareForwardLine />
            </div>
          </div>
        )
      })}
    </>
  )
}
