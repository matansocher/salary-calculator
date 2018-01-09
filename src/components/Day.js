import React, { Component } from 'react';

export default class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: props.day,
      settingsObject: props.settingsObject,
      enterhour: props.day.enterhour,
      enterminute: props.day.enterminute,
      exithour: props.day.exithour,
      exitminute: props.day.exitminute,
      editing: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveClick = this.saveClick.bind(this);
  }

  saveClick() {
    const { day, month, year } = this.state.day;
    const { enterhour, enterminute, exithour, exitminute } = this.state;
    const { breakAfter, breakTime } = this.state.settingsObject;

    this.props.editDay({
      day: day,
      year: year,
      month: month,
      enterhour: enterhour,
      enterminute: enterminute,
      exithour: exithour,
      exitminute: exitminute
    }, breakAfter, breakTime);
    this.setState({ editing: false });
  }

  handleChange(e) {
    var change = {};
    // let currentState = this.state[e.target.name];
    // remove the check when it is from a dropdown
    if (!isNaN(e.target.value)) {
      change[e.target.name] = e.target.value;
      this.setState(change);
    }
  }

  getDayOfWeek() {
    const { day, month, year } = this.state.day;
    const date = `${month}/${day}/${year}`;
    const dateString = new Date(date);
    const dayNumber = dateString.getDay();
    let dayString = '';
    switch(dayNumber) {
      case 0: dayString = "Sun"; break;
      case 1: dayString = "Mon"; break;
      case 2: dayString = "Tue"; break;
      case 3: dayString = "Wed"; break;
      case 4: dayString = "Thu"; break;
      case 5: dayString = "Fri"; break;
      case 6: dayString = "Sat"; break;
      default: dayString = "Sun"; break;
    }
    return dayString;
  }

  handleCancelClick = () => {
    this.setState({ editing: false })
  }

  handleEditClick = () => {
    this.setState({ editing: true });
  }

  handleDeleteClick = () => {
    this.props.deleteDay(this.props.day);
  }

  renderEdit() {
    return(
      <li className="col-sm-12 col-md-12 list-group-item">
        <input className="form-control hour-input hours-input" name="enterhour" ref="enterhour"
          value={this.state.enterhour} onChange={this.handleChange}>
        </input>:
        <input className="form-control hour-input hours-input" name="enterminute" ref="enterminute"
          value={this.state.enterminute} onChange={this.handleChange}>
        </input>-
        <input className="form-control hour-input hours-input" name="exithour" ref="exithour"
          value={this.state.exithour} onChange={this.handleChange}>
        </input>:
        <input className="form-control hour-input hours-input" name="exitminute" ref="exitminute"
          value={this.state.exitminute} onChange={this.handleChange}>
        </input><br />

        <button onClick={this.saveClick} className="btn btn-success regular-button">
          <i className="fa fa-floppy-o" aria-hidden="true"></i> Save
        </button>
        <button onClick={this.handleCancelClick} className="btn btn-primary regular-button">
          <i className="fa fa-times" aria-hidden="true"></i> Cancel
        </button>
      </li>
    );
  }

  renderRegular() {
    const { day, month, numberOfHours, numberOfHours100, numberOfHours125 ,numberOfHours150 } = this.state.day;
    let { enterhour, enterminute, exithour, exitminute } = this.state;
    const { hourly } = this.state.settingsObject;
    enterminute = '0' ? '00' : enterminute;
    exitminute = '0' ? '00' : exitminute;
    return(
      <li className="col-sm-12 col-md-12 list-group-item">
        <h3>{day}/{month}, {this.getDayOfWeek()}</h3>
        <p>{enterhour}:{enterminute} - {exithour}:{exitminute}</p>
        <p>{numberOfHours} Hours</p>
        <p>Wage: {(numberOfHours100 + numberOfHours125*1.25 + numberOfHours150*1.5)*hourly}</p>

        <button className="btn btn-warning regular-button" onClick={this.handleEditClick}>
          <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
        </button>
        <button className="btn btn-danger regular-button" onClick={this.handleDeleteClick}>
          <i className="fa fa-trash-o" aria-hidden="true"></i> Delete
        </button>
      </li>
    );
  }

  render() {
    return (
      this.state.editing ? this.renderEdit() : this.renderRegular()
    )
  }
}
