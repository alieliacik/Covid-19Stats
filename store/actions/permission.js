export const GET_LOCATION = "GET_LOCATION";

import { Alert } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export const getLocation = () => {
  return async (dispatch) => {
    let location = await Location.getCurrentPositionAsync({});

    const latAndLong = {
      latitude: Number(location.coords.latitude),
      longitude: Number(location.coords.longitude),
    };

    const currCountryIsoCode = await Location.reverseGeocodeAsync(
      latAndLong
    ).then((res) => res[0].isoCountryCode);
    dispatch({
      type: GET_LOCATION,
      userLocation: currCountryIsoCode,
    });
  };
};
