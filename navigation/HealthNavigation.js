import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HealthScreen from "../screens/HealthScreen/HealthScreen";

const HealthStack = createStackNavigator();

const HealthNavigation = () => (
  <HealthStack.Navigator>
    <HealthStack.Screen name="CountDown" component={HealthScreen} />
  </HealthStack.Navigator>
);

export default HealthNavigation;
