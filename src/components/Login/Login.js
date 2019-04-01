import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import styles from "./login.module.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      responseMessage: null
    };
  }

  onEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  onLoginSubmit = event => {
    fetch("https://urlshrt0.herokuapp.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    }).then(response => {
      if (response.status !== 200) {
        response
          .json()
          .then(data => this.setState({ responseMessage: data.msg }));
      } else {
        response.json().then(data => this.props.loadUser(data));
      }
    });
    event.preventDefault();
  };

  render() {
    if (!this.props.signedIn) {
      return (
        <section className={styles.container}>
          <h1>Login</h1>
          <form className={styles.form_wrapper} onSubmit={this.onLoginSubmit}>
            <p>{this.state.responseMessage}</p>
            <div className={styles.input_wrapper}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="johnsmith@example.com"
                onChange={this.onEmailChange}
                required
              />
            </div>
            <div className={styles.input_wrapper}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={this.onPasswordChange}
                required
              />
            </div>
            <div>
              <input type="submit" value="Log in" />
            </div>
          </form>
          <div className={styles.demoInfo}>
          <h3>Demo account credentials: </h3>
          <p><span>E-mail</span>: demo@email.com</p>
          <p><span>Password</span>: pass</p>
          </div>
          <div className={styles.navigation}>
            <span>
              Need to sign up? <Link to="/register">Sign up here</Link>
            </span>
            <Link to="/">Return</Link>
          </div>
        </section>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default Login;
