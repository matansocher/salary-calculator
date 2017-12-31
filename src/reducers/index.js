import { combineReducers } from 'redux';
import Days from './reducer_days';
import settingsObject from './reducer_settings';
import year from './reducer_year';
import month from './reducer_month';

const rootReducer = combineReducers({
  days: Days,
  settingsObject: settingsObject,
  year: year,
  month: month
});

export default rootReducer;
