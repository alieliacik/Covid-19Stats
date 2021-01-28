import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SearchScreen from "../screens/SearchScreen";
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
    <SearchStack.Screen name="Search" component={SearchScreen} />
  </SearchStack.Navigator>
);
export default SearchNavigaton;
