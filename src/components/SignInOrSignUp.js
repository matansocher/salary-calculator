import React, { Component } from 'react';
import fire from '../config';
import MDSpinner from 'react-md-spinner';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

class SignInOrSignUp extends component {
  constructor(props) {
    super(props);
    this.state= {
      SIusername: '',
      SIpassword: '',
      SICheck: false,
      SUusername: '',
      SUpassword1: '',
      SUpassword2: '',
      loading: false

    }
    this.singIn = this.singIn.bind(this);
    this.singUp = this.singUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this);
  }

  singIn() {

  }

  singUp() {

  }

  handleChange(e) {
    var change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  handleChangeCheckBox() {
    const cb = this.state.SICheck;
    this.setState({ SICheck: !cb });
  }

  render() {
    return (
      <div className="container container-fluid">
        <div class="row">
          <div class="col"></div>
            <div class="col-5 center">

              <MuiThemeProvider>
                <h3>Sign In</h3>
                <TextField hintText="Username" name="SIusername"
                  value={this.state.SIusername} onChange={this.handleChange}
                />
                <br />
                <TextField hintText="Password" name="SIpassword"
                  value={this.state.SIpassword} onChange={this.handleChange}
                />
                <Checkbox label="Keep Me Signed In" labelPosition="left"
                  checked={this.state.SICheck} onChange={this.handleChangeCheckBox}
                />
                <br />
                <a href="#">forgot my password</a>

                <br />
                
                <h3>Create An Acount</h3>
                <TextField hintText="Username" name="SUusername"
                  value={this.state.SUusername} onChange={this.handleChange}
                />
                <br />
                <TextField hintText="Password" name="SUpassword1"
                  value={this.state.SUpassword1} onChange={this.handleChange}
                />
                <br />
                <TextField hintText="Password" name="SUpassword2"
                  value={this.state.SUpassword2} onChange={this.handleChange}
                />
              </MuiThemeProvider>
            </div>
          <div class="col"></div>
        </div>
      </div>
    );
  }
}

export default SignInOrSignUp;
