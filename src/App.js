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
        email: null,
        links: []
      }
    };
  }

  loadUser = userData => {
    this.setState(
      {
        ...this.state,
        signedIn: true,
        user: {
          username: userData.username,
          email: userData.email
        }
      },
      this.getLinks(userData.username)
    );
  };

  getLinks = username => {
    fetch(`https://urlshrt0.herokuapp.com/api/links/${username}`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          ...this.state,
          user: {
            ...this.state.user,
            links: data
          }
        })
      );
  };

  unloadUser = () => {
    this.setState({
      ...this.state,
      signedIn: false,
      user: {
        username: null,
        email: null,
        links: []
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
          user={this.state.user}
          getLinks={this.getLinks}
          loadUser={this.loadUser}
        />
      </div>
    );
  }
}

export default App;
