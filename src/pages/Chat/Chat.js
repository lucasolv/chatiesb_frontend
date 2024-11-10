import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { useContext } from "react"
import { useNavigate } from 'react-router-dom';
import styles from './Chat.module.css'

//context
import { Context } from "../../context/UserContext"

const Chat = () => {

  const navigate = useNavigate();
  const {authenticated} = useContext(Context)

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
            <li className={styles.userMessages}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis eos culpa et delectus suscipit amet expedita doloremque distinctio itaque beatae veritatis quis possimus, ex repudiandae dicta non nisi quam natus?</li>
            <li className={styles.assistantMessages}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis eos culpa et delectus suscipit amet expedita doloremque distinctio itaque beatae veritatis quis possimus, ex repudiandae dicta non nisi quam natus?</li>
            <li className={styles.userMessages}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis eos culpa et delectus suscipit amet expedita doloremque distinctio itaque beatae veritatis quis possimus, ex repudiandae dicta non nisi quam natus?</li>
            <li className={styles.assistantMessages}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis eos culpa et delectus suscipit amet expedita doloremque distinctio itaque beatae veritatis quis possimus, ex repudiandae dicta non nisi quam natus?</li>
            <li className={styles.userMessages}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis eos culpa et delectus suscipit amet expedita doloremque distinctio itaque beatae veritatis quis possimus, ex repudiandae dicta non nisi quam natus?</li>
            <li className={styles.assistantMessages}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis eos culpa et delectus suscipit amet expedita doloremque distinctio itaque beatae veritatis quis possimus, ex repudiandae dicta non nisi quam natus?</li>
          </ul>
          <form >
            <input type="text" />
            <input type="submit" value=">" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chat