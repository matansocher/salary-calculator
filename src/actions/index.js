import _ from 'lodash';
import { FETCH_DAYS, ADD_DAY, EDIT_DAY, DELETE_DAY, FETCH_SETTINGS, SAVE_SETTINGS, SAVE_TIME } from '../actions/types';
import fire from '../config';

export function fetchDays(year, month, callback) {


  // fire.database().ref(`days/${year}/${month}`).once('value')
  // .then(snap => {
  //   const daysObject = snap.val();
  //   // const request = Object.keys(daysObject).map(function (key) { return daysObject[key]; });
  //   const array = _.values(daysObject);
  //   console.log("##########");
  //   console.log(array);
  //   return {
  //     type: FETCH_DAYS,
  //     payload: array
  //   };
  // })
  // .catch(() => {
  //   return {
  //     type: FETCH_DAYS,
  //     payload: []
  //   };
  // });
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

  // might be too early, need to wait for the settings object to be created
  return dispatch => {
    fire.database().ref(`days/${year}/${month}`).on('value', snap => {
      const daysObject = snap.val();
      // const request = Object.keys(daysObject).map(function (key) { return daysObject[key]; });
      const array = _.values(daysObject);
      dispatch({
        type: FETCH_DAYS,
        payload: array
      });
    });
    // }).then(() => callback());
  };


}

export function setDay(day, breakAfter, breakTime, addOrEdit) {

  const { month, year, enterhour, enterminute, exithour, exitminute } = day;
  breakTime = breakTime/60;
  const enterAsMinutes = (enterhour * 60) + enterminute;
  const exitAsMinutes = (exithour * 60) - exitminute;
  const numberOfHours = (exitAsMinutes - enterAsMinutes) / 60;
  const hoursAfterUpgrade = 2;

  let numberOfHours100 = 0, numberOfHours125 = 0, numberOfHours150 = 0;

  if (numberOfHours < breakAfter) { // numberOfHours < 8
    numberOfHours100 = numberOfHours;
  }
  if (numberOfHours === breakAfter) { // numberOfHours = 8
    numberOfHours100 = breakAfter - breakTime;
  }
  if (numberOfHours > breakAfter && numberOfHours < (breakAfter + hoursAfterUpgrade)) { // 8 <= numberOfHours < 10
    numberOfHours100 = breakAfter - breakTime;
    numberOfHours125 = hoursAfterUpgrade - (numberOfHours - numberOfHours100);
  }
  if (numberOfHours === (breakAfter + hoursAfterUpgrade)) { // numberOfHours = 10
    numberOfHours100 = breakAfter - breakTime;
    numberOfHours125 = hoursAfterUpgrade - breakTime;
  }
  if (numberOfHours > (breakAfter + hoursAfterUpgrade)) { // numberOfHours >= 10
    numberOfHours100 = breakAfter - breakTime;
    numberOfHours125 = hoursAfterUpgrade;
    numberOfHours150 = numberOfHours - numberOfHours100 - numberOfHours125;
  }

  fire.database().ref(`days/${day.year}/${day.month}/${day.day}`).set({
    day: day.day,
    year: year,
    month: month,
    enterhour: enterhour,
    enterminute: enterminute,
    exithour: exithour,
    exitminute: exitminute,
    numberOfHours: numberOfHours,
    numberOfHours100: numberOfHours100,
    numberOfHours125: numberOfHours125,
    numberOfHours150: numberOfHours150
  }).then(() => {
    if(addOrEdit === 1) { // to add
      return {
        type: ADD_DAY,
        payload: day
      }
    } else { // to edit
      return {
        type: EDIT_DAY,
        payload: day
      }
    }
  }).catch(() => { // did not succed
    return {
      type: ADD_DAY,
      payload: null
    }
  });
  // wait for the request to come back and oly then return the actions
  // redux promise should take care of that
  // if(addOrEdit === 1) { // to add
  //   return {
  //     type: ADD_DAY,
  //     payload: day
  //   }
  // } else { // to edit
  //   return {
  //     type: EDIT_DAY,
  //     payload: day
  //   }
  // }
}

export function deleteDay(day) {
  fire.database().ref(`days/${day.year}/${day.month}/${day.day}`).remove()
  .then(() => {
    return {
      type: DELETE_DAY,
      payload: day
    }
  }).catch(() => {
    return {
      type: DELETE_DAY,
      payload: null
    }
  });
  // wait for the request to come back and oly then return the actions
  // redux promise should take care of that
  // return {
  //   type: DELETE_DAY,
  //   payload: day
  // }
}

export function fetchSettings(year, month) {
  let settings_ref = fire.database().ref(`days/${year}/${month}/settings`);
  // if no settings object exists - create empty one
  fire.database().ref(`days/${year}/${month}`).once('value', snap => {
    if (!snap.hasChild('settings')) {
      console.log('there is no child in: '+month);
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

  // settings_ref.on('value', snap => {
  //   return {
  //     type: FETCH_SETTINGS,
  //     payload: snap.val()
  //   };
  // });



  return dispatch => {
    settings_ref.on('value', snap => {
      dispatch({
        type: FETCH_SETTINGS,
        payload: snap.val()
      });
    });
  };
}

export function saveSettings(settingsObject) {
  const { year, month } = settingsObject;
  fire.database().ref(`days/${year}/${month}/settings`).set({settingsObject})
  .then(() => {
      return {
        type: SAVE_SETTINGS,
        payload: settingsObject
      }
  }).catch(() => {
    return {
      type: SAVE_SETTINGS,
      payload: settingsObject
    }
  });
  // wait for the request(settingsObject) to come back and oly then return the actions
  // redux promise should take care of that
  // return {
  //   type: SAVE_SETTINGS,
  //   payload: settingsObject
  // }
}

export function saveTime(year, month) {
  const time = {
    year: year,
    month: month
  }
  return {
    type: SAVE_TIME,
    payload: time
  }
}
