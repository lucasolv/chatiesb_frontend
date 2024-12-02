import React from "react";
import { useContext } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import logoIesb from "../images/logo_iesb2.png";

// Context
import { Context } from "../context/UserContext";

const Navbar = () => {
  const { authenticated, logout } = useContext(Context);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div>
          <img src={logoIesb} alt="Centro Universitário IESB" />
          <p>Chat IESB</p>
        </div>
        <ul>
          <li>
            <Link to="/">Conversas</Link>
          </li>
          {authenticated && <li onClick={logout}>Sair</li>}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
