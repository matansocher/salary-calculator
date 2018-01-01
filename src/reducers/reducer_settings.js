import { FETCH_SETTINGS, SAVE_SETTINGS } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_SETTINGS:
      return action.payload;
    case SAVE_SETTINGS:
      return action.payload;
    default:
      return state;
  }
}
