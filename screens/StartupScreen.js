import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Alert,
} from "react-native";
import { vh } from "react-native-expo-viewport-units";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import * as authActions from "../store/actions/auth";
import * as permissionActions from "../store/actions/permission";

const StartUpScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getLocationHandler = async () => {
      let { status } = await Location.requestPermissionsAsync(
        Permissions.LOCATION
      );
      const isLocationEnabled = await Location.hasServicesEnabledAsync();

      if (status !== "granted") {
        if (!isLocationEnabled) {
          Alert.alert(
            "Location services are disabled!",
            "Please change location settings!",
            [{ text: "Okay" }]
          );
          props.navigation.navigate("Global");
        } else {
          Alert.alert(
            "Permission to access location was denied!",
            "Please change permission settings!",
            [{ text: "Okay" }]
          );
        }

        return;
      }

      try {
        await dispatch(permissionActions.getLocation());
      } catch (error) {
        console.log(error);
      }
    };
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        dispatch(authActions.isStillLoggenIn(false));
        return;
      }

      const transformedData = JSON.parse(userData);
      const { userId, token, email, expirationDate } = transformedData;

      if (
        Number(expirationDate) <= new Date().getTime() ||
        !token ||
        !userId ||
        !email
      ) {
        dispatch(authActions.isStillLoggenIn(false));
        return;
      }

      dispatch(authActions.authenticate(userId, token, email));
      dispatch(authActions.isStillLoggenIn(true));
    };
    tryLogin();
    getLocationHandler();
  }, []);

  return (
    <ImageBackground
      style={styles.imageBackground}
      source={require("../assets/startUpScreen.png")}
    >
      <ActivityIndicator size="large" color="#fff" />
    </ImageBackground>
  );
};

export default StartUpScreen;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: vh(35),
  },
});
