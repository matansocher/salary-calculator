import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchSettings, saveSettings } from '../actions';
import MDSpinner from 'react-md-spinner';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import SaveIcon from 'material-ui/svg-icons/action/pregnant-woman';

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
    this.setState({ loading: false });
  }

  saveSettings = () => {
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
  }

  handleChange = (e) => {
    var change = {};
    if (!isNaN(e.target.value)) {
      change[e.target.name] = e.target.value;
      this.setState(change);
    }
  }

  handleChangeSlider = (name, e, val) => {
    var change = {};
    change[name] = val;
    this.setState(change);
  }

  handleCancelClick = () => {
    this.setState({ editing: false })
  }

  handleEditClick = () => {
    this.setState({ editing: true });
  }

  handleRequestClose = () => {
    this.setState({ gesture: false });
  };

  renderEdit() {
    return(
      <div className="container container-fluid">
        <MuiThemeProvider>
          <div>
            <TextField floatingLabelText="Hourly Wage" name="hourly"
                value={this.state.hourly} onChange={this.handleChange} />
            <p>Insert your hourly wage</p>
            <TextField floatingLabelText="Break Time" name="breakTime"
                value={this.state.breakTime} onChange={this.handleChange} />
            <p>Insert the time of your break</p>
            <TextField floatingLabelText="Break After" name="breakAfter"
                value={this.state.breakAfter} onChange={this.handleChange} />
            <p>Insert the time that ends the regular hours caculations</p>


            <TextField floatingLabelText="Pension" name="pension"
                value={this.state.pension} onChange={this.handleChange} />

            <Slider
              min={0}
              max={10}
              step={0.5}
              value={this.state.pension}
              onChange={(e, val) => this.handleChangeSlider("pension", e, val)}
            />

            <p>Insert your pension % reduction</p>
            <TextField floatingLabelText="Drives" name="drives"
                value={this.state.drives} onChange={this.handleChange} />
            <p>Insert your drives amount you are recieving per day</p>
            <TextField floatingLabelText="Others" name="others"
                value={this.state.others} onChange={this.handleChange} />
            <p>Insert other incomes you have per month</p>

            <br />

            <RaisedButton onClick={this.handleCancelClick} className="pull-left"
                label="Cancel" primary={true} icon={<ClearIcon />} />
            <RaisedButton onClick={this.saveSettings} className="pull-right"
                label="Save" primary={true} icon={<SaveIcon />} />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
  renderRegular() {
    const { hourly, breakTime, breakAfter, pension, drives, others } = this.state.settingsObject;
    return(
      <div className="container container-fluid">


        <h3>Hourly Wage: {hourly}</h3>
        <p>Insert your hourly wage</p>
        <h3>Break Time: {breakTime}</h3>
        <p>Insert the time of your break</p>
        <h3>Break After: {breakAfter}</h3>
        <p>Insert the time that ends the regular hours caculations</p>
        <h3>Pension Reduction %: {pension}</h3>
        <p>Insert your pension % reduction</p>
        <h3>Drives: {drives}</h3>
        <p>Insert your drives amount you are recieving per day</p>
        <h3>Others: {others}</h3>
        <p>Insert other incomes you have per month</p>

        <br />

        <MuiThemeProvider>
          <RaisedButton onClick={this.handleEditClick} label="Edit"
          className="pull-right" primary={true} icon={<EditIcon />} />
        </MuiThemeProvider>

      </div>
    );
  }
  render() {
    return(
      <div className="container container-fluid blue-font">
        <h1>Settings</h1>
        <MuiThemeProvider>
          <Snackbar open={this.state.gesture} message="Changes saved successfully"
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
