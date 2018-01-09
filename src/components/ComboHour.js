import React, { Component } from 'react';

export default class ComboHour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: getHours()
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const value = event.target.value;
    this.setState({ hour: value }, () => {
      this.props.handleChange(value, 'hour');
    });
  }
  populateOptions() {
    const array = new Array(23);
    array.map((val, index) => {
      return (<option value={index}>{index}</option>);
    })
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
