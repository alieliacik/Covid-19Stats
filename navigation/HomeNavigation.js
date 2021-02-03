import React from "react";
import { Platform, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import GlobalScreen from "../screens/GlobalScreen/GlobalScreen";
import CountryScreen from "../screens/CountryScreen/CountryScreen";
import Colors from "../constants/Colors";
import HeaderBackgroundComponent from "../components/HeaderBackgroundComponent";

const HomeStack = createStackNavigator();

const HomeNavigation = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        title: "Global Stats",
        headerTintColor: Platform.OS === "android" ? "#fff" : "black",
        headerStyle: {
          backgroundColor:
            Platform.OS === "android" ? Colors.backgroundBlue : "#fff",
        },
      }}
    >
      <HomeStack.Screen
        name="Global"
        component={GlobalScreen}
        options={{
          headerTitleStyle: {
            color: "#fff",
          },
          headerBackground: () => <HeaderBackgroundComponent />,
        }}
      />
      <HomeStack.Screen
        name="MyCountry"
        component={CountryScreen}
        options={({ route }) => ({
          title: route.params.selectedCountry.countryName,
        })}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigation;
