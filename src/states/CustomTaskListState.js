export const ACTION_TOGGLE_ACTIVITY = 'TOGGLE_ACTIVITY';
const ACTION_DISMISS_BAR = 'DISMISS_BAR';

const initialState = {
  isOpen: true,
  activityLocked: true
};

export class Actions {
  static dismissBar = () => ({ type: ACTION_DISMISS_BAR });
  static toggleActivityLock = () => ({ type: ACTION_TOGGLE_ACTIVITY })
}

export function reduce(state = initialState, action) {
  switch (action.type) {
    case ACTION_DISMISS_BAR: {
      return {
        ...state,
        isOpen: false,
      };
    }
    case ACTION_TOGGLE_ACTIVITY: {
      return {
        ...state,
        activityLocked: !state.activityLocked,
      };
    }

    default:
      return state;
  }
}
