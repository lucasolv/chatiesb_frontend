import {useContext, useState} from 'react'
import { Link } from "react-router-dom"
import styles from "./Auth.module.css"

//contexts
import {Context} from '../../context/UserContext'


const Login = () => {
  
    let resposta = false
    const [response, setResponse] = useState(".")

    const {login} = useContext(Context)

    const [registration, setRegistration] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e){
      e.preventDefault()
      const user = {
          registration,
          password,
      }
      setResponse('Carregando...')
      resposta = await login(user)
      if(resposta.msgType === 'error'){
          setResponse(resposta.msgText)
      }
  }
  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <h1>Login</h1>
          <div className={styles.formContainer}>
          <img src="logoFot.png" alt="Centro universitário IESB" />
          {response !== '.' && <p className={styles.error}>{response}</p>}
          {response === '.' && <p className={styles.displayNone}>{response}</p>}
          <form onSubmit={handleSubmit}>
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
              <input type="submit" value="Entrar" />
            </form>
            <p>Ou <Link to='/register'>cadastre-se agora!</Link></p>
          </div>
        </div>
    </div>
  )
}

export default Login