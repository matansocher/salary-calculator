import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export default class ComboYear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: new Date().getFullYear()
    }
  }
  handleChange = (event, index, value) => {
    this.setState({ currentYear: value }, () => {
      this.props.changeYear(value);
    });
  }
  render() {
    return (
      <div className="form-group col-sm-6">
        <MuiThemeProvider>
          <DropDownMenu
            className="combo"
            value={this.state.currentYear}
            onChange={this.handleChange}
            autoWidth={false}
          >
            <MenuItem value={2018} primaryText="2018" />
            <MenuItem value={2019} primaryText="2019" />
            <MenuItem value={2020} primaryText="2020" />
            <MenuItem value={2021} primaryText="2021" />
          </DropDownMenu>
        </MuiThemeProvider>

      </div>
    );
  }
}
