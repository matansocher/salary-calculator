import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchDays } from '../actions';
import MDSpinner from 'react-md-spinner';
import MainPageObject from './MainPageObject';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],
      settingsObject: {},
      year: new Date().getFullYear(),
      month: (new Date().getMonth() + 1),
      bruto: 0,
      neto: 0,
      tax: 0,
      numberOfHours: 0,
      numberOfHours100: 0,
      numberOfHours125: 0,
      numberOfHours150: 0,
      numberOfHoursNeto: 0,
      loading: true
    };
  }

  componentDidMount() {
    const { year, month } = this.props.time;
    console.log('componentDidMount');
    this.props.fetchDays(year, month);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    console.log('componentWillReceiveProps');
    if (nextProps.time) {
      console.log('there is time');
      console.log(nextProps.time);
      this.setState({ year: nextProps.time.year, month: nextProps.time.month })
    }
    if (nextProps.days) {
      console.log('there are days');
      console.log(nextProps.days);
      this.setState({ days: nextProps.days }, () => {
        console.log(this.state.days);
        const days = this.state.days;
        const settingsObject = days[days.length - 1];
        this.setState({ settingsObject, loading: false }, () => {
          console.log(this.state.settingsObject);
          this.mapOnDays();
        });
      });
    }

  }

  mapOnDays() {
    const days = this.state.days;
    if(days.length  === 0) { // no days array yet from server
      console.log('did not enter mapOnDays');
      return;
    }
    console.log('mapOnDays in main page');
    console.log(days);
    let numberOfHours = 0, numberOfHours100 = 0, numberOfHours125 = 0, numberOfHours150 = 0, numberOfHoursNeto = 0;
    days.map(day => {
      if (day.day !== 0) {
        numberOfHours += parseFloat(day.numberOfHours);
        numberOfHours100 += parseFloat(day.numberOfHours100);
        numberOfHours125 += parseFloat(day.numberOfHours125);
        numberOfHours150 += parseFloat(day.numberOfHours150);
        numberOfHoursNeto += parseFloat(day.numberOfHours100) + parseFloat(day.numberOfHours125) + parseFloat(day.numberOfHours150);
      }
      return day;
    })
    this.setState({ numberOfHours, numberOfHours100, numberOfHours125, numberOfHours150, numberOfHoursNeto }, () => {
      this.getBruto();
    });
  }

  getBruto() {
    const { numberOfHours100, numberOfHours125, numberOfHours150 } = this.state;
    const days = this.state.days;
    const settingsObject = this.state.settingsObject;
    const wage100 = numberOfHours100 * (settingsObject.hourly);
    const wage125 = numberOfHours125 * (settingsObject.hourly * 1.25);
    const wage150 = numberOfHours150 * (settingsObject.hourly * 1.5);
    const drives = (days.length - 1) * (settingsObject.drives);
    const others = settingsObject.others;
    const bruto = wage100 + wage125 + wage150 + drives + others;
    this.setState({ bruto }, () => {
      this.getNeto();
    });
  }

  getNeto() {
    const bruto = this.state.bruto;
    const settingsObject = this.state.settingsObject;
    const pensionReduction = bruto * settingsObject.pension / 100;

    const step1 = 5280, step2 = 9010, step3 = 14000, step4 = 20000, step5 = 41830;
    const step1per = 0.1, step2per = 0.14, step3per = 0.23, step4per = 0.30, step5per = 0.33, step6per = 0.45;
    let tax = 0;

    if (bruto <= step1) {
      tax += bruto*step1per;
    } if (bruto > step1 && bruto <= step2) {
      tax += (bruto-step1)*step2per;
    } if (bruto > step2 && bruto <= step3) {
      tax += (bruto-step2)*step3per;
    } if (bruto > step3 && bruto <= step4) {
      tax += (bruto-step3)*step4per;
    } if (bruto > step4 && bruto <= step5) {
      tax += (bruto-step4)*step5per;
    } if (bruto > step5) {
      tax += (bruto-step5)*step6per;
    }

    const neto = bruto - pensionReduction - tax;
    this.setState({ neto, tax }, () => {
      this.setState({ loading: false });
    });
  }

  renderObjects() {
    // if it is an empty
    const days = this.state.days;
    if(days.length === 0) { // no data from server yet
      return (<span />);
    } else if(days.length === 1) { // no days on this month
      return (<div className="container container-fluid"><h1>No Working Days On This Month!</h1></div>);
    } else { // there is data to show
      return (
        <div>
          <MainPageObject icon="fa fa-money" header="Bruto" value={this.state.bruto} />
          <MainPageObject icon="fa fa-money" header="Neto" value={this.state.neto} />
          <MainPageObject icon="fa fa-money" header="Tax" value={this.state.tax} />
          <MainPageObject icon="fa fa-money" header="Number Of Working Days" value={this.state.days.length - 1} />
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
      <div className="container container-fluid">
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDays }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
// export default connect(mapStateToProps, { fetchDays })(HoursList);
