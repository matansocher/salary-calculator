import React, { Component } from 'react';
import { calculateHours, getDayOfWeek } from '../CommonFunctions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FloatingActionButton from 'material-ui/FloatingActionButton';

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
    const { day, month, year } = this.state.day;
    const { breakAfter, breakTime, hourly } = this.state.settingsObject;
    const arrayOfHours = calculateHours(this.state.day, breakAfter, breakTime);
    const { enterTime, exitTime } = this.state;
    const wage = ((arrayOfHours[1] + arrayOfHours[2]*1.25 + arrayOfHours[3]*1.5)*hourly).toFixed(2);
    let dayOfWeek;
    const today = new Date();
    const todaysDate = `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`;
    if (`${month}/${day}/${year}`.localeCompare(todaysDate) === 0)
      dayOfWeek = 'Today';
    else
      dayOfWeek = `${day}/${month}, ${getDayOfWeek(`${month}/${day}/${year}`)}`;

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

          <FloatingActionButton>
            {dayOfWeek}
          </FloatingActionButton>
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
