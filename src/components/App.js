import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { saveTime } from '../actions';
import ComboYear from './components/ComboYear';
import ComboMonth from './components/ComboMonth';
import MenuBar from './components/MenuBar';
import MainPage from './components/MainPage';
import HoursList from './components/HoursList';
import Settings from './components/Settings';
import NoMatch from './components/NoMatch';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: new Date().getFullYear(),
      month: (new Date().getMonth() + 1)
    }
    this.changeYear = this.changeYear.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
  }
  changeMonth(value) {
    this.setState({ month: value }, () => {
      this.props.saveTime(this.state.year, this.state.month);
    });
  }
  changeYear(value) {
    this.setState({ year: value }, () => {
      this.props.saveTime(this.state.year, this.state.month);
    });
  }
  render() {
    return (
      <Router>
        <div className="container container-fluid">

          <MenuBar />

          <ComboYear val={this.state.year} changeYear={this.changeYear} />
          <ComboMonth val={this.state.month} changeMonth={this.changeMonth} />

          <hr/>
          <Switch>
            <Route path="HoursList" component={HoursList}/>
            <Route path="Settings" component={Settings}/>
            <Route path="/" component={MainPage}/>
            <Route path="*" component={NoMatch}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     time: state.time
//   };
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveTime }, dispatch);
}

export default connect(null, mapDispatchToProps)(App);
// export default connect(mapStateToProps, { saveTime })(App);
