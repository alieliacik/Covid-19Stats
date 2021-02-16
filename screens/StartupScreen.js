import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ActivityIndicator, ImageBackground, StyleSheet } from "react-native";
import { vh } from "react-native-expo-viewport-units";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as authActions from "../store/actions/auth";

const StartUpScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
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
