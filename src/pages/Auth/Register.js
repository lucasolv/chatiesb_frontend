import {useContext, useState} from 'react'
import { Link } from "react-router-dom"

//contexts
import {Context} from '../../context/UserContext'

const Register = () => {

    const [user,setUser] = useState({})
    const {register} = useContext(Context)

    const [name, setName] = useState("");
    const [registration, setRegistration] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function handleSubmit(e){
        e.preventDefault()
        const newUser = {
            name,
            registration,
            password,
            confirmPassword
        }
        register(newUser)
    }

  return (
    <div>
        <h1>Registre-se</h1>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
            value={name}
            />
            <input
            type="text"
            placeholder="Matrícula"
            onChange={(e) => setRegistration(e.target.value)}
            value={registration}
            />
            <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />
            <input
            type="password"
            placeholder="Confirme a senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            />
            <input type="submit" value="Cadastrar" />
        </form>
    </div>
  )
}

export default Register