export const SEND_INFECTED_DATE = "SEND_INFECTED_DATE";
export const FETCH_INFECTED_DATES = "FETCH_INFECTED_DATES";
export const DELETE_INFECTED_DATES = "DELETE_INFECTED_DATES";
export const UPDATE_INFECTED_DATE = "UPDATE_INFECTED_DATE";

export const sendInfectedDate = (infectedDate) => {
  return async (disptach, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const response = await fetch(
      `https://cov19stats-8f95e-default-rtdb.firebaseio.com/infected-dates/${userId}.json?auth=${token}`,
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
      const errorResData = await response.json();
      throw new Error(errorResData);
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
      `https://cov19stats-8f95e-default-rtdb.firebaseio.com/infected-dates/${userId}/.json`
    );

    if (!response.ok) {
      const errorResData = response.json();
    }

    const resData = await response.json();
    dispatch({
      type: FETCH_INFECTED_DATES,
      userInfectedDates: resData,
    });
  };
};

export const deleteInfectedDate = (id) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const response = await fetch(
      `https://cov19stats-8f95e-default-rtdb.firebaseio.com/infected-dates/${userId}/${id}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );
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
      `https://cov19stats-8f95e-default-rtdb.firebaseio.com/infected-dates/${userId}/${id}.json?auth=${token}`,
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

    const resData = await response.json();
    dispatch({
      type: UPDATE_INFECTED_DATE,
    });
  };
};
