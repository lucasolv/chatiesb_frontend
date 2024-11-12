import React, { useEffect, useState, useRef } from 'react'
import Navbar from '../../components/Navbar'
import { useContext } from "react"
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Chat.module.css'
import { IoSend } from "react-icons/io5";
import api from '../../utils/api';

//context
import { Context } from "../../context/UserContext"

const Chat = () => {

  const navigate = useNavigate();
  const {authenticated} = useContext(Context)
  const [question, setQuestion] = useState("")
  const [createNewThread, setCreateNewThread] = useState(true)
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([])
  const { threadId } = useParams();
  const [mensagens, setMensagens] = useState(false)
  const messagesEndRef = useRef(null);
  let createNewThreadVar = true
  let questionVar = ""

  const [token] = useState(localStorage.getItem('token') || '')

  const handleSubmit = async (e)=>{
    e.preventDefault()
    
    setLoading(true)

    if(messages.conversation){
      if(messages.conversation.length > 0){
        createNewThreadVar = false
      }
    }
    questionVar = question
    setQuestion("")
      try {
        const data = await api.post(`ask/question`,{
          createNewThread: createNewThreadVar,
          question: question,
          chosenThread: threadId
      }, {
          headers: {
              'Authorization': `Bearer ${JSON.parse(token)}`
          }
      }).then(async response => {
        const data = await api.get(`ask/messages?threadId=${threadId}`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`
            }
        }).then(response => {
            setMessages(response.data);
          })
        })
      } catch (error) {
        console.log(error.message)
      }
      setMensagens(false)
      setLoading(false)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom()
    }, 1000);
  }, [mensagens]);

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const data = await api.get(`ask/messages?threadId=${threadId}`, {
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
  },[mensagens])

  useEffect(()=>{
    /* if(!authenticated){
      navigate('/login')
    } */
      setMensagens(true)
  },[])

  return (
    <div>
      <Navbar />
      <div className={styles.chat}>
        {messages && <h2>{messages.conversationTitle}</h2>}
        <div className={styles.conversation}>
          <ul className={styles.messagesContainer}>
            {messages && messages.conversation && messages.conversation.slice().reverse().map((message, i)=>(
              <li key={i} className={styles[`${message.role}Messages`]}><p>{message.content}</p></li>
            ))}
            <div ref={messagesEndRef} />
          </ul>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder={loading ? 'Aguarde...' : 'Digite sua mensagem'} onChange={(e)=>setQuestion(e.target.value)} value={question || ""}/>
            <div className={styles.containerSubmit}>
              {!loading && <button type="submit"><IoSend /></button>}
              {loading && <button type="submit" disabled><IoSend /></button>}
            </div>
          </form>
          <p>Chat IESB&copy; pode ceder respostas imprecisas. Verifique informações importantes.</p>
        </div>
      </div>
    </div>
  )
}

export default Chat