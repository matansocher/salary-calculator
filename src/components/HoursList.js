import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { mapOnDays, getBruto, getNeto, getTax } from '../CommonFunctions';
import { fetchDays, addDay, deleteDay } from '../actions';
import MDSpinner from 'react-md-spinner';
import Day from './Day';
import MainPageObject from './MainPageObject';
// import DayAvatar from './DayAvatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Snackbar from 'material-ui/Snackbar';
// import MobileTearSheet from 'material-ui/MobileTearSheet';
// import { List } from 'material-ui/List';
import money from '../images/money.png';
import money2 from '../images/money2.png';
import wallet from '../images/wallet.png';

class HoursList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],
      settingsObject: {},
      dayOfMonth: 0,
      bruto: 0,
      neto: 0,
      tax: 0,
      numberOfDays: 0,
      numberOfHours: 0,
      numberOfHours100: 0,
      numberOfHours125: 0,
      numberOfHours150: 0,
      numberOfHoursNeto: 0,
      add: false,
      gesture: false,
      gestureText: '',
      loading: true

    }
    this.editDay = this.editDay.bind(this);
    this.deleteDay = this.deleteDay.bind(this);
  }

  componentDidMount() {
    const { days, settingsObject } = this.state;
    if(_.isEmpty(days) || _.isEmpty(settingsObject)) {
      const { year, month } = this.props.time;
      this.props.fetchDays(year, month);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: true });
    if ((this.props.time.year !== nextProps.time.year) ||
      (this.props.time.month !== nextProps.time.month)) { // check if date has changed
        this.props.fetchDays(nextProps.time.year, nextProps.time.month);
    }
    if (this.props.days !== nextProps.days) { // check if days array has changed
      const days = nextProps.days;
      const settingsObject = days[days.length - 1];
      // this.setState({ days, settingsObject, loading: false });
      this.setState({ days, settingsObject }, () => {
        // this.mapOnDays();
        this.buildPage();
      });
    }
  }

  buildPage() {
    const days = this.state.days;
    if(days.length  === 0) { // no days array yet from server
      return;
    }

    const { breakAfter, breakTime } = this.state.settingsObject;
    const arrayOfTotalHours = mapOnDays(days, breakAfter, breakTime);// [numberOfDays, numberOfHours, numberOfHoursNeto, numberOfHours100, numberOfHours125, numberOfHours150]
    const bruto = getBruto(arrayOfTotalHours, this.state.settingsObject);
    const tax = getTax(bruto);
    const neto = getNeto(bruto, tax, this.state.settingsObject);
    this.setState({
      bruto: bruto.toFixed(2),
      neto: neto.toFixed(2),
      tax: tax.toFixed(2),
      numberOfDays: arrayOfTotalHours[0],
      numberOfHours: arrayOfTotalHours[1].toFixed(2),
      numberOfHours100: arrayOfTotalHours[3].toFixed(2),
      numberOfHours125: arrayOfTotalHours[4].toFixed(2),
      numberOfHours150: arrayOfTotalHours[5].toFixed(2),
      numberOfHoursNeto: arrayOfTotalHours[2].toFixed(2),
      loading: false
    });
  }

  editDay(day) {
    this.setState({ loading: true }, () => {
      const { breakAfter, breakTime } = this.state.settingsObject;
      this.props.addDay(day, breakAfter, breakTime, () => { // the 2 is to edit, 1 is to add
        setTimeout(() => {
          this.setState({ loading: false, gestureText: "Changes Saved!", gesture: true });
        }, 1000);
      });
    });

  }

  deleteDay(day) {
    // if in add day at AddDay class works the callback after the loading true state, add to here also
    this.setState({ loading: true },() => {
      this.props.deleteDay(day, () => {
        setTimeout(() => {
          this.setState({ loading: false, gestureText: "Day Deleted Successfully", gesture: true });
        }, 1000);
      });
    });
  }

  handleAddClick = () => {
    this.props.history.push('/AddDay');
  }

  handleRequestClose = () => {
    this.setState({ gesture: false, });
  };

  renderList() {
    const { days, settingsObject } = this.state;

    if (days.length === 1)
      return (<div className="container container-fluid"><h1>No Working Days On This Month!</h1></div>);
    else {
      return (
        days.map(day => {
          const key = `${day.year}${day.month}${day.day}`;
          if (day.day !== 0) {
            return <Day key={key} day={day} settingsObject={settingsObject}
                    editDay={this.editDay} deleteDay={this.deleteDay} time={this.props.time} />
          }
          return <span key={key}/>;
        })
      );
    }
  }

  // renderListTwo() {
  //   const { days, settingsObject } = this.state;
  //   // if (days.length === 0)
  //   //   return (<div className="container container-fluid"><h1>No Working Days On This Month!</h1></div>);
  //   if (days.length === 1)
  //     return (<div className="container container-fluid"><h1>No Working Days On This Month!</h1></div>);
  //   else {
  //     return (
  //       days.map(day => {
  //         const key = `${day.year}${day.month}${day.day}`;
  //         if (day.day !== 0) {
  //           return <DayAvatar />
  //         }
  //         return <span key={key}/>;
  //       })
  //     );
  //   }
  // }

  renderObjects() {
    const days = this.state.days;
    // if(days.length === 0) { // no days on this month
    //   return (<div className="container container-fluid"><h1>No Working Days On This Month!</h1></div>);
    if(days.length === 1) { // no days on this month
      return;
    } else { // there is data to show
      return (
        <div>
        <MainPageObject image={money} icon="fa fa-money" header="Bruto" value={this.state.bruto} />
        <MainPageObject image={wallet} icon="fa fa-money" header="Neto" value={this.state.neto} />
        <MainPageObject image={money2} icon="fa fa-money" header="Tax" value={this.state.tax} />
        <MainPageObject image={money} icon="fa fa-money" header="Number Of Working Days" value={this.state.numberOfDays} />
        <MainPageObject image={money2} icon="fa fa-money" header="Hours Bruto" value={this.state.numberOfHours} />
        <MainPageObject image={money} icon="fa fa-money" header="Hours Neto" value={this.state.numberOfHoursNeto} />
        <MainPageObject image={money2} icon="fa fa-money" header="BreaksTime" value={this.state.numberOfHours - this.state.numberOfHoursNeto} />
        <MainPageObject image={money} icon="fa fa-money" header="100% Hours" value={this.state.numberOfHours100} />
        <MainPageObject image={money2} icon="fa fa-money" header="125% Hours" value={this.state.numberOfHours125} />
        <MainPageObject image={money} icon="fa fa-money" header="150% Hours" value={this.state.numberOfHours150} />
        </div>
      )
    }
  }

  render() {
    return(
      <div className="container container-fluid blue-font">

        <h1>Hours List</h1>
        <MuiThemeProvider>
          <Snackbar open={this.state.gesture} message={this.state.gestureText}
            autoHideDuration={4000} onRequestClose={this.handleRequestClose} />
        </MuiThemeProvider>
        {this.state.loading ? <MDSpinner className="spinner" size={100} /> : <span />}

        <MuiThemeProvider>
          <FloatingActionButton className="float" onClick={this.handleAddClick}>
            <ContentAdd />
          </FloatingActionButton>
        </MuiThemeProvider>

        {this.renderList()}
        <br />
        {this.renderObjects()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    time: state.time,
    days: state.days
  };
}

export default connect(mapStateToProps, { fetchDays, addDay , deleteDay })(HoursList);

// <MuiThemeProvider>
//   <List>
//     {this.renderListTwo()}
//   </List>
// </MuiThemeProvider>
