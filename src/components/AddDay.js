import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { fetchDays, setDay } from '../actions';
import MDSpinner from 'react-md-spinner';
import ComboDay from './ComboDay';
import ComboHour from './ComboHour';
import ComboMinute from './ComboMinute';

class AddDay extends Component {
  constructor(props) {
    super(props);
    const dateString = new Date();
    this.state = {
      days: [],
      settingsObject: {},
      day: dateString.getDate(),
      enterhour: dateString.getHours(),
      enterminute: dateString.getMinutes(),
      exithour: dateString.getHours(),
      exitminute: dateString.getMinutes(),
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.addDay = this.addDay.bind(this);
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

  addDay() {
    this.setState({ loading: true });
    const { breakAfter, breakTime } = this.state.settingsObject;
    const { year, month } = this.props.time;
    let { day, enterhour, enterminute, exithour, exitminute } = this.state;

    this.props.setDay({
      day: day,
      month: month,
      year: year,
      enterhour: enterhour,
      enterminute: enterminute,
      exithour: exithour,
      exitminute: exitminute
    }, breakAfter, breakTime, 1); // the 1 is to add, 2 is to edit

    // not really - need it as a callback
    setTimeout(() => {
      // gesture to user that the changes were saved
      // this.setState({ gesture: true });
      this.props.history.push('/HoursList');
      this.setState({ loading: false });
    }, 1000);
  }

  handleChange(value, name) {
    var change = {};
    change[name] = value;
    this.setState(change);
  }

  handleCancelClick = () => {
    this.props.history.push('/HoursList');
  }

  render() {
    return (
      <div className="container container-fluid">
        <h1>Add Day</h1>
        {this.state.loading ? <MDSpinner className="spinner" size={100} /> : <span />}

        <li className="col-sm-12 col-md-12 list-group-item">
          <h3>Day On Month:</h3>
            <ComboDay handleChange={this.handleChange} month={this.props.time.month} name="day" />
            <div className="row">
            <h3>Enter Hour:</h3>
            <div className="col-sm-5 col-md-5">
              <ComboHour handleChange={this.handleChange} name="enterhour" />
            </div>
            <div className="col-sm-2 col-md-2">
              :
            </div>
            <div className="col-sm-5 col-md-5">
              <ComboMinute handleChange={this.handleChange} name="enterminute" />
            </div>
          </div>
          <h3>Exit Hour:</h3>
          <ComboHour handleChange={this.handleChange} name="exithour" />
          :
          <ComboMinute handleChange={this.handleChange} name="exitminute" />

          <button onClick={this.addDay} className="btn btn-success regular-button hours-input">
            <i className="fa fa-floppy-o" aria-hidden="true"></i> Add
          </button>
          <button onClick={this.handleCancelClick} className="btn btn-primary regular-button hours-input">
            <i className="fa fa-times" aria-hidden="true"></i> Cancel
          </button>
        </li>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDays, setDay }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDay);
// export default connect(mapStateToProps, { fetchDays, setDay })(AddDay);
