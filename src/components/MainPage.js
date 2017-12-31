import React, { Component } from 'react';
import { connect } from 'react-redux';
import bindActionCreators from 'redux';
import { fetchDays, fetchSettings } from '../actions';
import MDSpinner from 'react-md-spinner';
import fire from '../config';
import MainPageObject from './MainPageObject';
import ComboYear from './ComboYear';
import ComboMonth from './ComboMonth';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bruto: 0,
      neto: 0,
      tax: 0,
      hourly: 0,
      numberOfHours: 0,
      numberOfHours100: 0,
      numberOfHours125: 0,
      numberOfHours150: 0,
      numberOfHoursNeto: 0,
      loading: false
    };
  }
  componentDidMount() {
    // this.fetchDays();
    const { year, month } = this.props;
    this.props.fetchDays(year, month);
  }
  // fetchDays() {
  //   const { currentYear, currentMonth } = this.state;
  //   const days_ref = fire.database().ref(`days/${currentYear}/${currentMonth}`);
  //   this.setState({ loading: true }, () => {
  //     days_ref.on('value', snap => {
  //       let daysArray = snap.val();
  //       const arr = Object.keys(daysArray).map(function (key) { return daysArray[key]; });
  //       console.log(arr);
  //       this.setState({ days: arr }, () => {
  //         setTimeout(() => {
  //           this.mapOnDays();
  //         }, 1000);
  //       });
  //     });
  //   });
  // }

  mapOnDays() {
    // const newDays = this.props.days;
    const newDays = this.props.days;
    let numberOfHours = 0, numberOfHours100 = 0, numberOfHours125 = 0, numberOfHours150 = 0, numberOfHoursNeto = 0;
    newDays.map(day => {
      if (day.day !== 0) {
        numberOfHours += parseFloat(day.numberOfHours);
        numberOfHours100 += parseFloat(day.numberOfHours100);
        numberOfHours125 += parseFloat(day.numberOfHours125);
        numberOfHours150 += parseFloat(day.numberOfHours150);
        numberOfHoursNeto += parseFloat(day.numberOfHours100) + parseFloat(day.numberOfHours125) + parseFloat(day.numberOfHours150);
      }
      return day;
    })
    this.setState({numberOfHours, numberOfHours100, numberOfHours125, numberOfHours150, numberOfHoursNeto}, () => {
      this.getBruto();
      this.setState({ loading: false });
    })

  }
  getBruto() {
    const { numberOfHours100, numberOfHours125, numberOfHours150 } = this.state;
    // const days = this.props.days;
    const days = this.props.days;
    const settingsObject = this.props.settingsObject;
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
    const { days, bruto } = this.state;
    const pensionReduction = bruto * settingsObject.pension / 100;

    const step1 = 5280, step2 = 9010, step3 = 14000, step4 = 20000, step5 = 41830;
    const step1per = 0.1, step2per = 0.14, step3per = 0.23, step4per = 0.30, step5per = 0.33, step6per = 0.45;
    let tax = 0;

    if (bruto <= step1) {
      tax += bruto*step1per;
    } else if (bruto > step1 && bruto <= step2) {
      tax += (bruto-step1)*step2per;
    } else if (bruto > step2 && bruto <= step3) {
      tax += (bruto-step2)*step3per;
    } else if (bruto > step3 && bruto <= step4) {
      tax += (bruto-step3)*step4per;
    } else if (bruto > step4 && bruto <= step5) {
      tax += (bruto-step4)*step5per;
    } else if (bruto > step5) {
      tax += (bruto-step5)*step6per;
    }

    let neto = bruto - pensionReduction - tax;
    this.setState({neto, tax});
  }
  render() {
    return(
      <div className="container container-fluid">
        {this.state.loading ? <MDSpinner className="spinner" size={100} /> : <span />}
        <h1>Main Page</h1>

        <ComboYear changeYear={this.changeYear.bind(this)} />
        <ComboMonth changeMonth={this.changeMonth.bind(this)} />
        {this.props.days.length === 1 ?
          (<div className="container container-fluid"><h1>No Working Days On This Month!</h1></div>) :
          (<div>
            <MainPageObject icon="fa fa-money" header="Bruto" value={this.state.bruto} />
            <MainPageObject icon="fa fa-money" header="Neto" value={this.state.neto} />
            <MainPageObject icon="fa fa-money" header="Tax" value={this.state.tax} />
            <MainPageObject icon="fa fa-money" header="Number Of Working Days" value={this.props.days.length - 1} />
            <MainPageObject icon="fa fa-money" header="Hours Bruto" value={this.state.numberOfHours} />
            <MainPageObject icon="fa fa-money" header="Hours Neto" value={this.state.numberOfHoursNeto} />
            <MainPageObject icon="fa fa-money" header="BreaksTime" value={this.state.numberOfHours - this.state.numberOfHoursNeto} />
            <MainPageObject icon="fa fa-money" header="100% Hours" value={this.state.numberOfHours100} />
            <MainPageObject icon="fa fa-money" header="125% Hours" value={this.state.numberOfHours125} />
            <MainPageObject icon="fa fa-money" header="150% Hours" value={this.state.numberOfHours150} />
            </div>)
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    days: state.days,
    settingsObject: state.settingsObject,
    year: state.year,
    month: state.month
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDays, fetchSettings }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
// export default connect(mapStateToProps, { fetchDays, fetchSettings })(HoursList);
