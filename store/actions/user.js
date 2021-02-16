export const SEND_INFECTED_DATE = "SEND_INFECTED_DATE";
export const FETCH_INFECTED_DATES = "FETCH_INFECTED_DATES";
export const DELETE_INFECTED_DATES = "DELETE_INFECTED_DATES";
export const UPDATE_INFECTED_DATE = "UPDATE_INFECTED_DATE";
export const SET_USER_COUNTRY = "SET_USER_COUNTRY";
export const FETCH_USER_COUNTRY = "FETCH_USER_COUNTRY";
export const DELETE_USER_COUNTRY = "DELETE_USER_COUNTRY";
export const UPDATE_USER_COUNTRY = "UPDATE_USER_COUNTRY";

export const sendInfectedDate = (infectedDate) => {
  return async (disptach, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;

    const response = await fetch(
      `https://cov19stats-8f95e-default-rtdb.firebaseio.com/${userId}/infected-dates.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          infectedDate: infectedDate,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    disptach({
      type: SEND_INFECTED_DATE,
    });
  };
};

export const fetchInfectedDates = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    const response = await fetch(
      `https://cov19stats-8f95e-default-rtdb.firebaseio.com/${userId}/infected-dates.json`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();

    let modifiedInfectedDates = [];
    for (const key in resData) {
      modifiedInfectedDates.push({
        id: key,
        infectedDate: resData[key].infectedDate,
      });
    }

    dispatch({
      type: FETCH_INFECTED_DATES,
      userInfectedDates: modifiedInfectedDates,
    });
  };
};

export const deleteInfectedDate = (id) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const response = await fetch(
      `https://cov19stats-8f95e-default-rtdb.firebaseio.com/${userId}/infected-dates/${id}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({
      type: DELETE_INFECTED_DATES,
    });
  };
};

export const updateInfectedDate = (infectedDate, id) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const response = await fetch(
      `https://cov19stats-8f95e-default-rtdb.firebaseio.com/${userId}/infected-dates/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          infectedDate: infectedDate,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    dispatch({
      type: UPDATE_INFECTED_DATE,
    });
  };
};

export const setUserCountry = (userCountry) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;

    const response = await fetch(
      `https://cov19stats-8f95e-default-rtdb.firebaseio.com/${userId}/user-country.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userCountry: userCountry,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resdData = await response.json();
    return dispatch({
      type: SET_USER_COUNTRY,
    });
  };
};

export const fetchUserCountry = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://cov19stats-8f95e-default-rtdb.firebaseio.com/${userId}/user-country.json`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();

    let modifiedCountry = [];
    for (const key in resData) {
      modifiedCountry.push({
        id: key,
        country: resData[key].userCountry,
      });
    }
    dispatch({
      type: FETCH_USER_COUNTRY,
      userCountry: modifiedCountry,
    });
  };
};

export const deleteUserCountry = (id) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const response = await fetch(
      `https://cov19stats-8f95e-default-rtdb.firebaseio.com/${userId}/user-country/${id}.json?=auth${token}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    dispatch({
      type: DELETE_USER_COUNTRY,
    });
  };
};

export const updateUserCountry = (userCountry, id) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const response = await fetch(
      `https://cov19stats-8f95e-default-rtdb.firebaseio.com/${userId}/user-country/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userCountry: userCountry,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();

    dispatch({
      type: UPDATE_USER_COUNTRY,
    });
  };
};
