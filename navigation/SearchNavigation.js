import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SearchScreen from "../screens/SearchScreen/SearchScreen";
import HeaderBackgroundComponent from "../components/HeaderBackgroundComponent";

const SearchStack = createStackNavigator();

const SearchNavigaton = (props) => (
  <SearchStack.Navigator
    screenOptions={{
      title: "Search for a country",
      headerTintColor: "#fff",
      headerBackground: () => <HeaderBackgroundComponent />,
    }}
  >
    <SearchStack.Screen
      name="Search"
      component={SearchScreen}
      initialParams={{ isUserCountry: false }}
    />
  </SearchStack.Navigator>
);
export default SearchNavigaton;
