import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

export default class CustomBottomNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    }
  }

  select = (index) => {
    this.setState({ selectedIndex: index }, () => {
      switch (index) {
        case 0:
          this.props.history.push('/'); return;
        case 1:
          this.props.history.push('/HoursList'); return;
        case 2:
          this.props.history.push('/Settings'); return;
        default:
          this.props.history.push('/');
      }
    });
    this.props.history.push('/AddDay');
  }

  render() {
    return (
      <MuiThemeProvider>
        <Paper zDepth={1}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="Main Page"
              icon={recentsIcon}
              onClick={() => this.select(0)} />
            <BottomNavigationItem
              label="Hours List"
              icon={favoritesIcon}
              onClick={() => this.select(1)} />
            <BottomNavigationItem
              label="Settings"
              icon={nearbyIcon}
              onClick={() => this.select(2)} />
          </BottomNavigation>
        </Paper>
      </MuiThemeProvider>
    );
  }
}
