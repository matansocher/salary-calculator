import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { populateOptionsForDayMonth, isValidDayOfMonth } from '../CommonFunctions';
import { fetchDays, addDay } from '../actions';
import MDSpinner from 'react-md-spinner';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import TimePicker from 'material-ui/TimePicker';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import SaveIcon from 'material-ui/svg-icons/action/pregnant-woman';
// import saveIcon from '../images/save.png';
// import cancelIcon from '../images/cancel.png';


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
    this.setState({ loading: false });
  }

  addDay() {
    this.setState({ loading: true }, () => {
      const { days, day, enterTime, exitTime } = this.state;
      if (!isValidDayOfMonth(days, day)) {
        this.setState({ loading: false, gestureText: `Day ${day} already exists`, gesture: true })
        return;
      }

      const { breakAfter, breakTime } = this.state.settingsObject;
      const { year, month } = this.props.time;
      this.props.addDay({
        day,
        month,
        year,
        enterTime,
        exitTime
      }, breakAfter, breakTime, () => {
        setTimeout(() => {
          this.setState({ loading: false, gestureText: "Day Added Successfully!", gesture: true });
          this.props.history.push('/');
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
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="container container-fluid blue-font">
        <h1>Add Day</h1>
        {this.state.loading ? <MDSpinner className="spinner" size={100} /> : <span />}
        <MuiThemeProvider>
          <div>
            <Snackbar open={this.state.gesture} message={this.state.gestureText}
              autoHideDuration={4000} onRequestClose={this.handleRequestClose} />
            <SelectField floatingLabelText="Day Of Month" value={this.state.day} onChange={this.handleDayChange} >
              {populateOptionsForDayMonth(this.props.time.month)}
            </SelectField>
            <TimePicker className="time-picker" format="24hr" hintText="Enter Hour" okLabel="OK" cancelLabel="Cancel"
              value={this.state.enterTime} onChange={this.handleEnterHourChange}/>
            <TimePicker className="time-picker" format="24hr" hintText="Exit Hour" okLabel="OK" cancelLabel="Cancel"
              value={this.state.exitTime} onChange={this.handleExitHourChange}/>

            <br />

            <RaisedButton onClick={this.handleCancelClick} className="pull-left"
                label="Cancel" primary={true} icon={<ClearIcon />} />
            <RaisedButton onClick={this.addDay} className="pull-right"
                label="Save" primary={true} icon={<SaveIcon />} />
          </div>
        </MuiThemeProvider>
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
