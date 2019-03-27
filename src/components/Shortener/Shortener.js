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
    this.resultDisplay = React.createRef();
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
          shortUrl: data.shortUrl,
          responseMessage: data.msg
        });
      });
    event.preventDefault();
  };

  onCopyToClipboard = () => {
    this.resultDisplay.current.select();
    document.execCommand("copy");
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
            ref={this.resultDisplay}
            value={this.state.shortUrl}
            readOnly
            onChange={this.onShortUrlChange}
          />
          <button onClick={this.onCopyToClipboard}>Copy</button>
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
