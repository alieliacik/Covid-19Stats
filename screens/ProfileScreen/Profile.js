import React, { useState, useEffect } from "react";
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

import * as userActions from "../../store/actions/user";
import Colors from "../../constants/Colors";
import moment from "moment";

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
      setIsLoading(true);
      setError(null);
      try {
        isUpdating
          ? await dispatch(userActions.updateInfectedDate(date, selectedItemId))
          : await dispatch(userActions.sendInfectedDate(date));
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    }
  };

  const fetchInfectedDatesHandler = async () => {
    await dispatch(userActions.fetchInfectedDates());
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
  }, [isLoading]);

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
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
      {userInfectedDates.map((date) => (
        <View key={date.id}>
          <Text onPress={() => deleteInfectedDateHandler(date.id)}>
            {JSON.stringify(date.infectedDate)}
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
});
