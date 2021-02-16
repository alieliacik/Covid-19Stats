import React from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import Profile from "../screens/ProfileScreen/Profile";
import SelectMyCountry from "../screens/ProfileScreen/SelectMyCountry";
const ProfileStack = createStackNavigator();

const ProfileNavigaton = () => {
  const userEmail = useSelector((state) => state.auth.email);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn) {
    return (
      <ProfileStack.Navigator>
        <ProfileStack.Screen
          name="ProfileLogin"
          component={Profile}
          options={{
            headerTitle: userEmail,
          }}
        />
        <ProfileStack.Screen name="Profile" component={ProfileScreen} />
        <ProfileStack.Screen
          name="SelectMyCountry"
          component={SelectMyCountry}
        />
      </ProfileStack.Navigator>
    );
  }

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
      <ProfileStack.Screen name="SelectMyCountry" component={SelectMyCountry} />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigaton;
