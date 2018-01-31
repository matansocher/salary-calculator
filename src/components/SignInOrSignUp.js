import React, { Component } from 'react';
// import fire from '../config';
// import { singIn, singUp } from '../CommonFunctions';
import MDSpinner from 'react-md-spinner';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

class SignInOrSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInMessage: '',
      signUpMessage: '',
      SIusername: '',
      SIpassword: '',
      SICheck: false,
      SUusername: '',
      SUpassword1: '',
      SUpassword2: '',
      loading: false
    }
    singIn = singIn.bind(this);
    singUp = singUp.bind(this);
  }

  handleChange = (e) => {
    var change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  handleChangeCheckBox = () => {
    this.setState((oldState) => {
      return {
        SICheck: !oldState.SICheck
      }
    });
  }

  render() {
    return (
      <div className="container container-fluid">

        {this.state.loading ? <MDSpinner className="spinner" size={100} /> : <span />}

        <div className="row">
          <div className="col-5 center">
            <MuiThemeProvider>
              <div>
                <h3>Sign In</h3>
                <TextField hintText="Username" name="SIusername"
                  value={this.state.SIusername} onChange={this.handleChange}
                />
                <br />
                <TextField hintText="Password" name="SIpassword" type="password"
                  value={this.state.SIpassword} onChange={this.handleChange}
                />
                <Checkbox label="Keep Me Signed In" labelPosition="left"
                  checked={this.state.SICheck} onChange={this.handleChangeCheckBox}
                />
                <br />
                <p>{this.state.signInMessage}</p>
                forgot my password
                <RaisedButton label="Sign In" primary={true} onClick={singIn} />

                <br />

                <h3>Create An Acount</h3>
                <TextField hintText="Username" name="SUusername"
                  value={this.state.SUusername} onChange={this.handleChange}
                />
                <br />
                <TextField hintText="Password" name="SUpassword1" type="password"
                  value={this.state.SUpassword1} onChange={this.handleChange}
                />
                <br />
                <TextField hintText="Password" name="SUpassword2" type="password"
                  value={this.state.SUpassword2} onChange={this.handleChange}
                />
                <p>{this.state.signUpMessage}</p>
                <RaisedButton label="Sign Up" secondary={true} onClick={singUp} />
              </div>
            </MuiThemeProvider>
          </div>
        </div>
      </div>
    );
  }
}

export default SignInOrSignUp;
