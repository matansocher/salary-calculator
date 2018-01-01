import { SAVE_YEAR } from '../actions/types';

// export default function(state = (new Date().getFullYear()), action) {
export default function(state, action) {
  switch (action.type) {
    case SAVE_YEAR:
      return action.payload;
    default:
      return state;
  }
}
