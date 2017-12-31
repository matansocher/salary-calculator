import { combineReducers } from 'redux';
import Days from './reducer_days';
// import Day from './reducer_day';

const rootReducer = combineReducers({
  days: Days
});

export default rootReducer;
