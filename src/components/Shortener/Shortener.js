import React, { Component } from "react";

class Shortener extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // signedIn: null
      username: props.username,
      longUrl: null,
      shortUrl: "",
      responseMessage: null
    };
  }

  onLongUrlChange = event => {
    this.setState({ longUrl: event.target.value });
  };

  onShortUrlChange = event => {
    this.setState({ shortUrl: event.target.value });
  };

  onShortnerSubmit = event => {
    fetch("http://localhost:5000/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        longUrl: this.state.longUrl,
        username: this.state.username
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          shortUrl: data.slug,
          responseMessage: data.msg
        });
      });
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <h1>/Shortener</h1>
        <form onSubmit={this.onShortnerSubmit}>
          <p>{this.state.responseMessage}</p>
          <div>
            <label htmlFor="longUrl">Long URL: </label>
            <input
              type="url"
              name="longUrl"
              id="longUrl"
              placeholder="https://example.com/"
              required
              onChange={this.onLongUrlChange}
            />
            <input type="submit" value="Shorten" />
          </div>
        </form>

        <div>
          <label htmlFor="shortUrl">Shortened URL: </label>
          <input
            type="url"
            name="shortUrl"
            placeholder="Shortened URL"
            value={this.state.shortUrl}
            readOnly
            onChange={this.onShortUrlChange}
          />
          <button>Copy</button>
        </div>
      </div>
    );
  }
}

export default Shortener;

// <div className={styles.input_wrapper}>
// <label htmlFor="email">Email:</label>
// <input
//   type="email"
//   name="email"
//   id="email"
//   onChange={this.onEmailChange}
//   required
// />
// </div>
