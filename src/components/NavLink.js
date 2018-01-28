import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavLink extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <li className="menu-bar-item">
        <Link to={this.props.linkTo}>
          <i className={this.props.logo} aria-hidden="true"></i> {this.props.title}
        </Link>
      </li>
    );
  }
}
