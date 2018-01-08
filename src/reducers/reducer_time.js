import { SAVE_TIME } from '../actions/types';

const initialTimeState = {
  year: new Date().getFullYear(),
  month: (new Date().getMonth() + 1)
}

export default function(state = initialTimeState, action) {
  switch (action.type) {
    case SAVE_TIME:
      return action.payload;
    default:
      return state;
  }
}
