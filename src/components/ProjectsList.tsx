import { RiShareForwardLine } from "react-icons/ri";
import { useContext } from "react";
import Link from "next/link";

import { AuthContext } from "../contexts/AuthContext";

type Project = {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

type ProjectListProps = {
  projects: Project[];
};

export const ProjectsList = ({ projects }: ProjectListProps) => {
  const { user } = useContext(AuthContext);

  const filteredProjects = projects.filter(
    (project) => project.userId === user.id
  );

  return (
    <>
      {filteredProjects.reverse().map((project) => {
        return (
          <Link href={`/projects/${project.id}`} key={project.id}>
            <div className="mt-4 flex w-full cursor-pointer items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-gray-500 shadow-sm hover:border-indigo-500 hover:text-indigo-500 sm:text-sm">
              <span>{project.name}</span>
              <RiShareForwardLine />
            </div>
          </Link>
        );
      })}
    </>
  );
};
