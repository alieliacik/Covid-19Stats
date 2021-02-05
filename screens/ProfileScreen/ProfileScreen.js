import React from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import Colors from "../../constants/Colors";
import { vw, vh } from "react-native-expo-viewport-units";
import { LinearGradient } from "expo-linear-gradient";

const ProfileScreen = (props) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          overflow: "hidden",
        }}
      >
        <ImageBackground
          style={styles.header}
          source={require("../../assets/worldmap.png")}
        >
          <LinearGradient
            colors={["#273B57", "#24C6DC"]}
            start={[1, 0.5]}
            end={[1.0, 0.5]}
            locations={[0.0, 1.0]}
            style={styles.linearGradient}
          />
          <Text style={styles.headerText}>Welcome</Text>
        </ImageBackground>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", flex: 1 },
  header: {
    height: vh(35),
    position: "relative",
  },
  headerText: {
    color: "#fff",
    fontSize: 25,
    fontFamily: "open-sans-semibold",
    position: "absolute",
    left: 40,
    top: 130,
  },
  linearGradient: {
    width: "100%",
    height: "100%",
    opacity: 0.8,
    borderRadius: 10,
  },
});
