import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';

const DayAvatar = (props) => {
  return (
    <MuiThemeProvider>
        <ListItem
          primaryText="Brendan Lim"
          leftAvatar={<Avatar src="../images/avatar.png" />}
        />
    </MuiThemeProvider>
  );
}

export default DayAvatar;
