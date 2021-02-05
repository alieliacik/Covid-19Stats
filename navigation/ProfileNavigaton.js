import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import HeaderBackgroundComponent from "../components/HeaderBackgroundComponent";

const ProfileStack = createStackNavigator();

const ProfileNavigaton = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
  </ProfileStack.Navigator>
);

export default ProfileNavigaton;
