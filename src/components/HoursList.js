import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { fetchDays, setDay, deleteDay } from '../actions';
import MDSpinner from 'react-md-spinner';
import Day from './Day';

class HoursList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],
      settingsObject: {},
      dayOfMonth: 0,
      enterhour: 0,
      enterminute: 0,
      exithour: 0,
      exitminute: 0,
      add: false,
      loading: true
    }
    this.handleChange = this.handleChange.bind(this);
    this.addDay = this.addDay.bind(this);
    this.editDay = this.editDay.bind(this);
    this.deleteDay = this.deleteDay.bind(this);
  }

  componentDidMount() {
    const { year, month } = this.props.time;
    this.props.fetchDays(year, month);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    const { prevYear, prevMonth } = this.props.time;
    const { nextYear, nextMonth } = nextProps.time;
    if ((prevYear != nextYear) || (prevMonth != nextMonth)) { // check if date has changed
      console.log('time has changed, data should change');
      this.props.fetchDays(nextYear, nextMonth);
    }
    if (this.props.days != nextProps.days) {
      const days = nextProps.days;
      const settingsObject = days[days.length - 1];
      this.setState({ days, settingsObject, loading: false }, () => {
        console.log(this.state.days);
      });
    }
  }

  addDay() {
    let { dayOfMonth, enterhour, enterminute, exithour, exitminute} = this.refs;
    dayOfMonth = parseInt(dayOfMonth.value.substring(dayOfMonth.value.length - 1), 10)
    enterhour = parseFloat(enterhour.value);
    enterminute = parseFloat(enterminute.value);
    exithour = parseFloat(exithour.value);
    exitminute = parseFloat(exitminute.value);

    const { breakAfter, breakTime } = this.state.settingsObject;

    const { year, month } = this.props.time;

    this.setState({ loading: true }, () => {
      this.props.setDay({
        day: dayOfMonth,
        month: month,
        year: year,
        enterhour: enterhour,
        enterminute: enterminute,
        exithour: exithour,
        exitminute: exitminute
      }, breakAfter, breakTime, 1); // the 1 is to add, 2 is to edit
    });
    // not really - need it as a callback
    setTimeout(() => {
      this.setState({ loading: false, add: false });
    }, 1000);
  }

  editDay(day) {
    const { breakAfter, breakTime } = this.state.settingsObject;
    this.setState({ loading: true }, () => {
      this.props.setDay(day, breakAfter, breakTime, 2); // the 2 is to edit, 1 is to add
    });
    // not really - need it as a callback
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  deleteDay(day) {
    this.setState({ loading: true }, () => {
      this.props.deleteDay(day);
    });
    // not really - need it as a callback
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  handleChange(e) {
    var change = {};
    // let currentState = this.state[e.target.name];
    if (!isNaN(e.target.value)) {
      change[e.target.name] = e.target.value;
      this.setState(change);
    }
  }

  handleCancelClick = () => {
    this.setState({ add: false })
  }

  handleAddClick = () => {
    this.setState({ add: true });
  }

  renderAdd() {
    if(this.state.add) {
      return (
        <li className="col-sm-12 col-md-12 list-group-item">
          <h3>Day On Month:</h3>
          <input className="form-control hour-input hours-input" name="dayOfMonth" ref="dayOfMonth"
            value={this.state.dayOfMonth} onChange={this.handleChange}>
          </input>
          <br />
          <h3>Enter Hour:</h3>
          <input className="form-control hour-input hours-input" name="enterhour" ref="enterhour"
            value={this.state.enterhour} onChange={this.handleChange}>
          </input>:
          <input className="form-control hour-input hours-input" name="enterminute" ref="enterminute"
            value={this.state.enterminute} onChange={this.handleChange}>
          </input>
          <br />
          <h3>Exit Hour:</h3>
          <input className="form-control hour-input hours-input" name="exithour" ref="exithour"
            value={this.state.exithour} onChange={this.handleChange}>
          </input>:
          <input className="form-control hour-input hours-input" name="exitminute" ref="exitminute"
            value={this.state.exitminute} onChange={this.handleChange}>
          </input>
          <br />
          <button onClick={this.addDay} className="btn btn-success regular-button hours-input">
            <i className="fa fa-floppy-o" aria-hidden="true"></i> Save
          </button>
          <button onClick={this.handleCancelClick} className="btn btn-primary regular-button hours-input">
            <i className="fa fa-times" aria-hidden="true"></i> Cancel
          </button>
        </li>
      );
    } else {
      return(
        <li className="col-sm-12 col-md-12 list-group-item">
          <button className="btn btn-info add-button regular-button" onClick={this.handleAddClick}>
            <i className="fa fa-plus" aria-hidden="true"></i> Add
          </button>
        </li>
      );
    }
  }

  renderList() {
    const { days, settingsObject } = this.state;

    if (days.length === 1) {
      return (
        <div className="container container-fluid">
          <h1>No Working Days On This Month!</h1>
        </div>
      )
    }

    return (
      days.map(day => {
        const key = `${day.year}${day.month}${day.day}`;
        if (day.day !== 0) {
          return <Day key={key} day={day} settingsObject={settingsObject}
                  editDay={this.editDay} deleteDay={this.deleteDay} />
        }
        return day;
      })
    )
  }

  render() {
    return(
      <div className="container container-fluid">
        <h1>Hours List</h1>
        {this.state.loading ? <MDSpinner className="spinner" size={100} /> : <span />}

        {this.renderAdd()}
        {this.renderList()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    time: state.time,
    days: state.days
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDays, setDay , deleteDay }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HoursList);
// export default connect(mapStateToProps, { fetchDays, setDay , deleteDay })(HoursList);
