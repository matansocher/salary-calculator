import React, { Component } from 'react';

class AddDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: getDate(),
      enterhour: getHours(),
      enterminute: getMinutes(),
      exithour: getHours(),
      exitminute: getMinutes(),
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveClick = this.saveClick.bind(this);
  }

  saveClick() {
    this.setState({ loading: true }, () => {
      const { breakAfter, breakTime } = this.state.settingsObject;
      const { year, month } = this.props.time;
      let { dayOfMonth, enterhour, enterminute, exithour, exitminute } = this.refs;
      // maybe we dont need the parseFloat and parseInt
      dayOfMonth = parseInt(dayOfMonth.value.substring(dayOfMonth.value.length - 1), 10)
      enterhour = parseFloat(enterhour.value);
      enterminute = parseFloat(enterminute.value);
      exithour = parseFloat(exithour.value);
      exitminute = parseFloat(exitminute.value);

      this.props.setDay({
        day: dayOfMonth,
        month: month,
        year: year,
        enterhour: enterhour,
        enterminute: enterminute,
        exithour: exithour,
        exitminute: exitminute
      }, breakAfter, breakTime, 1); // the 1 is to add, 2 is to edit
    });
    // not really - need it as a callback
    setTimeout(() => {
      // gesture to user that the changes were saved
      // this.setState({ gesture: true });
      this.props.history.push('/HoursList');
      this.setState({ loading: false });
    }, 1000);
  }

  handleChange(value, name) {
    var change = {};
    change[name] = value;
    this.setState(change);
  }

  handleCancelClick = () => {
    this.props.history.push('/HoursList');
  }

  render() {
    return (
      <div className="container container-fluid">
        <h1>Add Day</h1>
        {this.state.loading ? <MDSpinner className="spinner" size={100} /> : <span />}

        <li className="col-sm-12 col-md-12 list-group-item">
          <h3>Day On Month:</h3>
          <ComboDay handleChange={this.handleChange} month={this.props.time.month} />

          <h3>Enter Hour:</h3>
          <ComboHour handleChange={this.handleChange} />
          :
          <ComboMinute handleChange={this.handleChange} />

          <h3>Exit Hour:</h3>
          <ComboHour handleChange={this.handleChange} />
          :
          <ComboMinute handleChange={this.handleChange} />

          <button onClick={this.saveClick} className="btn btn-success regular-button hours-input">
            <i className="fa fa-floppy-o" aria-hidden="true"></i> Save
          </button>
          <button onClick={this.handleCancelClick} className="btn btn-primary regular-button hours-input">
            <i className="fa fa-times" aria-hidden="true"></i> Cancel
          </button>
        </li>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    time: state.time
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setDay }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDay);
// export default connect(mapStateToProps, { setDay })(AddDay);
