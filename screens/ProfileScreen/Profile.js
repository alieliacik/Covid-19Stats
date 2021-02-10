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

  const infectedDateHandler = useCallback(
    async (date) => {
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
        try {
          setDate(date);
          hideDatePicker();
          setIsLoading(true);
          setError(null);
          isUpdating
            ? await dispatch(
                userActions.updateInfectedDate(date, selectedItemId)
              )
            : await dispatch(userActions.sendInfectedDate(date));
        } catch (error) {
          setError(error.message);
        }
        setIsLoading(false);
      }
    },
    [date]
  );

  const fetchInfectedDatesHandler = async () => {
    setIsLoading(true);
    await dispatch(userActions.fetchInfectedDates()).then(() =>
      setIsLoading(false)
    );
  };

  const deleteInfectedDateHandler = async (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this date?", [
      { text: "No" },
      {
        text: "Yes",
        onPress: async () => {
          setIsLoading(true);
          setError(null);
          try {
            await dispatch(userActions.deleteInfectedDate(id));
          } catch (error) {
            setError(error.message);
          }
          setIsLoading(false);
        },
      },
    ]);
  };

  useEffect(() => {
    fetchInfectedDatesHandler();
  }, [infectedDateHandler]);

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
  let dayToGo = "No countdown found!";
  if (userInfectedDates.length > 0) {
    const currentDate = new Date().getTime();
    const selectedDate = new Date(userInfectedDates[0].infectedDate).getTime();
    selfIsolationProgress = ((currentDate - selectedDate) / 1209600000) * 100;

    dayToGo = 14 - Math.floor((currentDate - selectedDate) / 86400000);
    console.log(userInfectedDates, selfIsolationProgress);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <View style={styles.progressCircle}>
            <ProgressCircle
              percent={userInfectedDates.length > 0 ? selfIsolationProgress : 0}
              radius={120}
              borderWidth={15}
              shadowColor={Colors.lightGray}
              color={Colors.green}
              bgColor="#fff"
              outerCircleStyle={{ marginVertical: 30 }}
            >
              <Text style={styles.progressCircleText}>{dayToGo}</Text>
            </ProgressCircle>
          </View>

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

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={infectedDateHandler}
            onCancel={hideDatePicker}
          />
        </View>
      )}

      {userInfectedDates.map((date) => (
        <View key={date.id}>
          <Text onPress={() => deleteInfectedDateHandler(date.id)}>
            {new Date(date.infectedDate).getTime()}
          </Text>
          <Text
            onPress={() => {
              setSelectedItemId(date.id);
              showDatePicker();
              setIsUpdating(true);
            }}
          >
            update
          </Text>
        </View>
      ))}
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
    paddingVertical: 12,
    marginBottom: 16,
    overflow: "hidden",
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
    fontFamily: "open-sans",
    fontSize: 16,
  },
});
