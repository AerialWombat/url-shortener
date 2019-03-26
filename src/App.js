import React, { Component } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

class App extends Component {
  constructor() {
    super();
    this.state = {
      signedIn: false, //Don't know if needed
      user: {
        username: null,
        email: null
        //list of urls
      }
    };
  }

  loadUser = userData => {
    this.setState({
      signedIn: true,
      user: {
        username: userData.username,
        email: userData.email
      }
    });
  };

  render() {
    return (
      <div className="App">
        <Header
          signedIn={this.state.signedIn}
          username={this.state.user.username}
        />
        <Main signedIn={this.state.signedIn} loadUser={this.loadUser} />
      </div>
    );
  }
}

export default App;
