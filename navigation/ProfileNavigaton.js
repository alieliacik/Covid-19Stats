import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";

const ProfileStack = createStackNavigator();

const ProfileNavigaton = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
  </ProfileStack.Navigator>
);

export default ProfileNavigaton;
