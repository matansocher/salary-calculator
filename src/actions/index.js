import { FETCH_DAYS, SET_DAY, DELETE_DAY, SAVE_SETTINGS } from '../actions/types';
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

export function saveSettings(day) {
  fire.database().ref(`days/${day.year}/${day.month}/settings`).set({day});

  return {
    type: SAVE_SETTINGS,
    payload: day
  }
}
