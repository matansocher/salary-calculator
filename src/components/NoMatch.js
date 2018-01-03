import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NoMatch extends Component {
  render() {
    return(
      <div className="container container-fluid">
        <h1>Oops, something went wrong</h1>
        <ul class="list-group">
          <li class="list-group-item list-group-item-success"><Link to="/">Home</Link></li>
          <li class="list-group-item list-group-item-info"><Link to="/HoursList">Hours List</Link></li>
          <li class="list-group-item list-group-item-warning"><Link to="/Settings">Settings</Link></li>
        </ul>
      </div>
    );
  }
}
