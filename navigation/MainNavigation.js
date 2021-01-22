import React from "react";
import { Image, Platform, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GlobalScreen from "../screens/GlobalScreen";
import MyCountryScreen from "../screens/MyCountryScreen";
import { StatusBar } from "expo-status-bar";
import Colors from "../constants/Colors";

const MainStack = createStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={{
          title: "Global Stats",
          headerTintColor: Platform.OS === "android" ? "#fff" : "black",
          headerStyle: {
            backgroundColor:
              Platform.OS === "android" ? Colors.backgroundBlue : "#fff",
          },
        }}
      >
        <MainStack.Screen
          name="Global"
          component={GlobalScreen}
          options={{
            headerTitleStyle: {
              color: "#fff",
            },
            headerBackground: () => (
              <View
                style={{
                  flex: 1,
                  backgroundColor: Colors.backgroundBlue,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Image
                  style={{
                    position: "absolute",
                    right: "5%",
                    top: 30,
                    opacity: 0.8,
                  }}
                  source={require("../assets/Virus.png")}
                />
                <View
                  style={{
                    flex: 1,
                    width: 40,
                    height: 40,
                    position: "absolute",
                    left: "52%",
                    top: 25,
                  }}
                >
                  <Image
                    style={{
                      resizeMode: "contain",
                      width: "100%",
                      height: "100%",
                      opacity: 0.6,
                    }}
                    source={require("../assets/Virus.png")}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    width: 60,
                    height: 60,
                    position: "absolute",
                    left: "5%",
                    top: 35,
                  }}
                >
                  <Image
                    style={{
                      resizeMode: "contain",
                      width: "100%",
                      height: "100%",
                      opacity: 0.6,
                    }}
                    source={require("../assets/Virus.png")}
                  />
                </View>
              </View>
            ),
          }}
        />
        <MainStack.Screen
          name="MyCountry"
          component={MyCountryScreen}
          options={({ route }) => ({
            title: route.params.selectedCountry.countryName,
            headerTitleStyle: {
              display: "none",
            },
          })}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
