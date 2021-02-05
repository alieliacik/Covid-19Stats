import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HealthScreen from "../screens/HealthScreen/HealthScreen";
import SelfAssessmentScreen from "../screens/HealthScreen/SelfAssessmentScreen";

const HealthStack = createStackNavigator();

const HealthNavigation = () => (
  <HealthStack.Navigator>
    <HealthStack.Screen name="CountDown" component={HealthScreen} />
    <HealthStack.Screen
      name="Self-Assessment"
      component={SelfAssessmentScreen}
    />
  </HealthStack.Navigator>
);

export default HealthNavigation;
