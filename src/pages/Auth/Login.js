import {useContext, useState} from 'react'
import { Link } from "react-router-dom"

//contexts
import {Context} from '../../context/UserContext'

const Login = () => {
    
    const [user,setUser] = useState({})
    const {login} = useContext(Context)

  return (
    <div>Login</div>
  )
}

export default Login