import React from "react";

import styles from "./links.module.scss";

const Links = ({ links }) => {
  if (links.length > 0) {
    return (
      <section className={styles.container}>
        <h1>Your Links</h1>
        <div className={styles.tableWrapper}>
          <table>
            <thead>
              <tr>
                <th>Original URL</th>
                <th className={styles.responsive}>Shortened URL</th>
              </tr>
            </thead>
            <tbody>
              {links.map(link => {
                return (
                  <tr>
                    <td>
                      <a
                        href={link.longurl}
                        target="#"
                        rel="noopener noreferrer"
                      >
                        {link.longurl}
                      </a>
                    </td>
                    <td className={styles.responsive}>
                      <a
                        href={link.longurl}
                        target="#"
                        rel="noopener noreferrer"
                      >{`https://urlshrt0.herokuapp.com/${link.slug}`}</a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    );
  } else {
    return "";
  }
};

export default Links;
