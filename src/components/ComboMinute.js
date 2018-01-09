import React, { Component } from 'react';

export default class ComboMinute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minute: getMinutes()
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const value = event.target.value;
    this.setState({ minute: value }, () => {
      this.props.handleChange(value, 'minute');
    });
  }
  populateOptions() {
    const array = new Array(59);
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
