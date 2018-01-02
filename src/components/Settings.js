import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSettings, saveSettings } from '../actions';

// import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';

import MDSpinner from 'react-md-spinner';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hourly: 0,
      breakTime: 0,
      breakAfter: 0,
      pension: 0,
      drives: 0,
      others: 0,
      editing: false,
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
  }

  setCurrentState() {
    const { hourly, breakTime, breakAfter, pension, drives, others } = this.props.settingsObject;
    this.setState({
      hourly: hourly,
      breakTime: breakTime,
      breakAfter: breakAfter,
      pension: pension,
      drives: drives,
      others: others
    });
  }

  componentDidMount() {
    const { year, month } = this.props;
    this.setState({ loading: true }, () => {
      this.props.fetchSettings(year, month);
      // need to enter setCurrentState into callback function
      this.setCurrentState();
    });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  saveSettings() {
    const { year, month } = this.props;
    const { hourly, breakTime, breakAfter, pension, drives, others } = this.refs;
    this.setState({ loading: true }, () => {
      console.log(`days/${year}/${month}/settings`);
      const settingsObject = {
        day: 0,
        month: month,
        year: year,
        hourly: hourly.value,
        breakTime: breakTime.value,
        breakAfter: breakAfter.value,
        pension: pension.value,
        drives: drives.value,
        others: others.value
      }
      this.props.saveSettings(settingsObject);
    });
    // not really, need it as a callback
    setTimeout(() => {
      this.setState({ loading: false });
      // gesture to user that the changes were saved
    }, 1000);
  }
  handleChange(e) {
    var change = {};
    // let currentState = this.state[e.target.name];
    if (!isNaN(e.target.value)) {
      change[e.target.name] = e.target.value;
      this.setState(change);
    }
  }

  renderEdit() {
    return(
      <div>
        <h3>Hourly Wage:</h3>
        <input className="form-control medium-input" name="hourly" ref="hourly" value={this.state.hourly} onChange={this.handleChange}></input>
        <h3>Break Time:</h3>
        <input className="form-control medium-input" name="breakTime" ref="breakTime" value={this.state.breakTime} onChange={this.handleChange}></input>
        <h3>Break After:</h3>
        <input className="form-control medium-input" name="breakAfter" ref="breakAfter" value={this.state.breakAfter} onChange={this.handleChange}></input>
        <h3>Pension Reduction %:</h3>
        <input className="form-control medium-input" name="pension" ref="pension" value={this.state.pension} onChange={this.handleChange}></input>
        <h3>Drives:</h3>
        <input className="form-control medium-input" name="drives" ref="drives" value={this.state.drives} onChange={this.handleChange}></input>
        <h3>Others:</h3>
        <input className="form-control medium-input" ref="others" value={this.state.others} onChange={this.handleChange}></input>
        <button onClick={() => this.setState({ editing: false })} className="btn btn-primary regular-button"><i className="fa fa-times" aria-hidden="true"></i> Cancel</button>
        <button onClick={this.saveSettings} className="btn btn-success regular-button"><i className="fa fa-floppy-o" aria-hidden="true"></i> Save</button>
      </div>
    );
  }
  renderRegular() {
    const { hourly, breakTime, breakAfter, pension, drives, others } = this.props.settingsObject;
    return(
      <div>
        <button className="btn btn-info regular-button" onClick={() => this.setState({ editing: true })}><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
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
      <div className="container container-fluid">
        <h1>Settings</h1>
        {this.state.loading ? <MDSpinner className="spinner" size={100} /> : <span />}

        {this.state.editing ? this.renderEdit() : this.renderRegular()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    settingsObject: state.settingsObject
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveSettings, fetchSettings }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
// export default connect(mapStateToProps, { saveSettings, fetchSettings })(HoursList);
