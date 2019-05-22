import React, { Component } from "react";

export default class NavComponent extends Component {
  render() {
    return (
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active" href="#">
              <span data-feather="home" />
              Dashboard <span className="sr-only">(current)</span>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
