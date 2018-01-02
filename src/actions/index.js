import { FETCH_DAYS, ADD_DAY, EDIT_DAY, DELETE_DAY, FETCH_SETTINGS, SAVE_SETTINGS } from '../actions/types';
import fire from '../config';

export function fetchDays(year, month) {
  let request;
  fire.database().ref(`days/${year}/${month}`).on('value', snap => {
    const daysObject = snap.val();
    request = Object.keys(daysObject).map(function (key) { return daysObject[key]; });

    console.log("inside: "+request);

    return (dispatch) => {
      request.then(({data}) => {
        dispatch({ type: FETCH_DAYS, payload: data })
      });
      // maybe need to handle error state returned
    };
  });


  //****************************uninstall redux-promise*******************************
  //****************************install redux-thunk***********************************


    // const request = axios.get('http://jsonplaceholder.typicode.com/users');
    //
    //
    // return (dispatch) => {
    //   request.then(({data}) => {
    //     dispatch({ type: 'FETCH_PROFILES', payload: data })
    //   });
    // };


  // wait for the request(daysObject) to come back and only then return the actions
  // redux promise should take care of that
  // console.log("outside: "+request);
  // return {
  //   type: FETCH_DAYS,
  //   payload: request
  // }
}

export function setDay(day, breakAfter, breakTime, addOrEdit) {

  const { month, year, enterhour, enterminute, exithour, exitminute } = day;
  breakTime = breakTime/60;
  const enterAsMinutes = (enterhour * 60) + enterminute;
  const exitAsMinutes = (exithour * 60) - exitminute;
  const numberOfHours = (exitAsMinutes - enterAsMinutes) / 60;

  let numberOfHours100 = 0, numberOfHours125 = 0, numberOfHours150 = 0;

  if (numberOfHours < breakAfter) { // numberOfHours < 8
    numberOfHours100 = numberOfHours;
  }
  if (numberOfHours === breakAfter) { // numberOfHours = 8
    numberOfHours100 = breakAfter - breakTime;
  }
  if (numberOfHours > breakAfter && numberOfHours < (breakAfter + 2)) { // 8 <= numberOfHours < 10
    numberOfHours100 = breakAfter - breakTime;
    numberOfHours125 = 2 - (numberOfHours - numberOfHours100);
  }
  if (numberOfHours === (breakAfter + 2)) { // numberOfHours = 10
    numberOfHours100 = breakAfter - breakTime;
    numberOfHours125 = 2 - breakTime;
  }
  if (numberOfHours > (breakAfter + 2)) { // numberOfHours >= 10
    numberOfHours100 = breakAfter - breakTime;
    numberOfHours125 = 2;
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
    return (dispatch) => {
      settingsObject.then(({data}) => {
        dispatch({ type: FETCH_SETTINGS, payload: data })
      });
      // maybe need to handle error state returned
    };
  });
  // wait for the request(settingsObject) to come back and oly then return the actions
  // redux promise should take care of that
  // return {
  //   type: FETCH_SETTINGS,
  //   payload: settingsObject
  // }
}

export function saveSettings(settingsObject) {
  fire.database().ref(`days/${settingsObject.year}/${settingsObject.month}/settings`).set({settingsObject})
  .then(() => {
      return {
        type: SAVE_SETTINGS,
        payload: day
      }
  });
  // wait for the request(settingsObject) to come back and oly then return the actions
  // redux promise should take care of that
  // return {
  //   type: SAVE_SETTINGS,
  //   payload: settingsObject
  // }
}
