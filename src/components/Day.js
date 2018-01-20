import React, { Component } from 'react';
import { calculateHours, getDayOfWeek } from '../CommonFunctions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
      exitTime: props.day.exitTime
    };
  }

  handleDeleteClick = () => {
    this.props.deleteDay(this.props.day);
  }

  handleDayChange = (a, value) => {
    this.setState({ day: value + 1 });
  }

  handleEnterHourChange = (a, value) => {
    this.setState({ enterTime: value });
  }

  handleExitHourChange = (a, value) => {
    this.setState({ exitTime: value });
  }
  //
  // renderEdit() {
  //   return(
  //     <li className="col-sm-12 col-md-12 list-group-item">
  //
  //       <MuiThemeProvider>
  //         <div>
  //           <SelectField floatingLabelText="Day Of Month" value={this.state.day} onChange={this.handleDayChange} >
  //             {populateOptionsForDayMonth(this.props.time.month)}
  //           </SelectField>
  //           <TimePicker className="time-picker" format="24hr" hintText="Enter Hour" okLabel="OK" cancelLabel="Cancel"
  //             defaultTime={this.state.enterTime} value={this.state.enterTime} onChange={this.handleEnterHourChange}/>
  //           <TimePicker className="time-picker" format="24hr" hintText="Exit Hour" okLabel="OK" cancelLabel="Cancel"
  //             defaultTime={this.state.exitTime} value={this.state.exitTime} onChange={this.handleExitHourChange}/>
  //         </div>
  //       </MuiThemeProvider>
  //
  //       <button onClick={this.saveClick} className="btn btn-success regular-button pull-xs-right">
  //         <i className="fa fa-floppy-o" aria-hidden="true"></i> Save
  //       </button>
  //
  //       <button onClick={this.handleCancelClick} className="btn btn-primary regular-button pull-xs-left">
  //         <i className="fa fa-trash" aria-hidden="true"></i> Cancel
  //       </button>
  //     </li>
  //   );
  // }

  renderRegular() {
    const { day, month, year } = this.state.day;
    const { breakAfter, breakTime } = this.state.settingsObject;
    const arrayOfHours = calculateHours(this.state.day, breakAfter, breakTime);
    const { enterTime, exitTime } = this.state;
    const { hourly } = this.state.settingsObject;
    const wage = ((arrayOfHours[1] + arrayOfHours[2]*1.25 + arrayOfHours[3]*1.5)*hourly).toFixed(2);
    const dayOfWeek = `${day}/${month}, ${getDayOfWeek(`${month}/${day}/${year}`)}`;

    return(
      <li className="col-sm-12 col-md-12 list-group-item">

        <MuiThemeProvider>

          

          <IconMenu className="pull-xs-right"
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}>

            <MenuItem primaryText="Delete" onClick={this.handleDeleteClick} leftIcon={
              <i className="fa fa-trash" aria-hidden="true"></i>
            } />

          </IconMenu>
        </MuiThemeProvider>

        <h3>{dayOfWeek}</h3>
        <p>{enterTime} - {exitTime}</p>
        <p>{arrayOfHours[0].toFixed(2)} Hours</p>
        <p>Wage: {wage}</p>

      </li>
    );
  }

  render() {
    return (
      this.renderRegular()
    )
  }
}
