import React, { Component } from "react";
import Links from "../Links/Links";

import styles from "./shortener.module.scss";

class Shortener extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      longUrl: null,
      shortUrl: "",
      responseMessage: null,
      copied: false,
      links: []
    };
    this.resultDisplay = React.createRef();
  }

  onLongUrlChange = event => {
    this.setState({ longUrl: event.target.value });
  };

  onShortnerSubmit = event => {
    fetch("https://url-short-api-4218.herokuapp.com/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        longUrl: this.state.longUrl,
        username: this.state.username
      })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          shortUrl: data.shortUrl,
          responseMessage: data.msg,
          copied: false
        });
        this.getLinks();
      });
    event.preventDefault();
  };

  componentDidMount = () => {
    this.getLinks();
  };

  getLinks = () => {
    fetch(
      `https://url-short-api-4218.herokuapp.com/api/links/${
        this.state.username
      }`,
      {
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(data => this.setState({ links: data }));
  };

  onCopyToClipboard = event => {
    this.resultDisplay.current.select();
    document.execCommand("copy");
    this.setState({ copied: true });
    event.preventDefault();
  };

  render() {
    return (
      <React.Fragment>
        <section className={styles.container}>
          <h1>Shortener</h1>
          <form
            className={styles.form_wrapper}
            onSubmit={this.onShortnerSubmit}
          >
            <p>{this.state.responseMessage}</p>
            <div className={styles.input_wrapper}>
              <label htmlFor="longUrl">Long URL: </label>
              <input
                type="url"
                name="longUrl"
                id="longUrl"
                placeholder="https://example.com/"
                required
                onChange={this.onLongUrlChange}
              />
            </div>
            <input type="submit" value="Shorten" />
            <div className={styles.input_wrapper}>
              <label htmlFor="shortUrl">Shortened URL: </label>
              <input
                type="url"
                name="shortUrl"
                placeholder="Shortened URL"
                ref={this.resultDisplay}
                value={this.state.shortUrl}
                readOnly
              />
            </div>
            <button onClick={this.onCopyToClipboard}>
              {this.state.copied ? "Copied!" : "Copy"}
            </button>
          </form>
        </section>
        {this.state.username ? <Links links={this.state.links} /> : ""}
      </React.Fragment>
    );
  }
}

export default Shortener;
