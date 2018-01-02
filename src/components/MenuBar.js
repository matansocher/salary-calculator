import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MenuBar extends Component {
  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-sm-12 sidebar">
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div id="navbar" className="navbar-collapse collapse">
                  <ul className="nav navbar-nav">
                    <li className="menu-bar-item"><Link to="/">Home</Link></li>
                    <li className="menu-bar-item"><Link to="/HoursList">Hours List</Link></li>
                    <li className="menu-bar-item"><Link to="/Settings">Settings</Link></li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}
