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
      settingsObject: props.settingsObject
    };
  }

  handleDeleteClick = () => {
    this.props.deleteDay(this.props.day);
  }

  handleDayChange = (a, value) => {
    this.setState({ day: value + 1 });
  }

  renderRegular() {
    const { day, month, year, enterTime, exitTime } = this.state.day;
    const { breakAfter, breakTime, hourly } = this.state.settingsObject;
    const arrayOfHours = calculateHours(this.state.day, breakAfter, breakTime);
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

  renderTable() {
    const { day, month, year } = this.state.day;
    const { breakAfter, breakTime, hourly } = this.state.settingsObject;
    const arrayOfHours = calculateHours(this.state.day, breakAfter, breakTime);
    const { enterTime, exitTime } = this.state;
    const wage = ((arrayOfHours[1] + arrayOfHours[2]*1.25 + arrayOfHours[3]*1.5)*hourly).toFixed(2);
    const dayOfWeek;
    const today = new date();
    // if (`${month}/${day}/${year}` === `${date.getMonth+1}/${date.getDate}/${date.getFullYear}`)
    if (`${month}/${day}/${year}`.localeCompare(`${date.getMonth+1}/${date.getDate}/${date.getFullYear}`) === 0)
      dayOfWeek = `${day}/${month}, ${getDayOfWeek(`${month}/${day}/${year}`)}`;\
    else
      dayOfWeek = 'today';

    return(
      <div>

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

        <td>
          <div className="circle">
            <p>{dayOfWeek}</p>
          </div>
        </td>
        <td>{enterTime} - {exitTime}</td>
        <td>{arrayOfHours[0].toFixed(2)} Hours</td>
        <td>Wage: {wage}</td>

      </div>
    );
  }

  render() {
    return (
      this.renderTable()
    )
  }
}
