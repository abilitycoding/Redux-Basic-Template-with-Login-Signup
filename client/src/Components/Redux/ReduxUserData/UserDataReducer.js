import * as types from "./UserDataActionType.js";

const setLoginUserEmail = localStorage.getItem("loginUserEmail");

const init = {
  userEmail: setLoginUserEmail ? JSON.parse(setLoginUserEmail) : null
};

export const UserDataReducer = (state = init, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GETUSEREMAIL:
      return {
        ...state,
        userEmail: payload
      };
    case types.LOGOUTUSER:
      return {
        ...state,
        userEmail: null
      };

    default:
      return state;
  }
};
