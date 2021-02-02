import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import News from "../screens/NewsScreen/NewsScreen";
import SelectedNews from "../screens/NewsScreen/SelectedNews";

const NewsStack = createStackNavigator();

const NewsNavigation = () => (
  <NewsStack.Navigator>
    <NewsStack.Screen
      name="NewsList"
      component={News}
      options={{
        title: "News",
      }}
    />
    <NewsStack.Screen
      name="SelectedNews"
      component={SelectedNews}
      options={{ title: "News" }}
    />
  </NewsStack.Navigator>
);

export default NewsNavigation;
