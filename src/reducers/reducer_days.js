// import _ from 'lodash';
import { FETCH_DAYS, SET_DAY, DELETE_DAY } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_DAYS:
      console.log(action.payload);
      // return _.mapKeys(action.payload.data, "id");
      return action.payload;
    case SET_DAY:
      let newState = state.push(action.payload); // not good yet!!!!!!!!!!!!
      return newState;
    case DELETE_DAY:
      // return _.omit(state, action.payload);
      return action.payload;
    default:
      return state;
  }
}
