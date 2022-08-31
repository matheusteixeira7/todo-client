import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";

import { ProjectForm, ProjectsList, DashboardLayout } from "../components";
import { AuthContext } from "../contexts";
import { api, getAPIClient } from "../services/";

type Project = {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function Projetos() {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState<Project[]>([]);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get<Project[]>(`/project`);
      setProjects(data);
    };

    fetchData();
  }, [refreshData]);

  return (
    <DashboardLayout user={user} title="Projetos">
      <ProjectForm updateData={() => setRefreshData(!refreshData)} />
      <div className="mb-8" />
      <ProjectsList projects={projects} />
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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

  // await apiClient.get('/users')

  return {
    props: {},
  };
};
