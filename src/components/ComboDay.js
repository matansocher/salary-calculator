import React, { Component } from 'react';

export default class ComboDay extends Component {
  constructor(props) {
    super(props);
    const dateString = new Date();
    this.state = {
      day: dateString.getDate(),
      month: this.props.month
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const value = event.target.value;
    this.setState({ day: value }, () => {
      this.props.handleChange(value, this.props.name);
    });
  }
  populateOptions() {
    const numOfDaysInMonth = this.getNumberOfDayInMonth(this.state.month);
    const array = new Array(numOfDaysInMonth);
    for (var i = 0; i < array.length; i++) {
      array[i] = i;
    }
    return (
      array.map((i) => {
        return <option key={i} value={i+1}>{i+1}</option>;
      })
    )
  }
  getNumberOfDayInMonth(month) {
    if (month === 2)
      return 28;
    else if (month === 4 || month === 6 || month === 9 || month === 11)
      return 30;
    else
      return 31;
  }

  render() {
    return (
      <div className="form-group hour-input hours-input col-sm-6">
        <select className="form-control" onChange={this.handleChange} value={this.state.day}>
          {this.populateOptions()}
        </select>
      </div>
    );
  }
}
