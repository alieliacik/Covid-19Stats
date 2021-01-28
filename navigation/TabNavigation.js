import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeNavigation from "./HomeNavigation";
import SearchNavigation from "./SearchNavigation";
import Colors from "../constants/Colors";

const TabStack = createMaterialBottomTabNavigator();

const TabNavigaton = () => (
  <TabStack.Navigator
    sceneAnimationEnabled={true}
    initialRouteName="Home"
    shifting={true}
    screenOptions={{
      headerTintColor: Platform.OS === "android" ? "#fff" : "black",
      headerStyle: {
        backgroundColor:
          Platform.OS === "android" ? Colors.backgroundBlue : "#fff",
      },
    }}
    activeColor="black"
    barStyle={{
      backgroundColor: "#fff",
      borderTopWidth: 1,
      borderColor: "#eee",
      borderStyle: "solid",
    }}
  >
    <TabStack.Screen
      options={{
        tabBarIcon: () => (
          <MaterialCommunityIcons name="virus" size={26} color="#EB5569" />
        ),
      }}
      name="Home"
      component={HomeNavigation}
    />
    <TabStack.Screen
      name="Search"
      component={SearchNavigation}
      options={{
        tabBarIcon: () => (
          <MaterialCommunityIcons
            name="magnify"
            size={26}
            color={Colors.bottomTabGray}
          />
        ),
      }}
    />
  </TabStack.Navigator>
);
export default TabNavigaton;
