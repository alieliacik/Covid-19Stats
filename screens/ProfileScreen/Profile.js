import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";
import ProgressCircle from "react-native-progress-circle";
import { vw } from "react-native-expo-viewport-units";

import * as userActions from "../../store/actions/user";
import * as authActions from "../../store/actions/auth";
import Colors from "../../constants/Colors";

const Profile = (props) => {
  const dispatch = useDispatch();
  const userInfectedDates = useSelector(
    (state) => state.user.userInfectedDates
  );
  const userCountry = useSelector((state) => state.user.userCountry);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState();

  const infectedDateHandler = async (date) => {
    const currentDate = new Date().getTime();
    if (currentDate < date) {
      Alert.alert(
        "A date in the future has been selected!",
        "Please change it",
        [
          {
            text: "Okay",
          },
        ]
      );
      if (Platform.OS === "android") {
        hideDatePicker();
      }
    } else if (currentDate - date > 1209600000) {
      Alert.alert(
        "A date older than 14 days has been selected!",
        "Please change it",
        [
          {
            text: "Okay",
          },
        ]
      );
      if (Platform.OS === "android") {
        hideDatePicker();
      }
    } else {
      if (Platform.OS === "ios") {
        setDate(date);
      }
      hideDatePicker();
      setError(null);
      try {
        if (Platform.OS === "android") {
          setDate(date);
        }
        isUpdating
          ? await dispatch(userActions.updateInfectedDate(date, selectedItemId))
          : await dispatch(userActions.sendInfectedDate(date));
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const fetchInfectedDatesHandler = async () => {
    setError(null);
    try {
      await dispatch(userActions.fetchInfectedDates());
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteInfectedDateHandler = async (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this date?", [
      { text: "No" },
      {
        text: "Yes",
        onPress: async () => {
          setError(null);
          try {
            await dispatch(userActions.deleteInfectedDate(id));
            setDate(new Date());
          } catch (error) {
            setError(error.mesage);
          }
        },
      },
    ]);
  };

  const deleteUserCountryHandler = async (id) => {
    Alert.alert(
      "Are you sure?",
      "Do you realy want to delete your selected country?",
      [
        { text: "No" },
        {
          text: "Yes",
          onPress: async () => {
            setError(null);
            try {
              await dispatch(userActions.deleteUserCountry(id));
              setDate(new Date());
            } catch (error) {
              setError(error.message);
            }
          },
        },
      ]
    );
  };

  const fetchUserCountryHandler = async () => {
    await dispatch(userActions.fetchUserCountry());
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      fetchInfectedDatesHandler()
        .then(() => fetchUserCountryHandler())
        .then(() => setIsLoading(false));
    }, [date])
  );

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  let TouchableButton;

  if (Platform.OS === "android") {
    TouchableButton = TouchableNativeFeedback;
  } else {
    TouchableButton = TouchableOpacity;
  }

  let selfIsolationProgress = 0;
  let daysToGo = "No countdown found!";
  if (userInfectedDates.length > 0) {
    const currentDate = new Date().getTime();
    const selectedDate = new Date(userInfectedDates[0].infectedDate).getTime();
    selfIsolationProgress = ((currentDate - selectedDate) / 1209600000) * 100;

    daysToGo = 14 - Math.floor((currentDate - selectedDate) / 86400000);
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", paddingVertical: 90 }}>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.progressCircle}>
          <ProgressCircle
            percent={userInfectedDates.length > 0 ? selfIsolationProgress : 0}
            radius={100}
            borderWidth={12}
            shadowColor={Colors.lightGray}
            color={Colors.green}
            bgColor="#fff"
            outerCircleStyle={{ marginVertical: 15 }}
          >
            <Text
              style={[
                styles.progressCircleText,
                daysToGo > 0 && styles.daysToGo,
              ]}
            >
              {daysToGo}
            </Text>
          </ProgressCircle>
          {daysToGo > 0 && (
            <Text style={styles.progressBarBottomText}>Days to go</Text>
          )}
        </View>
        {daysToGo > 0 ? (
          <View style={styles.buttonNarrowContentContainer}>
            <View style={styles.buttonNarrowContainer}>
              <TouchableButton
                onPress={() => {
                  setSelectedItemId(userInfectedDates[0].id);
                  showDatePicker();
                  setIsUpdating(true);
                }}
              >
                <View style={styles.buttonNarrow}>
                  <MaterialCommunityIcons
                    name="calendar-edit"
                    size={20}
                    color="#fff"
                  />
                  <Text style={styles.buttonNarrowText}>Edit</Text>
                </View>
              </TouchableButton>
            </View>
            <View style={styles.buttonNarrowContainer}>
              <TouchableButton
                onPress={() =>
                  deleteInfectedDateHandler(userInfectedDates[0].id)
                }
              >
                <View style={[styles.buttonNarrow, { backgroundColor: "red" }]}>
                  <MaterialCommunityIcons
                    name="delete-empty"
                    size={22}
                    color="#fff"
                  />
                  <Text style={styles.buttonNarrowText}>Delete</Text>
                </View>
              </TouchableButton>
            </View>
          </View>
        ) : (
          <View style={styles.buttonWideContainer}>
            <TouchableButton
              onPress={() => {
                setIsUpdating(false);
                showDatePicker();
              }}
            >
              <View style={styles.buttonWide}>
                <MaterialCommunityIcons
                  name="calendar"
                  size={22}
                  color="#fff"
                />
                <Text style={styles.buttonWideText}>
                  Set up a self-isolaton coundown
                </Text>
              </View>
            </TouchableButton>
          </View>
        )}

        <View style={styles.hr}></View>
        {userCountry.length <= 0 ? (
          <View style={styles.buttonWideContainer}>
            <TouchableButton
              onPress={() => {
                props.navigation.navigate("SelectMyCountry", {
                  isUpdatingCountry: false,
                });
              }}
            >
              <View style={styles.buttonWide}>
                <FontAwesome5 name="globe-americas" size={18} color="#fff" />
                <Text style={styles.buttonWideText}>Select your country</Text>
              </View>
            </TouchableButton>
          </View>
        ) : (
          <View style={styles.myCountryContainer}>
            <Text style={styles.contentHeader}>My Country</Text>
            <View style={styles.myCountryContentContainer}>
              <Text style={styles.myCountryText}>{userCountry[0].country}</Text>
              <View style={styles.myCountryIconContainer}>
                <Entypo
                  name="edit"
                  size={17}
                  color="#fff"
                  onPress={() =>
                    props.navigation.navigate("SelectMyCountry", {
                      isUpdatingCountry: true,
                      id: userCountry[0].id,
                    })
                  }
                />
              </View>
              <View
                style={[
                  styles.myCountryIconContainer,
                  { backgroundColor: Colors.red },
                ]}
              >
                <Entypo
                  name="cross"
                  size={25}
                  color="#fff"
                  onPress={() => deleteUserCountryHandler(userCountry[0].id)}
                />
              </View>
            </View>
          </View>
        )}
        <View style={styles.hr}></View>
        <View
          style={{
            alignSelf: "stretch",
            justifyContent: "center",
            borderRadius: 10,
            margin: 10,
            overflow: "hidden",
          }}
        >
          <View style={styles.logoutButtonContainer}>
            <TouchableButton
              onPress={() => {
                dispatch(authActions.logout());
                props.navigation.replace("Profile");
              }}
            >
              <View style={styles.logoutButton}>
                <MaterialCommunityIcons name="logout" size={18} color="black" />
                <Text style={[styles.buttonWideText, { color: "black" }]}>
                  Log Out
                </Text>
              </View>
            </TouchableButton>
          </View>
        </View>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={infectedDateHandler}
        onCancel={hideDatePicker}
      />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  buttonWideContainer: {
    borderRadius: 8,
    overflow: "hidden",
    width: vw(90),
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  buttonWide: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.green,
    paddingVertical: 9,
  },
  buttonWideText: {
    textAlign: "center",
    fontFamily: "open-sans-semibold",
    color: "#fff",
    fontSize: 15,
    marginLeft: 10,
  },
  progressCircle: {
    alignItems: "center",
  },
  progressCircleText: {
    textAlign: "center",
    fontFamily: "open-sans-semibold",
    fontSize: 18,
    paddingHorizontal: 20,
  },
  daysToGo: {
    color: Colors.blue,
    fontFamily: "open-sans-bold",
    fontSize: 70,
  },
  progressBarBottomText: {
    fontFamily: "open-sans-bold",
    marginBottom: 30,
    fontSize: 16,
  },
  buttonNarrowContentContainer: {
    width: vw(90),
    marginRight: "auto",
    marginLeft: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonNarrowContainer: {
    width: vw(35),
    borderRadius: 5,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  buttonNarrow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.blue,
    paddingVertical: 7,
  },
  buttonNarrowText: {
    color: "#fff",
    fontFamily: "open-sans-semibold",
    fontSize: 16,
    marginLeft: 7,
  },
  hr: {
    height: 2,
    width: vw(90),
    backgroundColor: "#E5E9F2",
    marginRight: "auto",
    marginLeft: "auto",
    marginVertical: 15,
  },
  myCountryContainer: {
    width: vw(90),
    marginLeft: "auto",
    marginRight: "auto",
  },
  contentHeader: {
    fontFamily: "open-sans-semibold",
    fontSize: 16,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "black",
    marginBottom: 5,
  },
  myCountryContentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  myCountryText: {
    marginRight: "auto",
    fontFamily: "open-sans",
    fontSize: 16,
  },
  myCountryIconContainer: {
    backgroundColor: Colors.blue,
    opacity: 0.9,
    borderRadius: 5,
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  logoutButtonContainer: {
    width: vw(70),
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 35,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 9,
    backgroundColor: "#fff",
  },
});
