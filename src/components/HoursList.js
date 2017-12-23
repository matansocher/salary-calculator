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
      currentMonth: (new Date().getMonth() + 1),
      currentYear: new Date().getFullYear()
    }
    //this.refreshData.bind(this);
    // console.log(this.state.currentYear);
    // console.log(this.state.currentMonth);
  }
  componentDidMount() {
    this.refreshData.bind(this);
  }
  refreshData() {
    const { currentYear, currentMonth } = this.state;
    console.log(currentYear);
    console.log(currentMonth);
    const days_ref = fire.database().ref(`days/${currentYear}/${currentMonth}`);
    let daysArray = [];
    days_ref.on('value', snap => {
      daysArray = snap.val();
      const arr = Object.keys(daysArray).map(function (key) { return daysArray[key]; });
      console.log(arr);
      this.setState({ days: arr });
    }); // sort the data by date
  }
  addDay(day) {

    const EnterAsHours = ((this.refs.enterhour.value * 60) + this.refs.enterminute.value) / 60;
    const ExitAsHours = ((this.refs.exithour.value * 60) - this.refs.exitminute.value) / 60;
    const numberOfHours = ExitAsHours - EnterAsHours;
    // const numberOfHours100 = (numberOfHours > 9.25 ? 8.5 : numberOfHours);
    // const numberOfHours125 = (numberOfHours > 11.25 ? 2 : numberOfHours - 8.5);
    // const numberOfHours150 = numberOfHours - numberOfHours125;

    const numberOfHours100 = (numberOfHours > 8 ? 7.25 : numberOfHours);
    const numberOfHours125 = (numberOfHours > 10 ? 9.25 : numberOfHours - 8.5);
    const numberOfHours150 = numberOfHours - numberOfHours125;

    fire.database().ref(`days/${day.year}/${day.month}/${day.day}`).set({
      day: day.day,
      month: day.month,
      year: day.year,
      enterhour: this.refs.enterhour.value,
      enterminute: this.refs.enterminute.value,
      exithour: this.refs.exithour.value,
      exitminute: this.refs.exitminute.value,
      numberOfHours: numberOfHours,
      numberOfHours100: numberOfHours100,
      numberOfHours125: numberOfHours125,
      numberOfHours150: numberOfHours150
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
  changeMonth(event) {
    this.setState({ currentMonth: event.target.value });
    // console.log(this.state.currentYear);
    // console.log(this.state.currentMonth);
    this.refreshData();

  }
  changeYear(event) {
    this.setState({ currentYear: event.target.value });
    this.refreshData();
    // console.log(this.state.currentYear);
    // console.log(this.state.currentMonth);
  }
  renderAdd() {
    if(this.state.add) {
      return (
        <li className="col-sm-12 col-md-12 list-group-item">
          <h3>Day On Month:</h3>
          <input className="form-control hour-input hours-input" ref="dayOfMonth" defaultValue=''></input><br />
          <h3>Enter Hour:</h3>
          <input className="form-control hour-input hours-input" ref="enterhour" defaultValue=''></input>:
          <input className="form-control hour-input hours-input" ref="enterminute" defaultValue=''></input><br />
          <h3>Exit Hour:</h3>
          <input className="form-control hour-input hours-input" ref="exithour" defaultValue=''></input>:
          <input className="form-control hour-input hours-input" ref="exitminute" defaultValue=''></input><br />
          <button onClick={this.addDay.bind(this)} className="btn btn-success regular-button hours-input"><i className="fa fa-floppy-o" aria-hidden="true"></i> Save</button>
          <button onClick={this.handleCancelAddClick} className="btn btn-primary regular-button hours-input"><i className="fa fa-times" aria-hidden="true"></i> Cancel</button>
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
      <h1>{this.state.currentYear}</h1>
      <h1>{this.state.currentMonth}</h1>
        <div className="form-group col-sm-6">
          <select className="form-control" onChange={this.changeYear.bind(this)} value={this.state.currentYear}>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
          </select>
        </div>

        <div className="form-group col-sm-6">
          <select className="form-control" onChange={this.changeMonth.bind(this)} value={this.state.currentMonth}>
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
