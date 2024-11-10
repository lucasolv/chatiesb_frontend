import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { useContext } from "react"
import { useNavigate } from 'react-router-dom';

//context
import { Context } from "../../context/UserContext"

const Chat = () => {

  const navigate = useNavigate();
  const {authenticated} = useContext(Context)

  useEffect(()=>{
    if(!authenticated){
      navigate('/login')
    }
  },[])

  return (
    <div>
      <Navbar />
      chat
    </div>
  )
}

export default Chat