import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../utils/api';
import styles from './Chats.module.css'
import { useContext } from "react"
import { Context } from "../../context/UserContext"

const Chats = () => {

  const navigate = useNavigate();
  const {authenticated} = useContext(Context)
  const [user, setUser] = useState({})
  const [error, setError] = useState("")

  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(()=>{
    /* if(!authenticated){
      navigate('/login')
    } */
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
          <ul>
            {user.threadIds && user.threadIds.slice().reverse().map((thread, i)=>(
              <li key={i}><Link to={`/chat/${i+1}`}><button>{thread.threadTitle}</button></Link></li>
            ))}
            <li><Link><button>titulo da conversa</button></Link></li>
            <li><Link><button>titulo da conversa</button></Link></li>
            <li><Link><button>titulo da conversa</button></Link></li>
            <li><Link><button>titulo da conversa</button></Link></li>
            <li><Link><button>titulo da conversa</button></Link></li>
            <li><Link><button>titulo da conversa</button></Link></li>
            <li><Link><button>titulo da conversa</button></Link></li>
            <li><Link><button>titulo da conversa</button></Link></li>
            <li><Link><button>titulo da conversa</button></Link></li>
            <li><Link><button>titulo da conversa</button></Link></li>
            <li><Link><button>titulo da conversa</button></Link></li>
            <li><Link><button>titulo da conversa</button></Link></li>
            <li><Link><button>titulo da conversa</button></Link></li>
            <li><Link><button>titulo da conversa</button></Link></li>
            <li><Link><button>titulo da conversa</button></Link></li>
            <li><Link><button>titulo da conversa</button></Link></li>
            <li><Link><button>titulo da conversa</button></Link></li>
            <li><Link><button>titulo da conversa</button></Link></li>
            <li><Link><button>titulo da conversa</button></Link></li>
            <li><Link><button>titulo da conversa</button></Link></li>
            <li><Link><button>titulo da conversa</button></Link></li>
          </ul>
          <form >
            <input type="text" name="" id="" />
          </form>
        </div>
    </div>
  )
}

export default Chats