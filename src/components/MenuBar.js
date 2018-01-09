import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import fire from '../config';
// import SignInOrSignUp from './SignInOrSignUp';
import MDSpinner from 'react-md-spinner';

export default class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
    this.logOut = this.logOut.bind(this);
  }
  logOut() {
    // this.setState({ loading: true }, () => {
    //   firebase.auth().signOut().then(() => {
    //     this.props.history.push('/SignInOrSignUp');
    //   }, (error) => {
    //     // An error happened.
    //   });
    // });
    // this.setState({ loading: false });
  }
  render() {
    return(
      <div className="container blue-font">
        <div className="row">
          <div className="col-sm-12">
            <nav className="navbar navbar-inverse">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand">Sal-Cal</a>
                </div>
                <div className="collapse navbar-collapse" id="myNavbar">
                  <ul className="nav navbar-nav">
                    <li className="menu-bar-item">
                      <Link to="/">
                        <i className="fa fa-home" aria-hidden="true"></i> Home
                      </Link>
                    </li>
                    <li className="menu-bar-item">
                      <Link to="/HoursList">
                        <i className="fa fa-list-ul" aria-hidden="true"></i> Hours List
                      </Link>
                    </li>
                    <li className="menu-bar-item">
                      <Link to="/Settings">
                        <i className="fa fa-cog" aria-hidden="true"></i> Settings
                      </Link>
                    </li>
                  </ul>
                  <ul className="nav navbar-nav navbar-right">
                    <li className="menu-bar-item" onClick={this.logOut}>
                      <Link to="/SignInOrSignUp">
                        <i className="fa fa-user-circle-o" aria-hidden="true"></i> Sign In
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
        {this.state.loading ? <MDSpinner className="spinner" size={100} /> : <span />}
      </div>
    );
  }
}
