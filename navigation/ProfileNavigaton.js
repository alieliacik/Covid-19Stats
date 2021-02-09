import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import Profile from "../screens/ProfileScreen/Profile";

const ProfileStack = createStackNavigator();

const ProfileNavigaton = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    <ProfileStack.Screen name="ProfileLogin" component={Profile} />
  </ProfileStack.Navigator>
);

export default ProfileNavigaton;
