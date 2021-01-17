import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GlobalScreen from "../screens/GlobalScreen";
import MyCountryScreen from "../screens/MyCountryScreen";
import { StatusBar } from "expo-status-bar";

const MainStack = createStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen
          name="Global"
          component={GlobalScreen}
          options={{
            title: "Global Stats",
          }}
        />
        <MainStack.Screen name="MyCountry" component={MyCountryScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
