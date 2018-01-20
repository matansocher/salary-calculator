import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { populateOptionsForDayMonth } from '../CommonFunctions';
import { fetchDays, addDay } from '../actions';
import MDSpinner from 'react-md-spinner';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import TimePicker from 'material-ui/TimePicker';
import Snackbar from 'material-ui/Snackbar';


class AddDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],
      settingsObject: {},
      day: new Date().getDate(),
      enterTime: new Date(),
      exitTime: new Date(),
      gesture: false,
      gestureText: '',
      loading: false
    };
    this.addDay = this.addDay.bind(this);
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

  addDay() {
    this.setState({ loading: true }, () => {

      const { breakAfter, breakTime } = this.state.settingsObject;
      const { year, month } = this.props.time;
      const { day, enterTime, exitTime } = this.state;
      this.props.addDay({
        day,
        month,
        year,
        enterTime,
        exitTime
      }, breakAfter, breakTime, () => { // the 1 is to add, 2 is to edit
        setTimeout(() => {
          this.setState({ loading: false, gestureText: "Day Added Successfully!", gesture: true });
          this.props.history.push('/HoursList');
        }, 1000);
      });
    });
  }

  handleDayChange = (a, value) => {
    this.setState({ day: value + 1 });
  }

  handleEnterHourChange = (a, value) => {
    this.setState({ enterTime: value });
  }

  handleExitHourChange = (a, value) => {
    this.setState({ exitTime: value });
  }

  handleCancelClick = () => {
    this.props.history.push('/HoursList');
  }

  render() {
    return (
      <div className="container container-fluid blue-font">
        <h1>Add Day</h1>
        {this.state.loading ? <MDSpinner className="spinner" size={100} /> : <span />}

        <MuiThemeProvider>
          <Snackbar open={this.state.gesture} message={this.state.gestureText}
            autoHideDuration={4000} onRequestClose={this.handleRequestClose} />
        </MuiThemeProvider>

        <li className="col-sm-12 col-md-12 list-group-item">
          <MuiThemeProvider>
            <div>
              <SelectField floatingLabelText="Day Of Month" value={this.state.day} onChange={this.handleDayChange} >
                {populateOptionsForDayMonth(this.props.time.month)}
              </SelectField>
              <TimePicker className="time-picker" format="24hr" hintText="Enter Hour" okLabel="OK" cancelLabel="Cancel"
                value={this.state.enterTime} onChange={this.handleEnterHourChange}/>
              <TimePicker className="time-picker" format="24hr" hintText="Exit Hour" okLabel="OK" cancelLabel="Cancel"
                value={this.state.exitTime} onChange={this.handleExitHourChange}/>
            </div>
          </MuiThemeProvider>

          <button onClick={this.addDay} className="btn btn-success regular-button pull-xs-right">
            <i className="fa fa-floppy-o" aria-hidden="true"></i> Add
          </button>
          <button onClick={this.handleCancelClick} className="btn btn-primary regular-button pull-xs-left">
            <i className="fa fa-trash" aria-hidden="true"></i> Cancel
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

export default connect(mapStateToProps, { fetchDays, addDay })(AddDay);
