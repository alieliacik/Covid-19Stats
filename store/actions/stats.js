export const FETCH_GLOBAL_STATS = "FETCH_GLOBAL_STATS";

export const fetchGlobalData = () => {
  return async (dispatch) => {
    const response = await fetch(
      "http://api.coronatracker.com/v3/stats/worldometer/country"
    );

    if (!response.ok) {
      const message = `An error has occured ${response.status}`;
      throw new Error(message);
    }

    const resData = await response.json();
    const filteredStats = await resData.filter((c) => !!c.countryCode);
    dispatch({
      type: FETCH_GLOBAL_STATS,
      globalStats: filteredStats,
    });
  };
};
