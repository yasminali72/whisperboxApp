import { useContext } from "react"
import { AuthContext } from "../../Context/AuthContext"
import Login from "../../Pages/Login"

export default function ProdectedRoute({children}) {
    let {userToken}=useContext(AuthContext)
    
  return (
<>
<div className="min-h-screen">{userToken?children:<Login/>}</div>
</>  )
}
