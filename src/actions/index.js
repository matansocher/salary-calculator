import { FETCH_DAYS, SET_DAY, DELETE_DAY, FETCH_SETTINGS, SAVE_SETTINGS, FETCH_YEAR, SAVE_YEAR, FETCH_MONTH, SAVE_MONTH } from '../actions/types';
import fire from '../config';

export function fetchDays(year, month) {
  let request;
  console.log(`days/${year}/${month}`);
  fire.database().ref(`days/${year}/${month}`).on('value', snap => {
    const daysObject = snap.val();
    console.log("** "+daysObject);
    request = Object.keys(daysObject).map(function (key) { return daysObject[key]; });
    console.log("request1 "+request);
  });
  // gets here before finishes to calculate request from firebase
  console.log("request2 "+request);
  return {
    type: FETCH_DAYS,
    payload: request
  }
}

export function setDay(day) {
  fire.database().ref(`days/${day.year}/${day.month}/${day.day}`).set({day});

  return {
    type: SET_DAY,
    payload: day
  }
}

export function deleteDay(day) {
  fire.database().ref(`days/${day.year}/${day.month}/${day.day}`).remove();

  return {
    type: DELETE_DAY,
    payload: day
  }
}

export function fetchSettings(year, month) {
  let settings_ref = fire.database().ref(`days/${year}/${month}/settings`);
  this.setState({ loading: true });
  // if no settings object exists - create empty one
  fire.database().ref(`days/${year}/${month}`).once('value', snap => {
    if (!snap.hasChild('settings')) {
      settings_ref.set({
        day: 0,
        month: month,
        year: year,
        hourly: 0,
        breakTime: 0,
        breakAfter: 0,
        pension: 0,
        drives: 0,
        others: 0
      });
    }
  });
  let settingsObject;

  settings_ref.on('value', snap => {
    settingsObject = snap.val();
  }

  return {
    type: FETCH_SETTINGS,
    payload: settingsObject
  }
}

export function saveSettings(settingsObject) {
  fire.database().ref(`days/${day.year}/${day.month}/settings`).set({settingsObject});

  return {
    type: SAVE_SETTINGS,
    payload: settingsObject
  }
}

export function saveYear(year) {

  return {
    type: SAVE_YEAR,
    payload: year
  }
}

export function saveMonth(month) {

  return {
    type: SAVE_MONTH,
    payload: month
  }
}
