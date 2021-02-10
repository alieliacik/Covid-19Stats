import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import ProgressCircle from "react-native-progress-circle";

import * as userActions from "../../store/actions/user";
import Colors from "../../constants/Colors";
import { vw } from "react-native-expo-viewport-units";

const Profile = () => {
  const dispatch = useDispatch();
  const userInfectedDates = useSelector((state) => {
    let infectedDates = state.user.userInfectedDates;
    let modifiedInfectedDates = [];
    for (const key in infectedDates) {
      modifiedInfectedDates.push({
        id: key,
        infectedDate: infectedDates[key].infectedDate,
      });
    }
    return modifiedInfectedDates;
  });

  const [isLoading, setIsLoading] = useState();
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
      setDate(date);
      hideDatePicker();
      setError(null);
      try {
        isUpdating
          ? await dispatch(userActions.updateInfectedDate(date, selectedItemId))
          : await dispatch(userActions.sendInfectedDate(date));
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const fetchInfectedDatesHandler = async () => {
    await dispatch(userActions.fetchInfectedDates());
  };

  const deleteInfectedDateHandler = useCallback(
    async (id) => {
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
              setError(error.message);
            }
          },
        },
      ]);
    },
    [dispatch]
  );

  console.log("asd");

  useEffect(() => {
    setIsLoading(true);
    fetchInfectedDatesHandler().then(() => setIsLoading(false));
  }, [date]);

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
          <View style={styles.editDeleteContainer}>
            <TouchableButton
              onPress={() => {
                setSelectedItemId(userInfectedDates[0].id);
                showDatePicker();
                setIsUpdating(true);
              }}
            >
              <View style={styles.editDeleteButton}>
                <MaterialCommunityIcons
                  name="calendar-edit"
                  size={20}
                  color="#fff"
                />
                <Text style={styles.editDeleteText}>Edit</Text>
              </View>
            </TouchableButton>
            <TouchableButton
              onPress={() => {
                deleteInfectedDateHandler(userInfectedDates[0].id);
              }}
            >
              <View
                style={[styles.editDeleteButton, { backgroundColor: "red" }]}
              >
                <MaterialCommunityIcons
                  name="delete-empty"
                  size={22}
                  color="#fff"
                />
                <Text style={styles.editDeleteText}>Delete</Text>
              </View>
            </TouchableButton>
          </View>
        ) : (
          <TouchableButton
            onPress={() => {
              setIsUpdating(false);
              showDatePicker();
            }}
          >
            <View style={styles.datePickerButton}>
              <MaterialCommunityIcons name="calendar" size={22} color="#fff" />
              <Text style={styles.datePickerButtonText}>
                Set up a self-isolaton coundown
              </Text>
            </View>
          </TouchableButton>
        )}

        <View style={styles.hr}></View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={infectedDateHandler}
          onCancel={hideDatePicker}
        />
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  datePickerButton: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: Colors.green,
    borderRadius: 8,
    paddingVertical: 9,
    overflow: "hidden",
    width: vw(80),
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
  },
  datePickerButtonText: {
    textAlign: "center",
    fontFamily: "open-sans-bold",
    color: "#fff",
    fontSize: 16,
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
  editDeleteContainer: {
    width: vw(80),
    marginRight: "auto",
    marginLeft: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editDeleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.blue,
    width: vw(35),
    borderRadius: 5,
    paddingVertical: 7,
  },
  editDeleteText: {
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
});
