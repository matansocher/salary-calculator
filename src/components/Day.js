import React, { Component } from 'react';
import { calculateHours, getDayOfWeek } from '../CommonFunctions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Delete from 'material-ui/svg-icons/action/delete';
import MoneyIcon from 'material-ui/svg-icons/editor/attach-money';
import TimeIcon from 'material-ui/svg-icons/device/access-time';

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
    const { enterTime, exitTime } = this.state.day;
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
          <div>
            <IconMenu className="pull-right"
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
              <MenuItem primaryText="Remove" leftIcon={<Delete />}
                 onClick={this.handleDeleteClick} />
            </IconMenu>
            <FloatingActionButton secondary={true}>
              {dayOfWeek}
            </FloatingActionButton> <br />
            <TimeIcon /> <span className="day-description">{enterTime} - {exitTime}</span> <br />
            <TimeIcon /> <span className="day-description">{arrayOfHours[0].toFixed(2)} Hours</span> <br />
            <MoneyIcon /> <span className="day-description">Wage: {wage}</span> <br />
          </div>
        </MuiThemeProvider>
      </li>
    );
  }

  render() {
    return (
      this.renderRegular()
    )
  }
}
