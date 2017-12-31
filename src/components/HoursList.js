import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { fetchDays, addDay, editDay, deleteDay } from '../actions';
import MDSpinner from 'react-md-spinner';
import fire from '../config';
import Day from './Day';
import ComboYear from './ComboYear';
import ComboMonth from './ComboMonth';

class HoursList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add: false,
      // days: [],
      currentMonth: (new Date().getMonth() + 1),
      currentYear: new Date().getFullYear(),
      loading: false
    }
  }

  componentDidMount() {
    const { currentYear, currentMonth } = this.state;
    this.props.fetchDays(currentYear, currentMonth);
    // this.fetchDays();
  }

  fetchDays() {
    const { currentYear, currentMonth } = this.state;
    this.setState({ loading: true }, () => {
      const days_ref = fire.database().ref(`days/${currentYear}/${currentMonth}`);
      days_ref.on('value', snap => {
        let daysArray = snap.val();
        const arr = Object.keys(daysArray).map(function (key) { return daysArray[key]; });
        console.log(arr);
        this.setState({ days: arr }, () => {
          setTimeout(() => {
            this.setState({ loading: false });
          }, 1000);
        });
      });
    });
  }

  addDay() {
    const dayOfMonth = parseFloat(this.refs.dayOfMonth.value);
    const enterhour = parseFloat(this.refs.enterhour.value);
    const enterminute = parseFloat(this.refs.enterminute.value);
    const exithour = parseFloat(this.refs.exithour.value);
    const exitminute = parseFloat(this.refs.exitminute.value);

    const enterAsHours = (enterhour * 60) + enterminute;
    const exitAsHours = (exithour * 60) - exitminute;
    const numberOfHours = (exitAsHours - enterAsHours) / 60;

    const newDays = this.props.days;
    const breakAfter = newDays[newDays.length-1].breakAfter; // 8
    const breakTime = newDays[newDays.length-1].breakTime; // 45

    let numberOfHours100 = 0;
    let numberOfHours125 = 0;
    let numberOfHours150 = 0;

    if (numberOfHours < breakAfter) { // numberOfHours < 8
      numberOfHours100 = numberOfHours;
    }
    if (numberOfHours === breakAfter) { // numberOfHours = 8
      numberOfHours100 = breakAfter - (breakTime)/60;
    }
    if (numberOfHours > breakAfter && numberOfHours < (breakAfter + 2)) { // 8 <= numberOfHours < 10
      numberOfHours100 = breakAfter - (breakTime)/60;
      numberOfHours125 = 2 - (numberOfHours - numberOfHours100);
    }
    if (numberOfHours === (breakAfter + 2)) { // numberOfHours = 10
      numberOfHours100 = breakAfter - breakTime;
      numberOfHours125 = 2 - (breakTime)/60;
    }
    if (numberOfHours > (breakAfter + 2)) { // numberOfHours >= 10
      numberOfHours100 = breakAfter - (breakTime)/60;
      numberOfHours125 = 2;
      numberOfHours150 = numberOfHours - numberOfHours100 - numberOfHours125;
    }

    // if we use redux, first create the day object and theb pass to action creator addDay
    const { currentYear, currentMonth } = this.state;
    this.setState({ loading: true }, () => {
      fire.database().ref(`days/${currentYear}/${currentMonth}/${dayOfMonth}`).set({
        day: dayOfMonth,
        month: currentMonth,
        year: currentYear,
        enterhour: enterhour,
        enterminute: enterminute,
        exithour: exithour,
        exitminute: exitminute,
        numberOfHours: numberOfHours,
        numberOfHours100: numberOfHours100,
        numberOfHours125: numberOfHours125,
        numberOfHours150: numberOfHours150
      });
      setTimeout(() => {
        this.setState({ loading: false, add: false });
      }, 1000);
    });
  }

  editDay(day) {
    this.setState({ loading: true }, () => {
      fire.database().ref(`days/${day.year}/${day.month}/${day.day}`).set({day});
    });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  deleteDay(day) {
    this.setState({ loading: true }, () => {
      fire.database().ref(`days/${day.year}/${day.month}/${day.day}`).remove();
    });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  changeMonth(value) {
    this.setState({ currentMonth: value }, () => {
      this.props.fetchDays(this.state.currentYear, this.state.currentMonth);
    });
  }

  changeYear(value) {
    this.setState({ currentYear: value }, () => {
      this.props.fetchDays(this.state.currentYear, this.state.currentMonth);
    });
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
          <button onClick={() => this.setState({ add: false })} className="btn btn-primary regular-button hours-input"><i className="fa fa-times" aria-hidden="true"></i> Cancel</button>
        </li>
      );
    } else {
      return(
        <li className="col-sm-12 col-md-12 list-group-item">
          <button className="btn btn-info add-button regular-button" onClick={() => this.setState({ add: true })}><i className="fa fa-plus" aria-hidden="true"></i> Add</button>
        </li>
      );
    }
  }

  renderList() {
    const newDays = this.props.days;

    if (newDays.length === 1) {
      return (
        <div className="container container-fluid">
          <h1>No Working Days On This Month!</h1>
        </div>
      )
    }

    return (
      newDays.map(day => {
        const key = `${day.year}${day.month}${day.day}`;
        if (day.day !== 0)
          return <Day key={key} day={day} hourly={newDays[newDays.length - 1].hourly}
                  editDay={this.editDay.bind(this)} deleteDay={this.deleteDay.bind(this)} />
      })
    )
  }

  render() {
    return(
      <div className="container container-fluid">
        {this.state.loading ? <MDSpinner className="spinner" size={100} /> : <span />}
        <h1>Hours List</h1>
        <ComboYear changeYear={this.changeYear.bind(this)} />
        <ComboMonth changeMonth={this.changeMonth.bind(this)} />

        {this.renderAdd()}
        {this.renderList()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    days: state.days
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDays: fetchDays }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HoursList);
// export default connect(mapStateToProps, { fetchDays })(HoursList);
