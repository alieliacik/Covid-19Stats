export const FETCH_COUNTRY_TOTAL_STATS = "FETCH_COUNTRY_TOTAL_STATS";
export const FETCH_GLOBAL_STATS = "FETCH_GLOBAL_STATS";
export const FETCH_COUNTRY_DAILY_STATS = "FETCH_COUNTRY_DAILY_STATS";
export const FETCH_NEWS = "FETCH_NEWS";

import moment from "moment";

const numberWithComas = (num) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const fetchCountryTotalStats = () => {
  return async (dispatch) => {
    const response = await fetch(
      "http://api.coronatracker.com/v3/stats/worldometer/country"
    );

    if (!response.ok) {
      const message = `An error has occured ${response.status}`;
      throw new Error(message);
    }

    const resData = await response.json();

    const addCommaToNumbersHandler = await resData.map((c) => {
      for (const key in c) {
        if (typeof c[key] === "number") {
          c[key] = numberWithComas(c[key]);
        }
      }
      return c;
    });

    const filteredStats = await addCommaToNumbersHandler.filter(
      (c) => !!c.countryCode
    );

    dispatch({
      type: FETCH_COUNTRY_TOTAL_STATS,
      countryTotals: filteredStats,
    });
  };
};

export const fetchGlobalStats = () => {
  return async (dispatch) => {
    const response = await fetch(
      "http://api.coronatracker.com/v3/stats/worldometer/global"
    );

    if (!response.ok) {
      const message = `An error occured ${response.status}`;
      throw new Error(message);
    }

    const resData = await response.json();

    for (const key in resData) {
      if (typeof resData[key] === "number") {
        resData[key] = numberWithComas(resData[key]);
      }
    }

    dispatch({
      type: FETCH_GLOBAL_STATS,
      globalStats: resData,
    });
  };
};

export const fetchCountryDailyStats = (countryCode) => {
  return async (dispatch) => {
    const currentDate = moment(new Date()).format("YYYY-MM-DD");
    const response = await fetch(
      `http://api.coronatracker.com/v5/analytics/newcases/country?countryCode=${countryCode}&startDate=2020-04-01&endDate=${currentDate}`
    );
    if (!response.ok) {
      const message = `An error ocurred ${response.status}`;
      throw new Error(message);
    }

    const resData = await response.json();

    const addCommaToNumbersHandler = await resData.map((c) => {
      for (const key in c) {
        if (typeof c[key] === "number") {
          c[key] = numberWithComas(c[key]);
        }
        if (key === "last_updated") {
          c[key] = moment(c[key]).add(1, "d").format("DD-MM-YYYY");
        }
      }
      return c;
    });

    const lastThirtyDaysStats = await addCommaToNumbersHandler.slice(
      resData.length - 30
    );
    const lastThirtyDaysStatsReversed = await lastThirtyDaysStats.reverse();
    const allStats = await addCommaToNumbersHandler;

    dispatch({
      type: FETCH_COUNTRY_DAILY_STATS,
      lastThirtyDaysStats: lastThirtyDaysStatsReversed,
      allStats: allStats,
    });
  };
};

export const fetchNews = (countryCode) => {
  return async (dispatch) => {
    const response = await fetch("http://api.coronatracker.com/news/trending");

    const resData = await response.json();

    dispatch({
      type: FETCH_NEWS,
      allNews: resData,
    });
  };
};
