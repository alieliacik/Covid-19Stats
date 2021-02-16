import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";
import Colors from "../../constants/Colors";

import * as authActions from "../../store/actions/auth";

const ProfileStartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("Profile");
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
        props.navigation.navigate("Profile");
        return;
      }

      dispatch(authActions.authenticate(userId, token, email));
      props.navigation.navigate("ProfileLogin");
    };
    tryLogin();
  }, [dispatch]);
  return <ActivityIndicator size="large" color={Colors.backgroundBlue} />;
};

export default ProfileStartupScreen;
