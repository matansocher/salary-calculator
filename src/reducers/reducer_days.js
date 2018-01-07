import _ from 'lodash';
import { FETCH_DAYS, ADD_DAY, EDIT_DAY, DELETE_DAY } from '../actions/types';

export default function(state = [], action) {
  let newState = state;
  switch (action.type) {
    case FETCH_DAYS:
      console.log(action.payload);
      return action.payload;
    case ADD_DAY:
      return _.concat(newState, action.payload);
      // newState[newState.length] = action.payload;
      // return newState;
    case EDIT_DAY:
      const index = _.findIndex(state, (day) => {
        return day.day === action.payload.day;
      });
      newState[index] = action.payload;
      return newState;
    case DELETE_DAY:
      return _.without(state, action.payload);
    default:
      return state;
  }
}
