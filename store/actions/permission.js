export const GET_LOCATION = 'GET_LOCATION'

import { Alert } from 'react-native'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

export const getLocation = (isLocationIconTouched) => {
  console.log('asd')
  return async (dispatch) => {
    let { status } = await Location.requestPermissionsAsync(
      Permissions.LOCATION
    )
    const isLocationEnabled = await Location.hasServicesEnabledAsync()

    if (status !== 'granted' && isLocationIconTouched) {
      if (!isLocationEnabled) {
        Alert.alert(
          'Location services are disabled!',
          'Please change location settings!',
          [{ text: 'Okay' }]
        )
      } else {
        Alert.alert(
          'Permission to access location was denied!',
          'Please change permission settings!',
          [{ text: 'Okay' }]
        )
      }
      return
    }

    let location = await Location.getCurrentPositionAsync({})

    const latAndLong = {
      latitude: Number(location.coords.latitude),
      longitude: Number(location.coords.longitude),
    }

    const currCountryIsoCode = await Location.reverseGeocodeAsync(latAndLong)

    const resData = await currCountryIsoCode[0].isoCountryCode

    dispatch({
      type: GET_LOCATION,
      userLocation: resData,
    })
  }
}
