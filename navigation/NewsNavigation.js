import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import News from "../screens/NewsScreen/NewsScreen";
import SelectedNews from "../screens/NewsScreen/SelectedNews";
import HeaderBackgroundComponent from "../components/HeaderBackgroundComponent";

const NewsStack = createStackNavigator();

const NewsNavigation = () => (
  <NewsStack.Navigator>
    <NewsStack.Screen
      name="NewsList"
      component={News}
      options={{
        title: "News",
        headerBackground: () => <HeaderBackgroundComponent />,
        headerTintColor: "#fff",
      }}
    />
    <NewsStack.Screen
      name="SelectedNews"
      component={SelectedNews}
      options={{
        title: "News",
        headerBackground: () => <HeaderBackgroundComponent />,
        headerTintColor: "#fff",
      }}
    />
  </NewsStack.Navigator>
);

export default NewsNavigation;
