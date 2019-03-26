import React from "react";
import { Switch, Route } from "react-router-dom";
import Shortener from "../Shortener/Shortener";
import Login from "../Login/Login";
import Register from "../Register/Register";

import styles from "./main.module.scss";

const Main = ({ signedIn, loadUser, unloadUser }) => (
  <main className={styles.container}>
    <Switch>
      <Route exact path="/" component={Shortener} />
      <Route
        path="/login"
        render={props => (
          <Login {...props} signedIn={signedIn} loadUser={loadUser} />
        )}
      />
      <Route path="/register" component={Register} />
    </Switch>
  </main>
);

export default Main;
