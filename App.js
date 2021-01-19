import React, { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import MainNavigation from "./navigation/MainNavigation";
import globalReducer from "./store/reducers/stats";

export default function App() {
  let [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-semibold": require("./assets/fonts/OpenSans-Semibold.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  const rootReducer = combineReducers({
    global: globalReducer,
  });
  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}
