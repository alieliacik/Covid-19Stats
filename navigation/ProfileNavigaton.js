import React from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import Profile from "../screens/ProfileScreen/Profile";

const ProfileStack = createStackNavigator();

const ProfileNavigaton = () => {
  const userEmail = useSelector((state) => state.auth.email);
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen
        name="ProfileLogin"
        component={Profile}
        options={{
          headerTitle: userEmail,
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigaton;
