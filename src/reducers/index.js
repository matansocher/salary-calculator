import { combineReducers } from 'redux';
import Days from './reducer_days';
import settingsObject from './reducer_settings';

const rootReducer = combineReducers({
  days: Days,
  settingsObject: settingsObject
});

export default rootReducer;
