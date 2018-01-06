import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MenuBar extends Component {
  render() {
    return(
      <div className="container blue-font">
        <div className="row">
          <div className="col-sm-12">
            <nav className="navbar navbar-inverse">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand">Sal-Cal</a>
                </div>
                <div className="collapse navbar-collapse" id="myNavbar">
                  <ul className="nav navbar-nav">
                    <li className="menu-bar-item"><Link to="/">
                      <i className="fa fa-home" aria-hidden="true"></i> Home
                    </Link></li>
                    <li className="menu-bar-item"><Link to="/HoursList">
                      <i className="fa fa-list-ul" aria-hidden="true"></i> Hours List
                    </Link></li>
                    <li className="menu-bar-item"><Link to="/Settings">
                      <i className="fa fa-cog" aria-hidden="true"></i> Settings
                    </Link></li>
                  </ul>
                  <ul className="nav navbar-nav navbar-right">
                    <li><a href="/Home"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
                    <li><a href="/Home"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
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
