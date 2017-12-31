import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { fetchDays, saveSettings } from '../actions';
import { createStore, applyMiddleware, bindActionCreators } from 'redux';
import promise from 'redux-promise';
import MenuBar from './components/MenuBar';
import MainPage from './components/MainPage';
import HoursList from './components/HoursList';
import Settings from './components/Settings';
import NoMatch from './components/NoMatch';
import reducers from '../reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class App extends Component {
  changeMonth(value) {
    this.props.saveMonth(value);
  }
  changeYear(value) {
    this.props.saveYear(value);
  }
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <MenuBar />

        <ComboYear changeYear={this.changeYear.bind(this)} />
        <ComboMonth changeMonth={this.changeMonth.bind(this)} />

        <Router>
            <hr/>
            <Switch>
              <Route exact path="/" component={MainPage}/>
              <Route path="/HoursList" component={HoursList}/>
              <Route path="/Settings" component={Settings}/>
              <Route path="*" component={NoMatch}/>
            </Switch>
        </Router>
      </Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    settingsObject: state.settingsObject
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveMonth, saveYear }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default connect(mapStateToProps, { saveMonth, saveYear })(App);
