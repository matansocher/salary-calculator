import React, { Component } from 'react';

export default class MenuBar extends Component {
  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-sm-12 sidebar">
            <nav className="navbar navbar-toggleable-md fixed-top navbar-inverse bg-uniqueColor">
              <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <a className="navbar-brand" href="#">
                <h2>Logo</h2>
              </a>
              <div className="container-fluid">
                <div id="navbar" className="navbar-collapse collapse">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <Link to="/"><i class="fa fa-home" aria-hidden="true"></i> Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/HoursList"><i class="fa fa-list" aria-hidden="true"></i> Hours List</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/Settings"><i class="fa fa-cog" aria-hidden="true"></i> Settings</Link>
                    </li>
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
