import React, { useEffect, useState } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MainNavigation from "./navigation/MainNavigation";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

export default function App() {
  let [fontsLoaded] = useFonts({
    "open-sans-bold": require("./assets/fonts//OpenSans-Bold.ttf"),
    "open-sans": require("./assets/fonts//OpenSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return <MainNavigation />;
}
