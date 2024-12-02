import {useContext, useState} from 'react'
import { Link } from "react-router-dom"
import styles from "./Auth.module.css"

//contexts
import {Context} from '../../context/UserContext'

const Register = () => {

    let resposta = false
    const [response, setResponse] = useState(".")

    const {register} = useContext(Context)

    const [name, setName] = useState("");
    const [registration, setRegistration] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleSubmit(e){
        e.preventDefault()
        if(!name){
            setResponse('O nome é obrigatório!')
            return
        }
        if(!registration){
            setResponse('A matrícula é obrigatória!')
            return
        }
        if(!password){
            setResponse('A senha é obrigatória!')
            return
        }
        if(!confirmPassword){
            setResponse('A confirmação de senha é obrigatória!')
            return
        }
        if(password !== confirmPassword){
            setResponse('A senha e a confirmação de senha precisam ser iguais!')
            return
        }
        const newUser = {
            name,
            registration,
            password,
            confirmPassword
        }
        setResponse('Carregando...')
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
                <img src="logoFot.png" alt="Centro universitário IESB" />
                {response !== '.' && <p className={styles.error}>{response}</p>}
                {response === '.' && <p className={styles.displayNone}>{response}</p>}
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
                <p>Já possui cadastro? <Link to='/login'>Clique aqui!</Link></p>
            </div>
        </div>
    </div>
  )
}

export default Register