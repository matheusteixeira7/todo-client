import { useContext } from "react"
import DashboardLayout from "../../components/Dashboard"
import { AuthContext } from "../../contexts/AuthContext"

export const Project = () => {
  const { user } = useContext(AuthContext)

  return (
    <DashboardLayout user={user}>
      <h1>Projetos</h1>
    </DashboardLayout>
  )
}
