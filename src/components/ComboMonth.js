import React, { Component } from 'react';

export default class ComboMonth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: (new Date().getMonth() + 1)
    }
    // this.handleChange = this.handleChange.bind(this);
  }
  // handleChange(event) {
  //   const value = event.target.value;
  //   this.setState({ currentMonth: value }, () => {
  //     this.props.changeMonth(value);
  //   });
  // }
  handleChange = (event) => {
    const value = event.target.value;
    this.setState({ currentMonth: value }, () => {
      this.props.changeMonth(value);
    });
  }
  render() {
    return (
      <div className="form-group col-sm-6">
        <select className="form-control" onChange={this.handleChange} value={this.state.currentMonth}>
          <option value="1">January</option><option value="2">February</option>
          <option value="3">March</option><option value="4">April</option>
          <option value="5">May</option><option value="6">June</option>
          <option value="7">July</option><option value="8">August</option>
          <option value="9">September</option><option value="10">October</option>
          <option value="11">November</option><option value="12">December</option>
        </select>
      </div>
    );
  }
}
