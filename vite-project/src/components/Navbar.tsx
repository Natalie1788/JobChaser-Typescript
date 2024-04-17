import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from "../styles/Navbar.module.css"
import logo from "../images/logo.png"
import logoDark from "../images/logoDark.png"
import { signOut } from "firebase/auth";
import { auth } from "./../../firebase-config";
import { useTheme } from './ThemeContext';


function Navbar() {

  const {isDark, toggleTheme} = useTheme()

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        // Additional actions after sign out, such as redirecting to another page
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <nav className={styles.menu}>
     <img src={isDark ? logoDark : logo} alt="logo" />
      <ul className={styles.list}>
        <li><Link to="/" style={{textDecoration:"none"}}><span className={styles.itemtext}>Home</span></Link></li>
        <li><Link to="/joblist"  style={{textDecoration:"none"}}><span className={styles.itemtext}>Job</span></Link></li>
        <li><Link to="/about"  style={{textDecoration:"none"}}><span className={styles.itemtext}>About</span></Link></li>
        <li><Link to="/contact"  style={{textDecoration:"none"}}><span className={styles.itemtext}>Contact</span></Link></li>
        <li><Link to="/signup"  style={{textDecoration:"none"}}><span className={styles.itemtext}>SingUp</span></Link></li>
        <li><button onClick={handleSignOut}>Sign Out</button></li>
        <li><button style={{marginLeft: "20px"}} onClick={toggleTheme}>Dark/Light</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;