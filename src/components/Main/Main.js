import React from "react";
import { Switch, Route } from "react-router-dom";
import Shortener from "../Shortener/Shortener";
import Login from "../Login/Login";
import Register from "../Register/Register";

import styles from "./main.module.scss";

const Main = ({ signedIn, username, loadUser }) => (
  <main className={styles.container}>
    <Switch>
      <Route
        exact
        path="/"
        render={props => <Shortener {...props} username={username} />}
      />
      <Route
        path="/login"
        render={props => (
          <Login
            {...props}
            signedIn={signedIn}
            username={username}
            loadUser={loadUser}
          />
        )}
      />
      <Route path="/register" component={Register} />
    </Switch>
  </main>
);

export default Main;
