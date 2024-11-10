import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useContext } from "react"
import { useNavigate } from 'react-router-dom';
import styles from './Chat.module.css'
import { IoSend } from "react-icons/io5";
import api from '../../utils/api';

//context
import { Context } from "../../context/UserContext"

const Chat = () => {

  const navigate = useNavigate();
  const {authenticated} = useContext(Context)
  const [question, setQuestion] = useState("")
  const [messages, setMessages] = useState([])

  const [token] = useState(localStorage.getItem('token') || '')

  const handleSubmit = (e)=>{
    e.preventDefault()
  }

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const data = await api.get(`ask/messages?threadId=1`, {
          headers: {
              'Authorization': `Bearer ${JSON.parse(token)}`
          }
      }).then(response => {
          setMessages(response.data);
        })
      } catch (error) {
        setMessages(JSON.parse(error.request.response).message)
      }
    }
    fetchData()
  },[])

  /* useEffect(()=>{
    if(!authenticated){
      navigate('/login')
    }
  },[]) */

  return (
    <div>
      <Navbar />
      <div className={styles.chat}>
        <h2>Título da conversa</h2>
        <div className={styles.conversation}>
          <ul className={styles.messagesContainer}>
            <li className={styles.userMessages}><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis eos culpa et delectus suscipit amet expedita doloremque distinctio itaque beatae veritatis quis possimus, ex repudiandae dicta non nisi quam natus?</p></li>
            <li className={styles.assistantMessages}><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis eos culpa et delectus suscipit amet expedita doloremque distinctio itaque beatae veritatis quis possimus, ex repudiandae dicta non nisi quam natus?</p></li>
            <li className={styles.userMessages}><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis eos culpa et delectus suscipit amet expedita doloremque distinctio itaque beatae veritatis quis possimus, ex repudiandae dicta non nisi quam natus?</p></li>
            <li className={styles.assistantMessages}><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis eos culpa et delectus suscipit amet expedita doloremque distinctio itaque beatae veritatis quis possimus, ex repudiandae dicta non nisi quam natus?</p></li>
            <li className={styles.userMessages}><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis eos culpa et delectus suscipit amet expedita doloremque distinctio itaque beatae veritatis quis possimus, ex repudiandae dicta non nisi quam natus?</p></li>
            <li className={styles.assistantMessages}><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis eos culpa et delectus suscipit amet expedita doloremque distinctio itaque beatae veritatis quis possimus, ex repudiandae dicta non nisi quam natus?</p></li>
            <li className={styles.userMessages}><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis eos culpa et delectus suscipit amet expedita doloremque distinctio itaque beatae veritatis quis possimus, ex repudiandae dicta non nisi quam natus?</p></li>
            <li className={styles.assistantMessages}><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis eos culpa et delectus suscipit amet expedita doloremque distinctio itaque beatae veritatis quis possimus, ex repudiandae dicta non nisi quam natus?</p></li>
            <li className={styles.userMessages}><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis eos culpa et delectus suscipit amet expedita doloremque distinctio itaque beatae veritatis quis possimus, ex repudiandae dicta non nisi quam natus?</p></li>
            <li className={styles.assistantMessages}><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis eos culpa et delectus suscipit amet expedita doloremque distinctio itaque beatae veritatis quis possimus, ex repudiandae dicta non nisi quam natus?</p></li>
          </ul>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Digite sua mensagem' />
            <div className={styles.containerSubmit}>  
              <button type="submit"><IoSend /></button>
            </div>
          </form>
          <p>Chat IESB&copy; pode ceder respostas imprecisas. Verifique informações importantes.</p>
        </div>
      </div>
    </div>
  )
}

export default Chat