import React, { Component } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

class App extends Component {
  constructor() {
    super();
    this.state = {
      signedIn: false,
      user: {
        username: null,
        email: null
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

  unloadUser = () => {
    this.setState({
      signedIn: false,
      user: {
        username: null,
        email: null
      }
    });
  };

  render() {
    return (
      <div className="App">
        <Header
          signedIn={this.state.signedIn}
          username={this.state.user.username}
          unloadUser={this.unloadUser}
        />
        <Main
          signedIn={this.state.signedIn}
          username={this.state.user.username}
          loadUser={this.loadUser}
          unloadUser={this.unloadUser}
        />
      </div>
    );
  }
}

export default App;
