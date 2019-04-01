import React from "react";
import { Link } from "react-router-dom";

import styles from "./header.module.scss";

const Header = ({ signedIn, username, unloadUser }) => {
  return (
    <header className={styles.container}>
      <h1 className={styles.brand}>breve</h1>
      {signedIn ? <p>{username}</p> : ``}
      <nav>
        {signedIn ? (
          <React.Fragment>
            <button className={styles.navlink} onClick={unloadUser}>
              Sign Out
            </button>
          </React.Fragment>
        ) : (
          <div>
            <Link className={styles.navlink} to="/">
              Home
            </Link>
            <Link className={styles.navlink} to="/login">
              Login
            </Link>
            <Link className={styles.navlink} to="/register">
              Register
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
