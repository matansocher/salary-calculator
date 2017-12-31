import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchDays, saveSettings } from '../actions';

// import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';

import fire from '../config';
import ComboYear from './ComboYear';
import ComboMonth from './ComboMonth';
import MDSpinner from 'react-md-spinner';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: [],
      // breakTime: 0,
      // breakAfter: 0,
      // pension: 0,
      // drives: 0,
      // others: 0,
      editing: false,
      loading: false
    };
  }
  componentDidMount() {
    const { year, month } = this.props;
    this.props.fetchSettings(year, month);
    // this.fetchSettings();
  }
  fetchSettings() {
    const { year, month } = this.props;
    // let settings_ref = fire.database().ref(`days/${year}/${month}/settings`);
    this.setState({ loading: true });
    // // if no settings object exists - create empty one
    // fire.database().ref(`days/${year}/${month}`).once('value', snap => {
    //   if (!snap.hasChild('settings')) {
    //     settings_ref.set({
    //       day: 0,
    //       month: month,
    //       year: year,
    //       hourly: 0,
    //       breakTime: 0,
    //       breakAfter: 0,
    //       pension: 0,
    //       drives: 0,
    //       others: 0
    //     });
    //   }
    // });
    //
    // settings_ref.on('value', snap => {
    //   let settingsObject = snap.val();
    //   const { hourly, breakTime, breakAfter, pension, drives, others } = settingsObject;
    //   this.setState({
    //     hourly: (hourly ? 0 :hourly),
    //     breakTime: (breakTime ? 0 :breakTime),
    //     breakAfter: (breakAfter ? 0 :breakAfter),
    //     pension: (pension ? 0 :pension),
    //     drives: (drives ? 0 :drives),
    //     others: (others ? 0 :others)
    //   });
      setTimeout(() => {
        this.setState({ loading: false });
      }, 1000);
    });
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
      // fire.database().ref(`days/${year}/${month}/settings`).set({
      //   day: 0,
      //   month: month,
      //   year: year,
      //   hourly: hourly.value,
      //   breakTime: breakTime.value,
      //   breakAfter: breakAfter.value,
      //   pension: pension.value,
      //   drives: drives.value,
      //   others: others.value
      // });
    });
    setTimeout(() => {
      this.setState({ loading: false });
      // this.props.history.push('/');
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

        {this.state.loading ? <MDSpinner className="spinner" size={100} /> : <span />}
        <h1>Settings</h1>

        <ComboYear changeYear={this.changeYear.bind(this)} />
        <ComboMonth changeMonth={this.changeMonth.bind(this)} />

        {this.state.editing ? this.renderEdit() : this.renderRegular()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    settingsObject: state.settingsObject,
    year: state.year,
    month: state.month
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveSettings, fetchSettings }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
// export default connect(mapStateToProps, { saveSettings, fetchSettings })(HoursList);
