import React from "react";
import { Link } from "react-router-dom";

import styles from "./header.module.scss";

// Will need to use state to determine shown options based on log-in status
// ^ Nevermind, boolean prop should be fine
const Header = ({ signedIn, username }) => (
  <header className={styles.container}>
    <h1 className={styles.brand}>URL SHORT</h1>
    <span>
      {signedIn ? (
        <React.Fragment>
          <p>Welcome, {username}</p>
          <Link className={styles.navlink} to="/signout">
            Sign Out
          </Link>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Link className={styles.navlink} to="/">
            Shortener
          </Link>
          <Link className={styles.navlink} to="/login">
            Login
          </Link>
          <Link className={styles.navlink} to="/register">
            Register
          </Link>
        </React.Fragment>
      )}
    </span>
  </header>
);

export default Header;
