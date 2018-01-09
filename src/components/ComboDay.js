import React, { Component } from 'react';

export default class ComboDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: getDate(),
      month: this.props.month
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const value = event.target.value;
    this.setState({ day: value }, () => {
      this.props.handleChange(value, 'day');
    });
  }
  populateOptions() {
    const numOfDayInMonth = getNumberOfDayInMonth(this.state.month);
    const array = new Array(numOfDayInMonth);
    array.map((val, index) => {
      return (<option value={index}>{index}</option>);
    })
  }
  getNumberOfDayInMonth(month) {
    if (month === 2)
      return 28;
    else if (month === 4 || month === 6 || month === 9 || month === 11)
      return 30;
    else (month === 2)
      return 31;
  }

  render() {
    return (
      <div className="form-group col-sm-6">
        <select className="form-control" onChange={this.handleChange} value={this.state.currentMonth}>
        {populateOptions()}
        </select>
      </div>
    );
  }
}
