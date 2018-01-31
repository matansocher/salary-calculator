import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveTime } from '../actions';
import AddDay from './AddDay';
import ComboYear from './ComboYear';
import ComboMonth from './ComboMonth';
import CustomBottomNavigation from './CustomBottomNavigation';
import MenuBar from './MenuBar';
import MainPage from './MainPage';
import HoursList from './HoursList';
import Settings from './Settings';
import SignInOrSignUp from './SignInOrSignUp';
import Footer from './Footer';
import NoMatch from './NoMatch';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      year: new Date().getFullYear(),
      month: (new Date().getMonth() + 1)
    }
  }

  changeMonth = (value) => {
    this.setState({ month: value }, () => {
      this.props.saveTime(this.state.year, this.state.month);
    });
  }

  changeYear = (value) => {
    this.setState({ year: value }, () => {
      this.props.saveTime(this.state.year, this.state.month);
    });
  }

  // changeMonth(value) {
  //   this.setState({ month: value }, () => {
  //     this.props.saveTime(this.state.year, this.state.month);
  //   });
  // }
  // changeYear(value) {
  //   this.setState({ year: value }, () => {
  //     this.props.saveTime(this.state.year, this.state.month);
  //   });
  // }
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
            <Route path="/AddDay" component={AddDay}/>
            <Route path="/SignInOrSignUp" component={SignInOrSignUp}/>
            <Route path="/" component={MainPage}/>
            <Route path="*" component={NoMatch}/>
          </Switch>

          <CustomBottomNavigation />

          <Footer />

        </div>
      </Router>
    );
  }
}

export default connect(null, { saveTime })(App);
