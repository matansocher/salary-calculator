import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchDays, setDay, deleteDay } from '../actions';
import MDSpinner from 'react-md-spinner';
import Day from './Day';
// import DayAvatar from './DayAvatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Snackbar from 'material-ui/Snackbar';
// import MobileTearSheet from 'material-ui/MobileTearSheet';
// import { List } from 'material-ui/List';


class HoursList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],
      settingsObject: {},
      dayOfMonth: 0,
      enterTime: '00:00',
      exitTime: '00:00',
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
      this.setState({ days, settingsObject, loading: false });
    }
  }

  editDay(day) {
    // if in add day at AddDay class works the callback after the loading true state, add to here also
    this.setState({ loading: true });
    const { breakAfter, breakTime } = this.state.settingsObject;
    this.props.setDay(day, breakAfter, breakTime, 2); // the 2 is to edit, 1 is to add
    // not really - need it as a callback
    setTimeout(() => {
      this.setState({ loading: false, gestureText: "Changes Saved!", gesture: true });
    }, 1000);
  }

  deleteDay(day) {
    // if in add day at AddDay class works the callback after the loading true state, add to here also
    this.setState({ loading: true });
    this.props.deleteDay(day);
    // not really - need it as a callback
    setTimeout(() => {
      this.setState({ loading: false, gestureText: "Day Deleted Successfully", gesture: true });
    }, 1000);
  }

  handleCancelClick = () => {
    this.setState({ add: false })
  }

  handleAddClick = () => {
    this.props.history.push('/AddDay');
  }

  handleRequestClose = () => {
    this.setState({ gesture: false, });
  };

  renderList() {
    const { days, settingsObject } = this.state;
    // if (days.length === 0)
    //   return (<div className="container container-fluid"><h1>No Working Days On This Month!</h1></div>);
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

export default connect(mapStateToProps, { fetchDays, setDay , deleteDay })(HoursList);

// <MuiThemeProvider>
//   <List>
//     {this.renderListTwo()}
//   </List>
// </MuiThemeProvider>
