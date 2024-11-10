import React from 'react'
import styles from "./NotFound.module.css"
import { Link } from "react-router-dom"

const Notfound = () => {
  return (
    <div className={styles.notFound}>
        <div className={styles.content}>
            <div className={styles.div404}>
                404
            </div>
            <div className={styles.content404}>
                <h2>Ops! Página não encontrada...</h2>
                {/* <p>Parece que você se perdeu no caminho... Mas não se preocupe, estamos aqui para ajudar!</p> */}
                <p>A página que você está procurando pode ter sido movida, excluída ou talvez você digitou o endereço errado. Que tal voltar para a <Link to='/login'>página de login</Link> e tentar novamente? </p>
            </div>
        </div>
    </div>
  )
}

export default Notfound