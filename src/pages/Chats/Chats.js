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
  const [user, setUser] = useState({})
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
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
          navigate(`/chat/${JSON.parse(response.request.response).threadId}`)
          setLoading(false)
        })
    } catch (error) {
      console.log(error.message)
    }
    setLoading(false)
  }

  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(()=>{
    if(!authenticated){
      navigate('/login')
    }
  },[])

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const data = await api.get(`users/checkuser`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`
            }
        }).then(response => {
            setUser(response.data);
          })
          } catch (error) {
        setError(JSON.parse(error.request.response).message)
      }
    } 
    fetchData()
  },[])

  return (
    <div>
        <Navbar />
        <div className={styles.chatsContainer}>
          <h2>Conversas</h2>
          <ul className={styles[`${ulClass}`]}>
            <li><Link><button onClick={openForm}><MdOutlineAddCircle className={styles.addChat} /></button></Link></li>
            {user.threadIds && user.threadIds.map((thread, i)=>(
              <li key={i}><Link to={`/chat/${i+1}`}><button>{thread.threadTitle}</button></Link></li>
            ))}
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
              {!loading && <button className={styles.deleteButton} type="button" onClick={closeForm}>Cancelar</button>}
              {loading && <button className={styles.deleteButton} disabled >Cancelar</button>}
            </div>
          </form>
        </div>
    </div>
  )
}

export default Chats