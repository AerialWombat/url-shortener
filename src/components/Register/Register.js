import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./register.module.scss";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      username: null,
      password: null,
      passHasUpper: null,
      passHasLower: null,
      passHasNumber: null,
      passHasSpecialChar: null,
      passMinLength: null,
      responseMessage: null,
      registrationComplete: false
    };
  }

  onEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  onUsernameChange = event => {
    this.setState({ username: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ password: event.target.value });
    this.validatePassword(event.target.value);
  };

  validatePassword = password => {
    // Validate capital letters
    password.match(/[A-Z]/g)
      ? this.setState({ passHasUpper: true })
      : this.setState({ passHasUpper: false });

    // Validate lowercase letters
    password.match(/[a-z]/g)
      ? this.setState({ passHasLower: true })
      : this.setState({ passHasLower: false });

    // Validate numbers
    password.match(/[0-9]/g)
      ? this.setState({ passHasNumber: true })
      : this.setState({ passHasNumber: false });

    // Validate special characters
    password.match(/[!@#$%^&*(),.?":{}|<>]/g)
      ? this.setState({ passHasSpecialChar: true })
      : this.setState({ passHasSpecialChar: false });

    // Validate password length
    password.length >= 8
      ? this.setState({ passMinLength: true })
      : this.setState({ passMinLength: false });
  };

  onRegisterSubmit = event => {
    fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      })
    }).then(response => {
      if (response.status !== 200) {
        response
          .json()
          .then(data => this.setState({ responseMessage: data.msg }));
      } else this.setState({ registrationComplete: true });
    });
    event.preventDefault();
  };

  render() {
    const {
      passHasUpper,
      passHasLower,
      passHasNumber,
      passHasSpecialChar,
      passMinLength,
      registrationComplete
    } = this.state;

    // Redirect if registration complete
    if (!registrationComplete) {
      return (
        <section className={styles.container}>
          <h1>Register</h1>
          <form
            className={styles.form_wrapper}
            onSubmit={this.onRegisterSubmit}
          >
            <p>{this.state.responseMessage}</p>
            <div className={styles.input_wrapper}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={this.onEmailChange}
                required
              />
            </div>
            <div className={styles.input_wrapper}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                name="username"
                id="username"
                onChange={this.onUsernameChange}
                required
              />
            </div>
            <div className={styles.input_wrapper}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?:{}|<>]).{8,}"
                title="Must contain at least one number, one uppercase and lowercase letter, one special character, and at least 8 or more characters"
                onChange={this.onPasswordChange}
                required
              />
            </div>
            <ul className={styles.password_requirements}>
              <li className={passMinLength ? styles.checked : styles.dashed}>
                At least 8 characters
              </li>
              <li
                className={
                  passHasUpper && passHasLower ? styles.checked : styles.dashed
                }
              >
                Contains uppercase and lowercase characters
              </li>
              <li className={passHasNumber ? styles.checked : styles.dashed}>
                Contains at least one number
              </li>
              <li
                className={passHasSpecialChar ? styles.checked : styles.dashed}
              >
                Contains at least one special character
              </li>
            </ul>
            <div>
              <input type="submit" value="Register" />
            </div>
          </form>
        </section>
      );
    } else {
      return (
        <section>
          <div>
            <h1>Registration complete</h1>
            <Link to="/">Return</Link>
          </div>
        </section>
      );
    }
  }
}

export default Register;
