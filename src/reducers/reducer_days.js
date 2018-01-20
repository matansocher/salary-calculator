import _ from 'lodash';
import { FETCH_DAYS, ADD_DAY, DELETE_DAY } from '../actions/types';

export default function(state = [], action) {
  let newState = state;
  switch (action.type) {
    case FETCH_DAYS:
      return action.payload;
    case ADD_DAY:
      return _.concat(newState, action.payload);
    case DELETE_DAY:
      return _.without(state, action.payload);
    default:
      return state;
  }
}
