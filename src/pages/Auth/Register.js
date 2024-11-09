import {useContext, useState} from 'react'
import { Link } from "react-router-dom"
import styles from "../../form/Auth.module.css"

//contexts
import {Context} from '../../context/UserContext'

const Register = () => {

    let resposta = false
    const [response, setResponse] = useState("response")

    const [user,setUser] = useState({})
    const {register} = useContext(Context)

    const [name, setName] = useState("");
    const [registration, setRegistration] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleSubmit(e){
        e.preventDefault()
        const newUser = {
            name,
            registration,
            password,
            confirmPassword
        }
        resposta = await register(newUser)
        if(resposta.msgType === 'error'){
            setResponse(resposta.msgText)
        }
    }

  return (
    <div className={styles.register}>
        <div className={styles.container}>
            <h1>Registre-se</h1>
            <div className={styles.formContainer}>
                {/* <img src="logoFot.png" alt="Centro universitário IESB" /> */}
                {response !== 'response' && <p className={styles.error}>{response}</p>}
                {response === 'response' && <p className={styles.displayNone}>{response}</p>}
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
        </div>
    </div>
  )
}

export default Register