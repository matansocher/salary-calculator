import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const nearbyIcon = <IconLocationOn />;

export default class CustomBottomNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    }
    this.selectScreen = this.selectScreen.bind(this);
  }

  selectScreen(selectedIndex) {
    this.setState({ selectedIndex }, () => {
      this.props.history.push('/Settings');
      // switch (index) {
      //   case 0:
      //     this.props.history.push('/'); return;
      //   case 1:
      //   console.log('1');
      //     this.props.history.push('/'); return;
      //   case 2:
      //     this.props.history.push('/Settings'); return;
      //   default:
      //     this.props.history.push('/');
      // }
    });
  }

  select = (selectedIndex) => {
    console.log(selectedIndex);
    this.setState({ selectedIndex }, () => {
      console.log(this.state.selectIndex);
      // switch (index) {
      //   case 0:
      //     this.props.history.push('/'); return;
      //   case 1:
      //     this.props.history.push('/'); return;
      //   case 2:
      //     this.props.history.push('/Settings'); return;
      //   default:
      //     this.props.history.push('/');
      // }
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <Paper zDepth={1}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="Main Page"
              icon={nearbyIcon}
              onClick={() => this.select(0)} />
            <BottomNavigationItem
              label="Hours List"
              icon={nearbyIcon}
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
