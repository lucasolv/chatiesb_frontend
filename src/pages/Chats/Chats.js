import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'
import api from '../../utils/api';
import styles from './Chats.module.css'

const Chats = () => {

  const [user, setUser] = useState({})
  const [error, setError] = useState("")

  const [token] = useState(localStorage.getItem('token') || '')

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
          <ul>
            {user.threadIds && user.threadIds.map((thread, i)=>(
              <li key={i}><Link to={`/chat/${i+1}`}>{thread.threadTitle}</Link></li>
            ))}
          </ul>
        </div>
    </div>
  )
}

export default Chats