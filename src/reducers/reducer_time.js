import { SAVE_SETTINGS } from '../actions/types';

const initialTimeState = {
  year: new Date().getFullYear(),
  month: (new Date().getMonth() + 1)
}

export default function(state = initialTimeState, action) {
  switch (action.type) {
    case SAVE_TIME:
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
}
