import React from 'react'
import { useContext } from "react"
import styles from './Navbar.module.css'

//context
import { Context } from "../context/UserContext"


const Navbar = () => {

    const {authenticated, logout} = useContext(Context)

  return (
    <nav className={styles.navbar}>
        <div>
            IESB
        </div>
        <ul>
            <li>Conversas</li>
            <li onClick={logout}>Sair</li>
        </ul>
    </nav>
  )
}

export default Navbar