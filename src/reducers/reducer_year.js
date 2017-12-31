import { SAVE_YEAR } from '../actions/types';

export default function(state = (new Date().getFullYear()), action) {
  switch (action.type) {
    case SAVE_YEAR:
      return action.payload;
    default:
      return state;
  }
}
