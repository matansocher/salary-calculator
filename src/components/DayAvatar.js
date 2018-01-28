import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';

const DayAvatar = (props) => {
  return (
    <MuiThemeProvider>
      <Paper style="circle-avatar" zDepth={2} circle={true} />
      <ListItem
        primaryText="Brendan Lim"
        leftAvatar={<Avatar src="../images/avatar.png" />}
      />
    </MuiThemeProvider>
  );
}

export default DayAvatar;
