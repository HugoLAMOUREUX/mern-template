import { authActions } from "./authAction";

const initState = {
  user: null,
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case authActions.SETUSER:
      return { ...state, user: action.user };
    default:
      return state;
  }
}
