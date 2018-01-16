import _ from 'lodash';
import { FETCH_DAYS, ADD_DAY, EDIT_DAY, DELETE_DAY, FETCH_SETTINGS, SAVE_SETTINGS, SAVE_TIME } from '../actions/types';
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

            // return {
            //   type: FETCH_DAYS,
            //   payload: array
            // }

          });
          // }).then(() => callback());
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
      // return {
      //   type: FETCH_DAYS,
      //   payload: array
      // }
    });
  };
}

export function setDay(day, breakAfter, breakTime, addOrEdit) {

  switch (addOrEdit) {
    case 1: addOrEdit = ADD_DAY; break;
    case 2: addOrEdit = EDIT_DAY; break;
    default: addOrEdit = ADD_DAY;
  }

  return dispatch => {
    fire.database().ref(`days/${day.year}/${day.month}/${day.day}`).set({
        day: day.day,
        year: day.year,
        month: day.month,
        enterTime: day.enterTime,
        exitTime: day.exitTime
      });
      dispatch({
        type: addOrEdit,
        payload: day
      });

      // return {
      //   type: addOrEdit,
      //   payload: day
      // }
  };
}

export function deleteDay(day) {
  return dispatch => {
    fire.database().ref(`days/${day.year}/${day.month}/${day.day}`).remove();
      dispatch({
        type: DELETE_DAY,
        payload: day
      });

      // return {
      //   type: DELETE_DAY,
      //   payload: day
      // }
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

            // return {
            //   type: FETCH_SETTINGS,
            //   payload: snap.val()
            // }
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

      // return {
      //   type: FETCH_SETTINGS,
      //   payload: snap.val()
      // }
    });
  };
}

export function saveSettings(settings, callback) {
  const { year, month } = settings;
  return dispatch => {
    fire.database().ref(`days/${year}/${month}/`).set({ settings });
    dispatch({
      type: SAVE_SETTINGS,
      payload: settings
    });

    // return {
    //   type: SAVE_SETTINGS,
    //   payload: settings
    // }
  }
}

export function saveTime(year, month) {
  const time = { year, month }
  return {
    type: SAVE_TIME,
    payload: time
  }
}
