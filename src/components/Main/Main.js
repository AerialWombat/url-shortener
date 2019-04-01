import React from "react";
import { Switch, Route } from "react-router-dom";
import Shortener from "../Shortener/Shortener";
import Login from "../Login/Login";
import Register from "../Register/Register";

import styles from "./main.module.scss";

const Main = ({ signedIn, user, loadUser, getLinks }) => (
  <main className={styles.container}>
    <Switch>
      <Route
        exact
        path="/"
        render={props => (
          <Shortener
            {...props}
            signedIn={signedIn}
            user={user}
            getLinks={getLinks}
          />
        )}
      />
      <Route
        path="/login"
        render={props => (
          <Login
            {...props}
            signedIn={signedIn}
            user={user}
            loadUser={loadUser}
          />
        )}
      />
      <Route path="/register" component={Register} />
    </Switch>
  </main>
);
export default Main;
