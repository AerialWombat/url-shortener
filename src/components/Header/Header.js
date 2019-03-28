import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./header.module.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandMenu: false
    };
  }

  render() {
    return (
      <header className={styles.container}>
        <h1 className={styles.brand}>breve</h1>
        {this.props.signedIn ? <p>{this.props.username}</p> : ``}
        <nav>
          {this.props.signedIn ? (
            <React.Fragment>
              <button
                className={styles.navlink}
                onClick={this.props.unloadUser}
              >
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
  }
}

export default Header;
