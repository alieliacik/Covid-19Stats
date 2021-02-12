import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  ScrollView,
  Alert,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { vw, vh } from "react-native-expo-viewport-units";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";

import Colors from "../../constants/Colors";
import * as authActions from "../../store/actions/auth";

const ProfileScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const [isEmailFocused, setIsEmailFocused] = useState();
  const [isPasswordFocused, setIsPasswordFocused] = useState();
  const [isSigningUp, setIsSigningUp] = useState();

  const authHandler = async (email, password) => {
    let action;
    if (isSigningUp) {
      action = authActions.signUp(email, password);
    } else {
      action = authActions.login(email, password);
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.replace("ProfileLogin");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  let TouchableButton;

  if (Platform.OS === "android") {
    TouchableButton = TouchableNativeFeedback;
  } else {
    TouchableButton = TouchableOpacity;
  }

  const authValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email adress!")
      .required("Email adress is required!"),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters!`)
      .required("Password is required"),
  });

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      onPress={Keyboard.dismiss}
    >
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
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            fullName: "",
          }}
          validationSchema={authValidationSchema}
          onSubmit={(values) => {
            authHandler(values.email, values.password);
          }}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <>
              <View>
                <Text
                  style={[
                    styles.inputText,
                    (isEmailFocused || values.email.length > 0) &&
                      styles.touched,
                  ]}
                >
                  Email
                </Text>
                <View style={styles.textInputContainer}>
                  <MaterialCommunityIcons
                    name="email-edit-outline"
                    size={24}
                    color={Colors.lightBlue}
                  />
                  <TextInput
                    onChangeText={handleChange("email")}
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(false)}
                    value={values.email}
                    style={styles.textInput}
                    placeholderTextColor={Colors.lightBlue}
                    placeholder={
                      isEmailFocused || values.email.length > 0 ? "" : "Email"
                    }
                    keyboardType="email-address"
                  />
                </View>
                {errors.email && (
                  <Text style={styles.inputError}>{errors.email}</Text>
                )}
              </View>
              <View>
                <Text
                  style={[
                    styles.inputText,
                    isPasswordFocused && styles.touched,
                  ]}
                >
                  Password
                </Text>
                <View style={styles.textInputContainer}>
                  <MaterialCommunityIcons
                    name="key"
                    size={24}
                    color={Colors.lightBlue}
                  />
                  <TextInput
                    onChangeText={handleChange("password")}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    value={values.password}
                    placeholderTextColor={Colors.lightBlue}
                    placeholder={
                      isPasswordFocused || values.password.length > 0
                        ? ""
                        : "Password"
                    }
                    style={styles.textInput}
                    secureTextEntry
                  />
                </View>

                {errors.password && (
                  <Text style={styles.inputError}>{errors.password}</Text>
                )}
              </View>
              <TouchableButton onPress={handleSubmit} title="Submit">
                <View style={[styles.btn, { marginTop: 15 }]}>
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.btnText}>
                      {isSigningUp ? "Sign Up" : "Log In"}
                    </Text>
                  )}
                </View>
              </TouchableButton>
              {!isSigningUp && (
                <TouchableOpacity onPress={handleSubmit}>
                  <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
              )}

              <View style={styles.hr} />
              <TouchableButton
                onPress={() => {
                  setIsSigningUp((prevstate) => !prevstate);
                }}
              >
                <View
                  style={[
                    styles.btn,
                    { backgroundColor: Colors.green, width: vw(50) },
                  ]}
                >
                  <Text style={styles.btnText}>
                    {isSigningUp
                      ? "Alreay have an account?"
                      : "Create New Account"}
                  </Text>
                </View>
              </TouchableButton>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", flex: 1, minHeight: vh(100) },
  headerContainer: {
    overflow: "hidden",
  },
  header: {
    height: vh(25),
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
    marginTop: 30,
    alignItems: "center",
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: Colors.lightBlue,
    borderBottomWidth: 1,
    width: vw(75),
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
    opacity: 0,
  },
  touched: { opacity: 1 },
  placeholderStyle: {
    color: Colors.lightBlue,
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
  inputError: {
    fontSize: 11,
    color: "#C0CCDA",
    textAlign: "right",
  },
});
