import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

const HealthStack = createStackNavigator();

const HelathNavigator = () => (
  <HealthStack.Navigator>
    <HealthStack.Screen name="CountDown" component={HealthScreen} />
  </HealthStack.Navigator>
);
