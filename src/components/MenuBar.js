import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import MainPage from './MainPage';
import HoursList from './HoursList';
import NoMatch from './NoMatch';

export default class MenuBar extends Component {
  render() {
    return(
      <Router>
        <div className='container'>
          <div className="row">
            <div className="col-sm-12 sidebar">
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                      <li className="menu-bar-item"><Link to="/">Home</Link></li>
                      <li className="menu-bar-item"><Link to="/HoursList">HoursList</Link></li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
          <hr/>
          <Switch>
            <Route exact path="/" component={MainPage}/>
            <Route path="/HoursList" component={HoursList}/>
            <Route path="*" component={NoMatch}/>
          </Switch>
        </div>
      </Router>
    );
  }
}
