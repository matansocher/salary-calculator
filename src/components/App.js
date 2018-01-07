import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveTime } from '../actions';
import ComboYear from './ComboYear';
import ComboMonth from './ComboMonth';
import MenuBar from './MenuBar';
import MainPage from './MainPage';
import HoursList from './HoursList';
import Settings from './Settings';
import NoMatch from './NoMatch';

class App extends Component {
  constructor(props) {
    super(props);

    this.changeYear = this.changeYear.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
  }
  changeMonth(value) {
    console.log('changeMonth');
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

          <ComboYear changeYear={this.changeYear} />
          <ComboMonth changeMonth={this.changeMonth} />

          <hr/>
          <Switch>
            <Route path="/HoursList" component={HoursList}/>
            <Route path="/Settings" component={Settings}/>
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
