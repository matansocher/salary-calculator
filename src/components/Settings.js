import React, { Component } from 'react';

// import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';

import fire from '../config';
import ComboYear from './ComboYear';
import ComboMonth from './ComboMonth';
import MDSpinner from 'react-md-spinner';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {},
      currentMonth: (new Date().getMonth() + 1),
      currentYear: new Date().getFullYear(),
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
  componentDidMount() {
    this.fetchMonthSettings();
  }
  fetchMonthSettings() {
    const { currentYear, currentMonth } = this.state;
    let settings_ref = fire.database().ref(`days/${currentYear}/${currentMonth}/settings`);
    this.setState({ loading: true });
    // if no settings object exists - create empty one
    fire.database().ref(`days/${currentYear}/${currentMonth}`).once('value', snap => {
      if (!snap.hasChild('settings')) {
        settings_ref.set({
          day: 0,
          month: currentMonth,
          year: currentYear,
          hourly: 0,
          breakTime: 0,
          breakAfter: 0,
          pension: 0,
          drives: 0,
          others: 0
        });
      }
    });

    settings_ref.on('value', snap => {
      let settingsObject = snap.val();
      const { hourly, breakTime, breakAfter, pension, drives, others } = settingsObject;
      this.setState({
        hourly: (hourly ? 0 :hourly),
        breakTime: (breakTime ? 0 :breakTime),
        breakAfter: (breakAfter ? 0 :breakAfter),
        pension: (pension ? 0 :pension),
        drives: (drives ? 0 :drives),
        others: (others ? 0 :others)
      });
      setTimeout(() => {
        this.setState({ loading: false });
      }, 1000);
    });
  }
  saveSettings() {
    const { currentYear, currentMonth } = this.state;
    const { hourly, breakTime, breakAfter, pension, drives, others } = this.refs;
    this.setState({ loading: true }, () => {
      console.log(`days/${currentYear}/${currentMonth}/settings`);
      fire.database().ref(`days/${currentYear}/${currentMonth}/settings`).set({
        day: 0,
        month: currentMonth.value,
        year: currentYear.value,
        hourly: hourly.value,
        breakTime: breakTime.value,
        breakAfter: breakAfter.value,
        pension: pension.value,
        drives: drives.value,
        others: others.value
      });
    });
    setTimeout(() => {
      this.setState({ loading: false });
      // this.props.history.push('/');
    }, 1000);
    // }.bind(this), 1000);
  }
  handleChange(e) {
    var change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }
  changeMonth(value) {
    this.setState({ currentMonth: value }, () => {
      this.fetchMonthSettings();
    });
  }
  changeYear(value) {
    this.setState({ currentYear: value }, () => {
      this.fetchMonthSettings();
    });
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
        <h3>Hourly Wage: {this.state.hourly}</h3>
        <h3>Break Time: {this.state.breakTime}</h3>
        <h3>Break After: {this.state.breakAfter}</h3>
        <h3>Pension Reduction %: {this.state.pension}</h3>
        <h3>Drives: {this.state.drives}</h3>
        <h3>Others: {this.state.others}</h3>
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



// import { connect } from 'react-redux';
// import bindActionCreators from 'redux';
// import { saveSettings } from '../actions';
//
// function mapStateToProps(state) {
//   return {
//     days: state
//   };
// }
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ saveDay: saveDay }, dispatch);
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Settings);
