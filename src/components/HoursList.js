import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { fetchDays, addDay, editDay, deleteDay } from '../actions';
import MDSpinner from 'react-md-spinner';
import fire from '../config';
import Day from './Day';

class HoursList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayOfMonth: 0,
      enterhour: 0,
      enterminute: 0,
      exithour: 0,
      exitminute: 0,
      add: false,
      loading: false
    }
  }

  componentDidMount() {
    const { year, month } = this.props.route;
    this.props.fetchDays(year, month);
  }

  addDay() {
    const dayOfMonth = parseInt(this.refs.dayOfMonth.value);
    const enterhour = parseFloat(this.refs.enterhour.value);
    const enterminute = parseFloat(this.refs.enterminute.value);
    const exithour = parseFloat(this.refs.exithour.value);
    const exitminute = parseFloat(this.refs.exitminute.value);

    const newDays = this.props.days;
    const breakAfter = newDays[newDays.length-1].breakAfter;
    const breakTime = newDays[newDays.length-1].breakTime;

    const { year, month } = this.props.route;

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
    setTimeout(() => {
      this.setState({ loading: false, add: false });
    }, 1000);
  }

  editDay(day) {
    const newDays = this.props.days;
    const breakAfter = newDays[newDays.length-1].breakAfter;
    const breakTime = newDays[newDays.length-1].breakTime;
    this.setState({ loading: true }, () => {
      this.props.setDay(day, breakAfter, breakTime, 2); // the 2 is to edit, 1 is to add
    });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  deleteDay(day) {
    this.setState({ loading: true }, () => {
      this.props.deleteDay(day);
    });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  renderAdd() {
    if(this.state.add) {
      return (
        <li className="col-sm-12 col-md-12 list-group-item">
          <h3>Day On Month:</h3>
          <input className="form-control hour-input hours-input" ref="dayOfMonth" value={this.state.dayOfMonth} onChange={this.handleChange.bind(this)}></input><br />
          <h3>Enter Hour:</h3>
          <input className="form-control hour-input hours-input" ref="enterhour" value={this.state.enterhour} onChange={this.handleChange.bind(this)}></input>:
          <input className="form-control hour-input hours-input" ref="enterminute" value={this.state.enterminute} onChange={this.handleChange.bind(this)}></input><br />
          <h3>Exit Hour:</h3>
          <input className="form-control hour-input hours-input" ref="exithour" value={this.state.exithour} onChange={this.handleChange.bind(this)}></input>:
          <input className="form-control hour-input hours-input" ref="exitminute" value={this.state.exitminute} onChange={this.handleChange.bind(this)}></input><br />
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
                  breakAfter={newDays[newDays.length - 1].breakAfter}, breakTime={newDays[newDays.length - 1].breakTime}
                  editDay={this.editDay.bind(this)} deleteDay={this.deleteDay.bind(this)} />
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
    days: state.days
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDays, setDay , deleteDay }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HoursList);
// export default connect(mapStateToProps, { fetchDays, setDay , deleteDay })(HoursList);
