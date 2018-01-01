import { SAVE_MONTH } from '../actions/types';

// export default function(state = (new Date().getMonth() + 1), action) {
export default function(state, action) {
  switch (action.type) {
    case SAVE_MONTH:
      return action.payload;
    default:
      return state;
  }
}
