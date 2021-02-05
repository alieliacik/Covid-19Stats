import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HealthScreen from "../screens/HealthScreen/HealthScreen";
import SelfAssessmentScreen from "../screens/HealthScreen/SelfAssessmentScreen";
import HeaderBackgroundComponent from "../components/HeaderBackgroundComponent";

const HealthStack = createStackNavigator();

const HealthNavigation = () => (
  <HealthStack.Navigator>
    <HealthStack.Screen
      name="Health"
      component={HealthScreen}
      options={{
        headerBackground: () => <HeaderBackgroundComponent />,
        headerTintColor: "#fff",
      }}
    />
    <HealthStack.Screen
      name="Self-Assessment"
      component={SelfAssessmentScreen}
      options={{
        headerBackground: () => <HeaderBackgroundComponent />,
        headerTintColor: "#fff",
      }}
    />
  </HealthStack.Navigator>
);

export default HealthNavigation;
