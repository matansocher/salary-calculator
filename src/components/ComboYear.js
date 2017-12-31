import React, { Component } from 'react';

export default class ComboYear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: new Date().getFullYear()
    }
  }
  handleChange(event) {
    const value = event.target.value;
    this.setState({ currentYear: value }, () => {
      this.props.changeYear(value);
    });
  }
  render() {
    return (
      <div className="form-group col-sm-6">
        <select className="form-control" onChange={this.handleChange.bind(this)} value={this.state.currentYear}>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
        </select>
      </div>
    );
  }
}
