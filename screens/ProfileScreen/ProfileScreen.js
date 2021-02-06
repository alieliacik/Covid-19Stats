import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { vw, vh } from "react-native-expo-viewport-units";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

const ProfileScreen = (props) => {
  const [email, setEmail] = useState("");
  let TouchableButton;

  if (Platform.OS === "android") {
    TouchableButton = TouchableNativeFeedback;
  } else {
    TouchableButton = TouchableOpacity;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.header}
          source={require("../../assets/worldmap.png")}
        >
          <LinearGradient
            colors={[Colors.backgroundBlue, "#24C6DC"]}
            start={[0.3, 0.6]}
            end={[0.9, 1]}
            style={styles.linearGradient}
          />
          <Text style={styles.headerText}>Welcome</Text>
        </ImageBackground>
      </View>
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.inputText}>Email</Text>
          <View style={styles.textInputContainer}>
            <MaterialCommunityIcons
              name="email-edit-outline"
              size={24}
              color={Colors.lightBlue}
            />
            <TextInput
              placeholderStyle={styles.placeholder}
              placeholder="Email"
              style={styles.textInput}
              value={email}
              onChangeText={() => setEmail(text)}
            />
          </View>
        </View>
        <View>
          <Text style={styles.inputText}>Password</Text>
          <View style={styles.textInputContainer}>
            <MaterialCommunityIcons
              name="key"
              size={24}
              color={Colors.lightBlue}
            />
            <TextInput
              placeholderStyle={styles.placeholder}
              placeholder="Password"
              style={styles.textInput}
            />
          </View>
        </View>

        <TouchableButton>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Log In</Text>
          </View>
        </TouchableButton>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <View style={styles.hr} />
        <TouchableButton>
          <View
            style={[
              styles.btn,
              { backgroundColor: Colors.green, width: vw(50) },
            ]}
          >
            <Text style={styles.btnText}>Create New Account</Text>
          </View>
        </TouchableButton>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", flex: 1 },
  headerContainer: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    overflow: "hidden",
  },
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
    top: "40%",
  },
  linearGradient: {
    width: "100%",
    height: "100%",
    opacity: 0.8,
    borderRadius: 10,
  },
  contentContainer: {
    paddingHorizontal: 16,
    marginTop: 30,
    alignItems: "center",
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: Colors.lightBlue,
    borderBottomWidth: 1,
    width: vw(75),
    marginBottom: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: "open-sans",
    marginLeft: 25,
  },

  inputText: {
    fontSize: 12,
    fontFamily: "open-sans",
    color: Colors.lightBlue,
    marginTop: 15,
  },
  btn: {
    backgroundColor: Colors.blue,
    borderRadius: 8,
    paddingVertical: 12,
    overflow: "hidden",
    width: vw(75),
  },
  btnText: {
    textAlign: "center",
    fontFamily: "open-sans-bold",
    color: "#fff",
    fontSize: 16,
  },
  forgotPassword: {
    fontFamily: "open-sans-semibold",
    color: Colors.blue,
    fontSize: 14,
    marginTop: 16,
  },
  hr: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lightBlue,
    width: vw(75),
    marginVertical: 20,
  },
});
