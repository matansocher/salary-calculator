import { combineReducers } from 'redux';
import Days from './reducer_days';
import settingsObject from './reducer_settings';
import Time from './reducer_time';

const rootReducer = combineReducers({
  days: Days,
  settingsObject: settingsObject,
  time: Time
});

export default rootReducer;
