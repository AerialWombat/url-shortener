import React, { Component } from "react";

import styles from "./links.module.scss";

class Links extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      links: []
    };
  }

  componentDidMount = () => {
    console.log("LINKS DID MOUNT");
    fetch(`http://localhost:5000/api/links/${this.state.username}`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => this.setState({ links: data }));
  };

  render() {
    return (
      <section className={styles.container}>
        <h1>Your Links</h1>
        <div className={styles.tableWrapper}>
          <table>
            <tr>
              <th>Original URL</th>
              <th className={styles.responsive}>Shortened URL</th>
            </tr>
            {this.state.links.map(link => {
              return (
                <tr>
                  <td>
                    <a href={link.longurl} target="#" rel="noopener noreferrer">
                      {link.longurl}
                    </a>
                  </td>
                  <td className={styles.responsive}>
                    <a
                      href={link.longurl}
                      target="#"
                      rel="noopener noreferrer"
                    >{`localhost:5000/${link.slug}`}</a>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </section>
    );
  }
}

export default Links;
