import React from "react";
import { View, Image } from "react-native";

import Colors from "../constants/Colors";

const HeaderBackgroundComponent = () => (
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
        resizeMode: "contain",
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
);

export default HeaderBackgroundComponent;
