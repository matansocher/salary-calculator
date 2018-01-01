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
  }

  setCurrentState() {
    this.setState({
      hourly: this.props.settingsObject.hourly,
      breakTime: this.props.settingsObject.breakTime,
      breakAfter: this.props.settingsObject.breakAfter,
      pension: this.props.settingsObject.pension,
      drives: this.props.settingsObject.drives,
      others: this.props.settingsObject.others
    });
  }

  componentDidMount() {
    const { year, month } = this.props.route;
    this.setState({ loading: true }, () => {
      this.props.fetchSettings(year, month);
      // maybe need to enter setCurrentState into callback function
      this.setCurrentState();
    });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  saveSettings() {
    const { year, month } = this.props.route;
    // not sure if we can drop these refs states. now, the refs has no states
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
    setTimeout(() => {
      this.setState({ loading: false });
      // gesture to user that the changes were saved
    }, 1000);
  }
  handleChange(e) {
    var change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  renderEdit() {
    return(
      <div>
        <h3>Hourly Wage:</h3>
        <input className="form-control medium-input" name="hourly" ref="hourly" value={this.state.hourly} onChange={this.handleChange.bind(this)}></input>
        <h3>Break Time:</h3>
        <input className="form-control medium-input" name="breakTime" ref="breakTime" value={this.state.breakTime} onChange={this.handleChange.bind(this)}></input>
        <h3>Break After:</h3>
        <input className="form-control medium-input" name="breakAfter" ref="breakAfter" value={this.state.breakAfter} onChange={this.handleChange.bind(this)}></input>
        <h3>Pension Reduction %:</h3>
        <input className="form-control medium-input" name="pension" ref="pension" value={this.state.pension} onChange={this.handleChange.bind(this)}></input>
        <h3>Drives:</h3>
        <input className="form-control medium-input" name="drives" ref="drives" value={this.state.drives} onChange={this.handleChange.bind(this)}></input>
        <h3>Others:</h3>
        <input className="form-control medium-input" ref="others" value={this.state.others} onChange={this.handleChange.bind(this)}></input>
        <button onClick={() => this.setState({ editing: false })} className="btn btn-primary regular-button"><i className="fa fa-times" aria-hidden="true"></i> Cancel</button>
        <button onClick={this.saveSettings.bind(this)} className="btn btn-success regular-button"><i className="fa fa-floppy-o" aria-hidden="true"></i> Save</button>
      </div>
    );
  }
  renderRegular() {
    return(
      <div>
        <button className="btn btn-info regular-button" onClick={() => this.setState({ editing: true })}><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
        <h3>Hourly Wage: {this.props.settingsObject.hourly}</h3>
        <h3>Break Time: {this.props.settingsObject.breakTime}</h3>
        <h3>Break After: {this.props.settingsObject.breakAfter}</h3>
        <h3>Pension Reduction %: {this.props.settingsObject.pension}</h3>
        <h3>Drives: {this.props.settingsObject.drives}</h3>
        <h3>Others: {this.props.settingsObject.others}</h3>
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
