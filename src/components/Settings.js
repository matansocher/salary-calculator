import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchSettings, saveSettings } from '../actions';
import MDSpinner from 'react-md-spinner';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsObject: {},
      hourly: 0,
      breakTime: 0,
      breakAfter: 0,
      pension: 0,
      drives: 0,
      others: 0,
      editing: false,
      gesture: false,
      loading: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
  }

  componentDidMount() {
    const { settingsObject } = this.state;
    if(_.isEmpty(settingsObject)) {
      const { year, month } = this.props.time;
      this.props.fetchSettings(year, month);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: true });
    if ((this.props.time.year !== nextProps.time.year) ||
      (this.props.time.month !== nextProps.time.month)) { // check if date has changed
        this.props.fetchSettings(nextProps.time.year, nextProps.time.month);
    }
    if (this.props.settingsObject !== nextProps.settingsObject && nextProps.settingsObject) { // check if settings object has changed
      const settingsObject = nextProps.settingsObject;
      const { hourly, breakTime, breakAfter, pension, drives, others} = settingsObject;
      this.setState({
        settingsObject,
        hourly,
        breakTime,
        breakAfter,
        pension,
        drives,
        others,
        loading: false
      });
    }
  }

  saveSettings() {
    this.setState({ loading: true });
    this.setState({ loading: true }, () => {
      const { year, month } = this.props.time;
      const { hourly, breakTime, breakAfter, pension, drives, others } = this.state;

      this.props.saveSettings({
        day: 0,
        month,
        year,
        hourly,
        breakTime,
        breakAfter,
        pension,
        drives,
        others
      }, () => {
        setTimeout(() => {
          this.setState({ editing: false, loading: false, gesture: true });
        }, 1000);
      });
    });
    // this.setState({ editing: false, loading: false, gesture: true });
  }

  handleChange(e) {
    var change = {};
    if (!isNaN(e.target.value)) {
      change[e.target.name] = e.target.value;
      this.setState(change);
    }
  }

  handleCancelClick = () => {
    this.setState({ editing: false })
  }

  handleEditClick = () => {
    this.setState({ editing: true });
  }

  handleRequestClose = () => {
    this.setState({ gesture: false, });
  };

  renderEdit() {
    return(
      <div className="container container-fluid">
        <MuiThemeProvider>
          <div>
            <TextField floatingLabelText="Hourly Wage" name="hourly"
                value={this.state.hourly} onChange={this.handleChange} />
            
            <TextField floatingLabelText="Break Time" name="breakTime"
                value={this.state.breakTime} onChange={this.handleChange} />
            
            <TextField floatingLabelText="Break After" name="breakAfter"
                value={this.state.breakAfter} onChange={this.handleChange} />
            
            <TextField floatingLabelText="Pension" name="pension"
                value={this.state.pension} onChange={this.handleChange} />
            
            <TextField floatingLabelText="Drives" name="drives"
                value={this.state.drives} onChange={this.handleChange} />
            
            <TextField floatingLabelText="Others" name="others"
                value={this.state.others} onChange={this.handleChange} />
          </div>
        </MuiThemeProvider>

        <button onClick={this.saveSettings} className="btn btn-success regular-button">
          <i className="fa fa-floppy-o" aria-hidden="true"></i> Save
        </button>
        <button onClick={this.handleCancelClick} className="btn btn-primary regular-button">
          <i className="fa fa-times" aria-hidden="true"></i> Cancel
        </button>
      </div>
    );
  }
  renderRegular() {
    const { hourly, breakTime, breakAfter, pension, drives, others } = this.state.settingsObject;
    return(
      <div>
        <button className="btn btn-warning regular-button" onClick={this.handleEditClick}>
          <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
        </button>

        <h3>Hourly Wage: {hourly}</h3>
        <h3>Break Time: {breakTime}</h3>
        <h3>Break After: {breakAfter}</h3>
        <h3>Pension Reduction %: {pension}</h3>
        <h3>Drives: {drives}</h3>
        <h3>Others: {others}</h3>
      </div>
    );
  }
  render() {
    return(
      <div className="container container-fluid blue-font">
        <h1>Settings</h1>
        <MuiThemeProvider>
          <Snackbar open={this.state.gesture} message="Settings were saved successfully"
            autoHideDuration={4000} onRequestClose={this.handleRequestClose} />
        </MuiThemeProvider>
        {this.state.loading ? <MDSpinner className="spinner" size={100} /> : <span />}

        {this.state.editing ? this.renderEdit() : this.renderRegular()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    time: state.time,
    settingsObject: state.settingsObject
  };
}

export default connect(mapStateToProps, { saveSettings, fetchSettings })(Settings);
