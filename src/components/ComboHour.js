import React, { Component } from 'react';

export default class ComboHour extends Component {
  constructor(props) {
    super(props);
    const dateString = new Date();
    this.state = {
      hour: dateString.getHours()
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const value = event.target.value;
    this.setState({ hour: value }, () => {
      this.props.handleChange(value, this.props.name);
    });
  }
  populateOptions() {
    const array = new Array(24);
    for (var i = 0; i < array.length; i++) {
      array[i] = i;
    }
    return (
      array.map((i) => {
        return <option key={i} value={i}>{i}</option>;
      })
    )
  }
  render() {
    return (
      <div className="form-group hour-input hours-input col-sm-6">
        <select className="form-control" onChange={this.handleChange} value={this.state.hour}>
          {this.populateOptions()}
        </select>
      </div>
    );
  }
}
