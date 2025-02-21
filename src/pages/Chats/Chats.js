import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../utils/api';
import { MdOutlineAddCircle } from "react-icons/md";
import styles from './Chats.module.css'
import { useContext } from "react"
import { Context } from "../../context/UserContext"

const Chats = () => {

  const navigate = useNavigate();
  const {authenticated} = useContext(Context)
  const [userThreads, setUserThreads] = useState([])
  const [user, setUser] = useState({})
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingDeleteChat, setLoadingDeleteChat] = useState(false)
  const [formClass, setFormClass] = useState("displayNone")
  /* const [formClass, setFormClass] = useState("openForm") */
  const [conversationTitle, setConversationTitle] = useState("")
  const [firstQuestion, setFirstQuestion] = useState("")
  const [ulClass, setUlClass] = useState("normal")
  let createNewThreadVar = true
  let questionVar = ""
  let titleVar = ""

  const openForm = () => {
    setFormClass("openForm")
    setUlClass("smallUl")
  }

  const closeForm = () => {
    setFormClass("displayNone")
    setUlClass("normal")
  }

  const deleteChat = async (openAIThreadId) =>{
    try {
      setLoadingDeleteChat(true)
      const data = await api.delete(`users/deleteChat/${openAIThreadId}`,{
          headers: {
              'Authorization': `Bearer ${JSON.parse(token)}`
          }
      })/* .then(async response => {
        }) */
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    questionVar = firstQuestion
    setFirstQuestion("")
    titleVar = conversationTitle
    setConversationTitle("")
    try {
      const data = await api.post(`ask/question`,{
        createNewThread: createNewThreadVar,
        threadTitle: titleVar,
        question: questionVar,
      }, {
          headers: {
              'Authorization': `Bearer ${JSON.parse(token)}`
          }
      }).then(async response => {
          navigate(`/chat/${user.registration}/${JSON.parse(response.request.response).threadId}`)
          setLoading(false)
        })
    } catch (error) {
      console.log(error.message)
    }
    setLoading(false)
  }

  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(()=>{
    /* if(!authenticated){
      navigate('/login')
    } */
  },[])

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const data = await api.get(`users/chats`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`
            }
        }).then(response => {
            setUserThreads(response.data.userThreads);
            setUser(response.data.currentUser);
          })
          } catch (error) {
        setError(JSON.parse(error.request.response).message)
      }
    } 
    fetchData()
  },[])

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const data = await api.get(`users/chats`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`
            }
        }).then(response => {
            setUserThreads(response.data.userThreads);
            setUser(response.data.currentUser);
            setLoadingDeleteChat(false)
          })
          } catch (error) {
        setError(JSON.parse(error.request.response).message)
      }
    } 
    fetchData()
  },[loadingDeleteChat])

  if(Object.keys(userThreads).length === 0){
    return <p>Carregando...</p>
  }

  return (
    <div>
        <Navbar />
        <div className={styles.chatsContainer}>
          <h2>Conversas</h2>
          <ul className={styles[`${ulClass}`]}>
            <li className={styles.addButton}><Link><button onClick={openForm}><MdOutlineAddCircle className={styles.addChat} /></button></Link></li>
            {userThreads && userThreads.map((thread, i)=>(
              <li className={styles.chatButton} key={i}><Link to={`/chat/${user.registration}/${i+1}`}><button>{thread.threadTitle}</button></Link> {!loadingDeleteChat && <button className={styles.deleteButton} onClick={()=>{deleteChat(thread.openAIThreadId)}}>Excluir</button>} {loadingDeleteChat && <button disabled className={styles.loadingDeleteButton}>Aguarde...</button>}</li>
            ))}
            {Object.keys(userThreads).length === 0 && <p>Carregando...</p>}
          </ul>
          <form onSubmit={handleSubmit} className={styles[`${formClass}`]}>
            <div className={styles.formInputs}>
              {!loading && <input type="text" placeholder='Dê um título para sua nova conversa' onChange={(e)=>setConversationTitle(e.target.value)} value={conversationTitle || ""} />}
              {loading && <input type="text" placeholder='Aguarde...' onChange={(e)=>setConversationTitle(e.target.value)} value={conversationTitle || ""} />}
              {!loading && <input type="text" placeholder='Faça sua primeira pergunta' onChange={(e)=>setFirstQuestion(e.target.value)} value={firstQuestion || ""} />}
              {loading && <input type="text" placeholder='Aguarde...' onChange={(e)=>setFirstQuestion(e.target.value)} value={firstQuestion || ""} />}
            </div>
            <div className={styles.formButtons}>
              {!loading && <button className={styles.createButton} type='submit'>Criar</button>}
              {loading && <button className={styles.createButton} disabled >Criar</button>}
              {!loading && <button className={styles.cancelButton} type="button" onClick={closeForm}>Cancelar</button>}
              {loading && <button className={styles.cancelButton} disabled >Cancelar</button>}
            </div>
          </form>
        </div>
    </div>
  )
}

export default Chats