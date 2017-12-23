import React, { Component } from 'react';

export default class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: props.day.day,
      month: props.day.month,
      year: props.day.year,
      enterhour: props.day.enterhour,
      enterminute: props.day.enterminute,
      exithour: props.day.exithour,
      exitminute: props.day.exitminute,
      numberOfHours: props.day.numberOfHours,
      numberOfHours100: props.day.numberOfHours100,
      numberOfHours125: props.day.numberOfHours125,
      numberOfHours150: props.day.numberOfHours150,
      editing: false
    };
  }
  saveClick = () => {
  this.props.editDay({
    year: this.state.year,
    month: this.state.month,
    enterhour: this.state.enterhour,
    enterminute: this.state.enterminute,
    exithour: this.state.exithour,
    exitminute: this.state.exitminute
  });
  this.setState({ editing: false });
}

  handleDeleteClick = () => {
    this.props.deleteDay(this.props.day);
  }

  handleEditClick = () => {
    this.setState({ editing: true });
  }

  handleCancelEditClick = () => {
    this.setState({ editing: false });
  }

  handleChange(e) {
    var change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  renderEdit() {
    return(
      <li className="col-sm-12 col-md-12 list-group-item">
        <h3>Enter Hour:</h3>
        <input className="form-control hour-input hours-input" ref="enterhour" value={this.state.enterhour} onChange={this.handleChange.bind(this)}></input>:
        <input className="form-control hour-input hours-input" ref="enterminute" value={this.state.enterminute} onChange={this.handleChange.bind(this)}></input>
        <h3>Exit Hour:</h3>
        <input className="form-control hour-input hours-input" ref="exithour" value={this.state.exithour} onChange={this.handleChange.bind(this)}></input>:
        <input className="form-control hour-input hours-input" ref="exitminute" value={this.state.exitminute} onChange={this.handleChange.bind(this)}></input><br />
        <button onClick={this.saveClick} className="btn btn-success regular-button"><i className="fa fa-floppy-o" aria-hidden="true"></i> Save</button>
        <button onClick={this.handleCancelEditClick} className="btn btn-primary regular-button"><i className="fa fa-times" aria-hidden="true"></i> Cancel</button>
      </li>
    );
  }

  renderRegular() {
    return(
      <li className="col-sm-12 col-md-12 list-group-item">
        <h3>Day Of Work: {this.state.day}.{this.state.month}.{this.state.year}</h3>
        <p>Enter Hour: {this.state.enterhour}:{this.state.enterminute}</p>
        <p>Exit Hour: {this.state.exithour}:{this.state.exitminute}</p>
        <p>Total Hours: {this.state.numberOfHours}</p>
        <p>Wage: {this.state.numberOfHours100 + this.state.numberOfHours125*1.25 + this.state.numberOfHours150*1.5}</p>
        <button className="btn btn-warning regular-button" onClick={this.handleEditClick}><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
        <button className="btn btn-danger regular-button" onClick={this.handleDeleteClick}><i className="fa fa-trash-o" aria-hidden="true"></i> Delete</button>
      </li>
    );
  }
  render() {
    return (
      <div>
        {this.state.editing ? this.renderEdit() : this.renderRegular()}
      </div>
    )
  }
}
