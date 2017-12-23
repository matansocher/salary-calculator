import React, { Component } from 'react';
import fire from '../config';
import MainPageObject from './MainPageObject';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],
      bruto: 0,
      net0: 0,
      hourly: 0,
      numberOfHours: 0,
      numberOfHours100: 0,
      numberOfHours125: 0,
      numberOfHours150: 0,
      numberOfHoursNeto: 0,
      currentMonth: (new Date().getMonth() + 1),
      currentYear: new Date().getFullYear()
    };
  }
  componentDidMount() {
    const { currentYear, currentMonth } = this.state;
    const days_ref = fire.database().ref(`days/${currentYear}/${currentMonth}`);
    let daysArray = [];
    days_ref.on('value', snap => {
      daysArray = snap.val();
      const arr = Object.keys(daysArray).map(function (key) { return daysArray[key]; });
      this.setState({ days: arr });
    });
    this.mapOnDays();
  }
  changeMonth(event) {
    this.setState({ currentMonth: event.target.value });
  }
  changeYear(event) {
    this.setState({ currentYear: event.target.value });
  }
  mapOnDays() {
    const newDays = this.state.days;
    let numberOfHours = 0;
    let numberOfHours100 = 0;
    let numberOfHours125 = 0;
    let numberOfHours150 = 0;
    let numberOfHoursNeto = 0;
    newDays.map(day => {
      if (day.day !== 0) {
        numberOfHours += day.numberOfHours;
        numberOfHours100 += day.numberOfHours100;
        numberOfHours125 += day.numberOfHours125;
        numberOfHours150 += day.numberOfHours150;
        numberOfHoursNeto += day.numberOfHours100 + day.numberOfHours125 + day.numberOfHours150;
      }
    })
    this.setState({numberOfHours, numberOfHours100, numberOfHours125, numberOfHours150, numberOfHoursNeto})
    console.log(this.state);
    this.getBruto();
    this.getNeto();
  }
  getBruto() {
    const newDays = this.state.days;
    console.log(newDays[newDays.length-1]);
    // console.log(newDays[newDays.length-1].hourly);
    let wage100 = 0;
    let wage125 = 0;
    let wage150 = 0;
    newDays.map(day => {
      if (day.day !== 0) {
        wage100 = (wage100 + day.numberOfHours100) * (newDays[newDays.length - 1].hourly);
        wage125 = (wage125 + day.numberOfHours125) * (newDays[newDays.length - 1].hourly * 1.25);
        wage150 = (wage150 + day.numberOfHours150) * (newDays[newDays.length - 1].hourly * 1.5);
      }
    })
    const bruto = wage100 + wage125 + wage150;
    this.setState({ bruto });
  }
  getNeto() {
    // this.state.bruto
    const neto = 0;
    this.setState({neto});
  }
  render() {
    return(
      <div className="container container-fluid">
        <h1>Main Page</h1>

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
        <MainPageObject icon="fa fa-money" header="Bruto" value={this.state.bruto} />
        <MainPageObject icon="fa fa-money" header="Neto" value={this.state.neto} />
        <MainPageObject icon="fa fa-money" header="Number Of Working Days" value={this.state.days.length - 1} />
        <MainPageObject icon="fa fa-money" header="NumOfHoursBruto" value={this.state.numberOfHours} />
        <MainPageObject icon="fa fa-money" header="NumOfHoursNeto" value={this.state.numberOfHoursNeto} />
        <MainPageObject icon="fa fa-money" header="BreaksTime" value={this.state.numberOfHours - this.state.numberOfHoursNeto} />
        <MainPageObject icon="fa fa-money" header="NumOfHours100" value={this.state.numberOfHours100} />
        <MainPageObject icon="fa fa-money" header="NumOfHours125" value={this.state.numberOfHours125} />
        <MainPageObject icon="fa fa-money" header="NumOfHours150" value={this.state.numberOfHours150} />
      </div>
    );
  }
}
