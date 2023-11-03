import * as types from "./UserDataActionType";

export const loginUserEmail = (loginUserEmail) => {
  localStorage.setItem("loginUserEmail", JSON.stringify(loginUserEmail));

  return {
    type: types.GETUSEREMAIL,
    payload: loginUserEmail
  };
};

export const LogoutHandleDeclaration = (payload) => {
  localStorage.removeItem("loginUserEmail");
  return {
    type: types.LOGOUTUSER,
    payload
  };
};
