import React, { Component } from 'react';
import { calculateHours, populateOptionsForDayMonth, getDayOfWeek } from '../CommonFunctions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import TimePicker from 'material-ui/TimePicker';
import Delete from 'material-ui/svg-icons/action/delete';
import Edit from 'material-ui/svg-icons/editor/ModeEdit';
import Save from 'material-ui/svg-icons/content/save';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

export default class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: props.day,
      settingsObject: props.settingsObject,
      enterTime: props.day.enterTime,
      exitTime: props.day.exitTime,
      editing: false
    };
    this.saveClick = this.saveClick.bind(this);
  }

  saveClick() {
    // if in add day at AddDay class works the callback after the loading true state, add to here also
    const { day, month, year } = this.state.day;
    const { enterTime, exitTime } = this.state;

    this.props.editDay({
      day,
      year,
      month,
      enterTime,
      exitTime,
    });

    setTimeout(() => {
      this.setState({ loading: false, editing: false });
    }, 1000);
  }

  // getDayOfWeek() {
  //   const { day, month, year } = this.state.day;
  //   const date = `${month}/${day}/${year}`;
  //   const dateString = new Date(date);
  //   const dayNumber = dateString.getDay();
  //   let dayString = '';
  //   switch(dayNumber) {
  //     case 0: dayString = "Sun"; break;
  //     case 1: dayString = "Mon"; break;
  //     case 2: dayString = "Tue"; break;
  //     case 3: dayString = "Wed"; break;
  //     case 4: dayString = "Thu"; break;
  //     case 5: dayString = "Fri"; break;
  //     case 6: dayString = "Sat"; break;
  //     default: dayString = "Sun"; break;
  //   }
  //   return dayString;
  // }

  // populateOptionsForDayMonth() {
  //   const month = this.props.time.month;
  //   let numOfDaysInMonth = 0;
  //   if (month === 2)
  //     numOfDaysInMonth = 28;
  //   else if (month === 4 || month === 6 || month === 9 || month === 11)
  //     numOfDaysInMonth = 30;
  //   else
  //     numOfDaysInMonth = 31;
  //
  //   const array = new Array(numOfDaysInMonth);
  //   for (var i = 0; i < array.length; i++) {
  //     array[i] = i;
  //   }
  //   return (
  //     array.map((i) => {
  //       return <MenuItem key={i} value={i+1} primaryText={i+1} />;
  //     })
  //   )
  // }

  handleCancelClick = () => {
    this.setState({ editing: false });
  }

  handleEditClick = () => {
    this.setState({ editing: true });
  }

  handleDeleteClick = () => {
    this.props.deleteDay(this.props.day);
  }

  handleDayChange = (a, value) => {
    this.setState({ day: value });
  }

  handleEnterHourChange = (a, value) => {
    this.setState({ enterTime: value });
  }

  handleExitHourChange = (a, value) => {
    this.setState({ exitTime: value });
  }

  renderEdit() {
    return(
      <li className="col-sm-12 col-md-12 list-group-item">

        <MuiThemeProvider>
          <div>
            <SelectField floatingLabelText="Day Of Month" value={this.state.day} onChange={this.handleDayChange} >
              {this.populateOptionsForDayMonth(this.props.time.month)}
            </SelectField>
            <TimePicker className="time-picker" format="24hr" hintText="Enter Hour" okLabel="OK" cancelLabel="Cancel"
              value={this.state.enterTime} onChange={this.handleEnterHourChange}/>
            <TimePicker className="time-picker" format="24hr" hintText="Exit Hour" okLabel="OK" cancelLabel="Cancel"
              value={this.state.exitTime} onChange={this.handleExitHourChange}/>
          </div>
        </MuiThemeProvider>

        <Save className="pull-xs-right" onClick={this.saveClick} />

        <Delete className="pull-xs-left" onClick={this.handleCancelClick} />

        <button onClick={this.saveClick} className="btn btn-success regular-button pull-xs-right">
          <i className="fa fa-floppy-o" aria-hidden="true"></i> Save
        </button>

        <button onClick={this.handleCancelClick} className="btn btn-primary regular-button pull-xs-left">
          <i className="fa fa-trash" aria-hidden="true"></i> Cancel
        </button>
      </li>
    );
  }

  renderRegular() {
    const { day, month, numberOfHours, numberOfHours100, numberOfHours125 ,numberOfHours150 } = this.state.day;
    const arrayOfHours = calculateHours(this.state.day); // ************** change numberOfHours to arrayOfHours[0] ,numberOfHours100 to arrayOfHours[1]
    const { enterTime, exitTime } = this.state;
    const { hourly } = this.state.settingsObject;

    return(
      <li className="col-sm-12 col-md-12 list-group-item">

        <MuiThemeProvider>
          <IconMenu className="pull-xs-right"
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}>
            <MenuItem primaryText="Edit" onClick={this.handleEditClick} leftIcon={
              <Edit onClick={this.handleEditClick} />
            }>
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </MenuItem>

            <MenuItem primaryText="Delete" leftIcon={
              <Delete onClick={this.handleDeleteClick} />
            } />
          </IconMenu>
        </MuiThemeProvider>

        <h3>{day}/{month}, {this.getDayOfWeek(this.state.day)}</h3>
        <p>{enterTime} - {exitTime}</p>
        <p>{numberOfHours} Hours</p>
        <p>Wage: {(numberOfHours100 + numberOfHours125*1.25 + numberOfHours150*1.5)*hourly}</p>

        <button className="btn btn-warning regular-button" onClick={this.handleEditClick}>
          <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
        </button>
        <button className="btn btn-danger regular-button" onClick={this.handleDeleteClick}>
          <i className="fa fa-trash-o" aria-hidden="true"></i> Delete
        </button>
      </li>
    );
  }

  render() {
    return (
      this.state.editing ? this.renderEdit() : this.renderRegular()
    )
  }
}
