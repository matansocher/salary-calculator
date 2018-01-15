import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { calculateHours, mapOnDays, getBruto, getNeto, getTax } from '../CommonFunctions';
import { fetchDays } from '../actions';
import MDSpinner from 'react-md-spinner';
import MainPageObject from './MainPageObject';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],
      settingsObject: {},
      bruto: 0,
      neto: 0,
      tax: 0,
      numberOfDays: 0,
      numberOfHours: 0,
      numberOfHours100: 0,
      numberOfHours125: 0,
      numberOfHours150: 0,
      numberOfHoursNeto: 0,
      loading: true
    };
  }

  componentDidMount() {
    const { days, settingsObject } = this.state;
    if(_.isEmpty(days) || _.isEmpty(settingsObject)) {
      const { year, month } = this.props.time;
      this.props.fetchDays(year, month);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: true });
    if ((this.props.time.year !== nextProps.time.year) ||
      (this.props.time.month !== nextProps.time.month)) { // check if date has changed
        this.props.fetchDays(nextProps.time.year, nextProps.time.month);
    }
    if (this.props.days !== nextProps.days) {
      const days = nextProps.days;
      const settingsObject = days[days.length - 1];
      this.setState({ days, settingsObject }, () => {
        this.mapOnDays();
        // this.arrangePage();
      });
    }
  }

  arrangePage() {
    const days = this.state.days;
    if(days.length  === 0) { // no days array yet from server
      return;
    }

    const arrayOfTotalHours = mapOnDays(days);// [numberOfDays, numberOfHours, numberOfHoursNeto, numberOfHours100, numberOfHours125, numberOfHours150]
    const bruto = getBruto([arrayOfTotalHours[1], arrayOfTotalHours[3], arrayOfTotalHours[4], arrayOfTotalHours[5]], this.state.settingsObject);
    const tax = getTax(bruto);
    const neto = getNeto(bruto, tax, this.state.settingsObject);
    this.setState({
      bruto,
      neto,
      tax,
      numberOfDays: arrayOfTotalHours[0],
      numberOfHours: arrayOfTotalHours[1],
      numberOfHours100: arrayOfTotalHours[3],
      numberOfHours125: arrayOfTotalHours[4],
      numberOfHours150: arrayOfTotalHours[5],
      numberOfHoursNeto: arrayOfTotalHours[2],
      loading: false
    });
  }
  // ****************************** remove
  mapOnDays() {
    const days = this.state.days;
    if(days.length  === 0) { // no days array yet from server
      return;
    }
    let numberOfDays = 0, numberOfHours = 0, numberOfHoursNeto = 0;
    let numberOfHours100 = 0, numberOfHours125 = 0, numberOfHours150 = 0;
    days.map(day => {
      if (day.day !== 0) {
        // const arrayOfHours = calculateHours(day); // *************************
        const { numberOfHours, numberOfHours100, numberOfHours125, numberOfHours150 } = day;
        numberOfWorkingDays += 1;
        // maybe we dont need the parseFloat
        numberOfHours += numberOfHours; // arrayOfHours[0]
        numberOfHours100 += numberOfHours100; // arrayOfHours[1]
        numberOfHours125 += numberOfHours125; // arrayOfHours[2]
        numberOfHours150 += numberOfHours150; // arrayOfHours[3]
        numberOfHoursNeto += numberOfHours100 + numberOfHours125 + numberOfHours150; // arrayOfHours[1] + // arrayOfHours[2] + // arrayOfHours[3]
      }
      return day;
    })
    this.setState({
      numberOfDays,
      numberOfHours,
      numberOfHours100,
      numberOfHours125,
      numberOfHours150,
      numberOfHoursNeto
    }, () => {
      this.getBruto();
    });
  }
  // ****************************** remove
  getBruto() {
    const { numberOfDays, numberOfHours100, numberOfHours125, numberOfHours150 } = this.state;
    let { hourly, drives, others } = this.state.settingsObject;
    const wage100 = numberOfHours100 * hourly;
    const wage125 = numberOfHours125 * hourly * 1.25;
    const wage150 = numberOfHours150 * hourly * 1.5;
    drives = numberOfDays * drives;
    const bruto = wage100 + wage125 + wage150 + drives + others;
    this.getNeto(bruto);
  }
  // ****************************** remove
  getNeto(bruto) {
    const steps = [5280, 9010, 14000, 20000, 41830];
    const stepsPer = [0.1, 0.14, 0.23, 0.30, 0.33, 0.45];
    let tax = 0, flag = 0;

    if (bruto > steps[0]) {
      tax += steps[0]*stepsPer[0];
      flag = flag + 1;
    }
    if (bruto > steps[1]) {
      tax += (steps[1]-steps[0])*stepsPer[1];
      flag = flag + 1;
    }
    if (bruto > steps[2]) {
      tax += (steps[2]-steps[1])*stepsPer[2];
      flag = flag + 1;
    }
    if (bruto > steps[3]) {
      tax += (steps[3]-steps[2])*stepsPer[3];
      flag = flag + 1;
    }
    if (bruto > steps[4]) {
      tax += (steps[4]-steps[3])*stepsPer[4];
      flag = flag + 1;
    }
    if (flag !== 0) {
      tax += (bruto - steps[flag-1]) * stepsPer[flag];
    }

    const { pension } = this.state.settingsObject;
    const pensionReduction = bruto * pension / 100;

    const neto = bruto - pensionReduction - tax;
    this.setState({ bruto, neto, tax, loading: false });
  }

  renderObjects() {
    const days = this.state.days;
    // if(days.length === 0) { // no days on this month
    //   return (<div className="container container-fluid"><h1>No Working Days On This Month!</h1></div>);
    if(days.length === 1) { // no days on this month
      return (<div className="container container-fluid"><h1>No Working Days On This Month!</h1></div>);
    } else { // there is data to show
      return (
        <div>
          <MainPageObject icon="fa fa-money" header="Bruto" value={this.state.bruto} />
          <MainPageObject icon="fa fa-money" header="Neto" value={this.state.neto} />
          <MainPageObject icon="fa fa-money" header="Tax" value={this.state.tax} />
          <MainPageObject icon="fa fa-money" header="Number Of Working Days" value={this.state.numberOfDays} />
          <MainPageObject icon="fa fa-money" header="Hours Bruto" value={this.state.numberOfHours} />
          <MainPageObject icon="fa fa-money" header="Hours Neto" value={this.state.numberOfHoursNeto} />
          <MainPageObject icon="fa fa-money" header="BreaksTime" value={this.state.numberOfHours - this.state.numberOfHoursNeto} />
          <MainPageObject icon="fa fa-money" header="100% Hours" value={this.state.numberOfHours100} />
          <MainPageObject icon="fa fa-money" header="125% Hours" value={this.state.numberOfHours125} />
          <MainPageObject icon="fa fa-money" header="150% Hours" value={this.state.numberOfHours150} />
        </div>
      )
    }
  }

  render() {
    return(
      <div className="container container-fluid blue-font">
        <h1>Main Page</h1>
        {this.state.loading ? <MDSpinner className="spinner" size={100} /> : <span />}
        {this.renderObjects()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    time: state.time,
    days: state.days
  };
}

export default connect(mapStateToProps, { fetchDays })(MainPage);
