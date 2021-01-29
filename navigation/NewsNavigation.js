import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import News from "../screens/NewsScreen";

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
  </NewsStack.Navigator>
);

export default NewsNavigation;

// 33143b4637994411b198d7ee4f5e7a0c
