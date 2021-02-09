export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

export const signUp = (email, password) => {
  return async (dispatch) => {
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
    dispatch({
      type: SIGNUP,
      userId: resData.localId,
      token: resData.idToken,
      email: resData.email,
    });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
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

    dispatch({
      type: LOGIN,
      userId: resData.localId,
      token: resData.idToken,
      email: resData.email,
    });
  };
};
