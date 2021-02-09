import React, { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { NavigationContainer } from "@react-navigation/native";

import TabNavigation from "./navigation/TabNavigation";
import statsReducer from "./store/reducers/stats";
import authReducer from "./store/reducers/auth";
import userReducer from "./store/reducers/user";

export default function App() {
  let [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-semibold": require("./assets/fonts/OpenSans-Semibold.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  const rootReducer = combineReducers({
    stats: statsReducer,
    auth: authReducer,
    user: userReducer,
  });
  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </Provider>
  );
}
