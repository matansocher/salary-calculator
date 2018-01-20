import _ from 'lodash';
import { FETCH_DAYS, ADD_DAY, DELETE_DAY, FETCH_SETTINGS, SAVE_SETTINGS, SAVE_TIME } from '../actions/types';
import { getCorrectTime } from '../CommonFunctions';
import fire from '../config';

export function fetchDays(year, month, callback) {
  const settings_ref = fire.database().ref(`days/${year}/${month}/settings`);
  fire.database().ref(`days/${year}/${month}`).once('value', snap => {
    // if no settings object exists - create empty one
    if (!snap.hasChild('settings')) {
      settings_ref.set({
        day: 0,
        month,
        year,
        hourly: 0,
        breakTime: 0,
        breakAfter: 0,
        pension: 0,
        drives: 0,
        others: 0
      }).then(() => {
        return dispatch => {
          fire.database().ref(`days/${year}/${month}`).on('value', snap => {
            const daysObject = snap.val();
            const array = _.values(daysObject);
            dispatch({
              type: FETCH_DAYS,
              payload: array
            });
          });
        };
      });
    }
  });

  return dispatch => {
    fire.database().ref(`days/${year}/${month}`).on('value', snap => {
      const daysObject = snap.val();
      const array = _.values(daysObject);
      dispatch({
        type: FETCH_DAYS,
        payload: array
      });
    });
  };
}

export function addDay(day, breakAfter, breakTime, callback) {

  const arrayOfHours = getCorrectTime(day);

  return dispatch => {
    fire.database().ref(`days/${day.year}/${day.month}/${day.day}`).set({
      day: day.day,
      year: day.year,
      month: day.month,
      enterTime: arrayOfHours[0],
      exitTime: arrayOfHours[1]
    });
    callback();
    dispatch({
      type: ADD_DAY,
      payload: day
    });
  };
}

export function deleteDay(day, callback) {
  return dispatch => {
    fire.database().ref(`days/${day.year}/${day.month}/${day.day}`).remove();
    callback();
    dispatch({
      type: DELETE_DAY,
      payload: day
    });
    }
}

export function fetchSettings(year, month) {
  const settings_ref = fire.database().ref(`days/${year}/${month}/settings`);
  // if no settings object exists - create empty one
  fire.database().ref(`days/${year}/${month}`).once('value', snap => {
    if (!snap.hasChild('settings')) {
      settings_ref.set({
        day: 0,
        month,
        year,
        hourly: 0,
        breakTime: 0,
        breakAfter: 0,
        pension: 0,
        drives: 0,
        others: 0
      }).then(() => {
        return dispatch => {
          settings_ref.on('value', snap => {
            dispatch({
              type: FETCH_SETTINGS,
              payload: snap.val()
            });
          });
        }
      });
    }
  });

  return dispatch => {
    settings_ref.on('value', snap => {
      dispatch({
        type: FETCH_SETTINGS,
        payload: snap.val()
      });
    });
  };
}

export function saveSettings(settings, callback) {
  const { year, month } = settings;
  return dispatch => {
    fire.database().ref(`days/${year}/${month}/`).set({ settings });
    callback();
    dispatch({
      type: SAVE_SETTINGS,
      payload: settings
    });
  }
}

export function saveTime(year, month) {
  const time = { year, month }
  return {
    type: SAVE_TIME,
    payload: time
  }
}
