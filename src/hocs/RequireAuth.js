import { Navigate } from "react-router-dom"
import checkUser from "../api/checkUser"

const RequireAuth = ({ children }) => {
  const auth = checkUser

  if (!auth) return <Navigate to='/error-user' />

  return children
}

export default RequireAuth