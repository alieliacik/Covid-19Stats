import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";

import HomeNavigation from "./HomeNavigation";
import SearchNavigation from "./SearchNavigation";
import Colors from "../constants/Colors";
import NewsNavigation from "./NewsNavigation";
import HealthNavigation from "./HealthNavigation";
import ProfileNavigaton from "./ProfileNavigaton";

const TabStack = createMaterialBottomTabNavigator();

const TabNavigaton = () => (
  <TabStack.Navigator
    sceneAnimationEnabled={true}
    initialRouteName="Home"
    shifting={true}
    inactiveColor={Colors.bottomTabGray}
    screenOptions={{
      headerTintColor: Platform.OS === "android" ? "#fff" : "black",
      headerStyle: {
        backgroundColor:
          Platform.OS === "android" ? Colors.backgroundBlue : "#fff",
      },
      indicatorStyle: {
        backgroundColor: "red",
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
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="virus" size={26} color={color} />
        ),
      }}
      name="Home"
      component={HomeNavigation}
    />
    <TabStack.Screen
      name="News"
      component={NewsNavigation}
      options={{
        tabBarIcon: ({ color = Colors.blue }) => (
          <Ionicons name="globe" size={25} color={color} />
        ),
      }}
    />
    <TabStack.Screen
      name="Search"
      component={SearchNavigation}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="magnify" size={26} color={color} />
        ),
      }}
    />
    <TabStack.Screen
      name="Health"
      component={HealthNavigation}
      options={{
        tabBarIcon: ({ color }) => (
          <FontAwesome name="heartbeat" size={24} color={color} />
        ),
      }}
    />
    <TabStack.Screen
      name="Profile"
      component={ProfileNavigaton}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name="person-circle-outline" size={26} color={color} />
        ),
      }}
    />
  </TabStack.Navigator>
);
export default TabNavigaton;
