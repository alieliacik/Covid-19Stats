import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTHENTICATE = "AUTHENTICATE";
export const IS_STILL_LOGGED_IN = "IS_LOGGED_IN";
export const LOGOUT = "LOGOUT";
export const SEND_PASSWORD_RESET_EMAIL = "SEND_PASSWORD_RESET_EMAIL";
export const REMEMBER_ME_HANDLER = "REMEMBER_ME_HANDLER";

export const authenticate = (userId, token, email) => {
  return {
    type: AUTHENTICATE,
    userId: userId,
    token: token,
    email: email,
  };
};

export const signUp = (email, password) => {
  return async (dispatch, getState) => {
    const isRememberMe = getState().auth.isRememberMe;
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyANj-4XGD0qPEJPPZR0OXyEqcNacKaj78E",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;

      let message = "Something went wrong!";
      if (errorId === "EMAIL_EXISTS") {
        message = "This email exists already!";
      } else {
        message = errorId.replace(/_/g, " ");
      }
      throw new Error(message);
    }
    const resData = await response.json();

    dispatch(authenticate(resData.localId, resData.idToken, resData.email));

    let expirationDate =
      new Date().getTime() + Number(resData.expiresIn * 1000);
    if (isRememberMe) {
      expirationDate = 999999999999999999999999999999999;
    }
    saveDataToStorage(
      resData.idToken,
      resData.localId,
      resData.email,
      expirationDate
    );
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    const isRememberMe = getState().auth.isRememberMe;
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyANj-4XGD0qPEJPPZR0OXyEqcNacKaj78E",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is not valid!";
      } else {
        message = errorId.replace(/_/g, " ");
      }
      throw new Error(message);
    }

    const resData = await response.json();
    dispatch(authenticate(resData.localId, resData.idToken, resData.email));

    let expirationDate =
      new Date().getTime() + Number(resData.expiresIn * 1000);
    if (isRememberMe) {
      expirationDate = 999999999999999999999999999999999;
    }
    saveDataToStorage(
      resData.idToken,
      resData.localId,
      resData.email,
      expirationDate
    );
  };
};

export const isStillLoggenIn = (isLoggedIn) => {
  return {
    type: IS_STILL_LOGGED_IN,
    isLoggedIn: isLoggedIn,
  };
};

export const logout = () => {
  AsyncStorage.clear();
  return {
    type: LOGOUT,
  };
};

const saveDataToStorage = (token, userId, email, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      email: email,
      expirationDate: expirationDate,
    })
  );
};

export const sendPasswordResetEmail = (email) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyANj-4XGD0qPEJPPZR0OXyEqcNacKaj78E`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: email,
        }),
      }
    );

    dispatch({
      type: SEND_PASSWORD_RESET_EMAIL,
    });
  };
};

export const rememberMeHandler = () => {
  return { type: REMEMBER_ME_HANDLER };
};
