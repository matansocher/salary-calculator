import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export default class ComboMonth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: (new Date().getMonth() + 1)
    }
  }
  handleChange = (event, index, value) => {
    this.setState({ currentMonth: value }, () => {
      this.props.changeMonth(value);
    });
  }
  render() {
    return (
      <div className="form-group col-sm-6">
        <MuiThemeProvider>
          <DropDownMenu
            className="combo"
            value={this.state.currentMonth}
            onChange={this.handleChange}
            autoWidth={false}
            className="combo"
          >
            <MenuItem value={1} primaryText="January" />
            <MenuItem value={2} primaryText="February" />
            <MenuItem value={3} primaryText="March" />
            <MenuItem value={4} primaryText="April" />
            <MenuItem value={5} primaryText="May" />
            <MenuItem value={6} primaryText="June" />
            <MenuItem value={7} primaryText="July" />
            <MenuItem value={8} primaryText="August" />
            <MenuItem value={9} primaryText="September" />
            <MenuItem value={10} primaryText="October" />
            <MenuItem value={11} primaryText="November" />
            <MenuItem value={12} primaryText="December" />
          </DropDownMenu>
        </MuiThemeProvider>
      </div>
    );
  }
}
