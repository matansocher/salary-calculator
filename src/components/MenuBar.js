import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import MainPage from './MainPage';
import HoursList from './HoursList';
import Settings from './Settings';
import NoMatch from './NoMatch';
import reducers from '../reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

export default class MenuBar extends Component {
  render() {
    return(
      <Provider store={createStoreWithMiddleware(reducers)}>
        <Router>
          <div className='container'>
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
            <hr/>
            <Switch>
              <Route exact path="/" component={MainPage}/>
              <Route path="/HoursList" component={HoursList}/>
              <Route path="/Settings" component={Settings}/>
              <Route path="*" component={NoMatch}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
