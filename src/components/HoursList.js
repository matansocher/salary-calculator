import React, { Component } from 'react';
import fire from '../config';
import Day from './Day';

export default class HoursList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: props.header,
      add: false,
      days: [],
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear()
    }
    console.log(this.state.currentYear);
    console.log(this.state.currentMonth);
  }
  componentDidMount() {
    this.refreshData.bind(this);
  }
  refreshData() {
    console.log("inside refreshdata");
    const days_ref = fire.database().ref(`days/${this.state.currentYear}/${this.state.currentMonth}`);
    let daysArray = [];
    days_ref.on('value', snap => {
      daysArray = snap.val();
      const arr = Object.keys(daysArray).map(function (key) { return daysArray[key]; });
      this.setState({ days: arr });
    }); // sort the data by date
  }
  addDay(day) {
    fire.database().ref(`days/${day.year}/${day.month}/${day.day}`).set({
      day: day.day,
      month: day.month,
      year: day.year,
      enterhour: this.refs.enterhour.value,
      enterminute: this.refs.enterminute.value,
      exithour: this.refs.exithour.value,
      exitminute: this.refs.exitminute.value
    });
    this.setState({ add: false });
  }
  editDay(day) {
    fire.database().ref(`days/${day.year}/${day.month}/${day.day}`).set({
      day: day.day,
      month: day.month,
      year: day.year,
      enterhour: day.enterhour,
      enterminute: day.enterminute,
      exithour: day.exithour,
      exitminute: day.exitminute
    });
  }
  deleteDay(day) {
    fire.database().ref(`days/${day.year}/${day.month}/${day.day}`).remove();
  }
  handleCancelAddClick = () => {
    this.setState({ add: false })
  }
  handleAddClick = () => {
    this.setState({ add: true })
  }
  changeMonth(event){
    this.setState({ currentMonth: event.target.value });
    console.log("outside refreshdata");
    this.refreshData();
  }
  changeYear(event){
    this.setState({ currentYear: event.target.value });
    this.refreshData();
  }
  renderAdd() {
    if(this.state.add) {
      return (
        <li className="col-sm-12 col-md-12 list-group-item">
          <h3>Day On Month (1-31):</h3>
          <input className="form-control hour-input" ref="dayOfMonth" defaultValue=''></input>
          <h3>Enter Hour:</h3>
          <input className="form-control hour-input" ref="enterhour" defaultValue=''></input>:
          <input className="form-control hour-input" ref="enterminute" defaultValue=''></input>
          <h3>Exit Hour:</h3>
          <input className="form-control hour-input" ref="exithour" defaultValue=''></input>:
          <input className="form-control hour-input" ref="exitminute" defaultValue=''></input>
          <button onClick={this.addDay.bind(this)} className="btn btn-success regular-button"><i className="fa fa-floppy-o" aria-hidden="true"></i> Save</button>
          <button onClick={this.handleCancelAddClick} className="btn btn-primary regular-button"><i className="fa fa-times" aria-hidden="true"></i> Cancel</button>
        </li>
      );
    } else {
      return(
        <li className="col-sm-12 col-md-12 list-group-item">
          <button className="btn btn-info add-button" onClick={this.handleAddClick}><i className="fa fa-plus" aria-hidden="true"></i> Add</button>
        </li>
      );
    }
  }
  render() {
    return(
      <div className="container container-fluid">
        <div className="form-group col-sm-6">
          <select className="form-control" onChange={this.changeYear.bind(this)}>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
          </select>
        </div>

        <div className="form-group col-sm-6">
          <select className="form-control" onChange={this.changeMonth.bind(this)}>
            <option value="1">January</option><option value="2">February</option>
            <option value="3">March</option><option value="4">April</option>
            <option value="5">May</option><option value="6">June</option>
            <option value="7">July</option><option value="8">August</option>
            <option value="9">September</option><option value="10">October</option>
            <option value="11">November</option><option value="12">December</option>
          </select>
        </div>

        <h1>{this.state.header}</h1>
        {this.renderAdd()}
        {this.state.days.map(day => {
          if (day.day !== 0)
            return <Day
              key={day.day}
              day={day}
              editDay={this.editDay.bind(this)}
              deleteDay={this.deleteDay.bind(this)} />
          })
        }
      </div>
    );
  }
}
