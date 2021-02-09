import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { TextInput } from "react-native-paper";

import * as userActions from "../../store/actions/user";

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
  const [infectedDate, setInfectedDate] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const sendInfectedDateHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(userActions.sendInfectedDate(infectedDate));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const fetchInfectedDatesHandler = async () => {
    await dispatch(userActions.fetchInfectedDates());
  };

  useEffect(() => {
    fetchInfectedDatesHandler();
  }, [isLoading]);

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const infectedDateHandler = (date) => {
    setInfectedDate(date);
  };
  return (
    <View>
      <Text>Logged In</Text>
      <TextInput onChangeText={infectedDateHandler} />
      <TouchableOpacity onPress={sendInfectedDateHandler}>
        {isLoading ? <ActivityIndicator /> : <Text>Send Data</Text>}
      </TouchableOpacity>

      {userInfectedDates.map((date) => (
        <Text>{date.infectedDate}</Text>
      ))}
    </View>
  );
};

export default Profile;
