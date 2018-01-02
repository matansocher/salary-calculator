import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import ComboYear from './components/ComboYear';
import ComboMonth from './components/ComboMonth';
// import MenuBar from './components/MenuBar';
import MainPage from './components/MainPage';
import HoursList from './components/HoursList';
import Settings from './components/Settings';
import NoMatch from './components/NoMatch';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: new Date().getFullYear(),
      month: (new Date().getMonth() + 1)
    }
  }
  changeMonth(value) {
    this.setState({ month: value });
  }
  changeYear(value) {
    this.setState({ year: value });
  }
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <Router>
          <div className="container container-fluid">
            <div className="row">
              <div className="col-sm-12 sidebar">
                <nav className="navbar navbar-toggleable-md fixed-top navbar-inverse bg-uniqueColor">
                  <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <h2>Logo</h2>
                  <div className="container-fluid">
                    <div id="navbar" className="navbar-collapse collapse">
                      <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                          <Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Home</Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/HoursList"><i className="fa fa-list" aria-hidden="true"></i> Hours List</Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/Settings"><i className="fa fa-cog" aria-hidden="true"></i> Settings</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
            </div>

            <ComboYear changeYear={this.changeYear.bind(this)} />
            <ComboMonth changeMonth={this.changeMonth.bind(this)} />

            <hr/>
            <Switch>
              <Route path="/" render={()=><MainPage year={this.state.year} month={this.state.month}/>}/>
              <Route path="/HoursList" render={()=><HoursList year={this.state.year} month={this.state.month}/>}/>
              <Route path="/Settings" render={()=><Settings year={this.state.year} month={this.state.month}/>}/>
              <Route path="*" component={NoMatch}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     settingsObject: state.settingsObject
//   };
// }
//
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ saveMonth, saveYear }, dispatch);
// }
//
// export default connect(null, mapDispatchToProps)(App);
// export default connect(mapStateToProps, { saveMonth, saveYear })(App);
