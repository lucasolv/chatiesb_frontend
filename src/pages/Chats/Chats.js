import React from 'react'
import Navbar from '../../components/Navbar'

const Chats = () => {

  /* try {
    const data = await api.get(`users/checkuser`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(token)}`
        }
    }).then(response => {
        setUser(response.data);
        console.log(user)
      })
      } catch (error) {
    setMessages(JSON.parse(error.request.response).message)
  } */

  return (
    <div>
        <Navbar />
    </div>
  )
}

export default Chats