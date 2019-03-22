import React from "react";
import { Switch, Route } from "react-router-dom";
import Shortener from "../Shortener/Shortener";
import Login from "../Login/Login";
import Register from "../Register/Register";

import styles from "./main.module.scss";

const Main = () => (
  <main className={styles.container}>
    <h1 className={styles.title}>URL Shortener</h1>
    <Switch>
      <Route exact path="/" component={Shortener} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  </main>
);

export default Main;
