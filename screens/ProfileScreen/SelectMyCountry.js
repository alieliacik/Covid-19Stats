import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { countryCodeEmoji } from "country-code-emoji";

import Colors from "../../constants/Colors";
import * as statsActions from "../../store/actions/stats";
import * as userActions from "../../store/actions/user";

const SelectMyCountry = (props) => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [searchVal, setSearchVal] = useState("");
  const countryTotals = useSelector((state) => state.stats.countryTotals)
    .filter(
      (country) =>
        country.countryName.toUpperCase().indexOf(searchVal.toUpperCase()) > -1
    )
    .sort((a, b) => a.countryName.localeCompare(b.countryName));

  const textChangeHandler = (text) => {
    let modifiedSearchVal;

    if (text.trim().length > 0) {
      modifiedSearchVal = text;
    } else {
      modifiedSearchVal = text.trim();
    }

    setSearchVal(modifiedSearchVal);
  };

  const loadCountryStats = async () => {
    setError(null);
    try {
      await dispatch(statsActions.fetchCountryTotalStats);
    } catch (error) {
      setError(error.message);
    }
  };

  const setUserCountryHandler = async (userCountry) => {
    await dispatch(userActions.setUserCountry(userCountry));
  };

  const updateUserCountryHandler = async (userCountry, id) => {
    await dispatch(userActions.updateUserCountry(userCountry, id));
  };

  useEffect(() => {
    loadCountryStats();
  }, [searchVal]);

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred", error, [{ text: "Okay" }]);
    }
  }, [error]);

  let TouchableButton;

  if (Platform.OS === "android") {
    TouchableButton = TouchableNativeFeedback;
  } else {
    TouchableButton = TouchableOpacity;
  }
  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <MaterialCommunityIcons
          name="magnify"
          size={26}
          color={Colors.bottomTabGray}
        />
        <TextInput
          placeholder="Search"
          style={styles.input}
          value={searchVal}
          onChangeText={textChangeHandler}
        />
        <Ionicons
          name="ios-location-outline"
          size={24}
          color={Colors.bottomTabGray}
        />
      </View>
      <View style={styles.searchResult}>
        <FlatList
          data={countryTotals}
          keyExtractor={(itemData) => itemData.country}
          keyboardShouldPersistTaps="always"
          style={{ width: "100%" }}
          renderItem={(itemData) => {
            const flagImg = countryCodeEmoji(itemData.item.countryCode);
            return (
              <View style={{ marginHorizontal: 5, marginVertical: 3.5 }}>
                <TouchableButton
                  onPress={() => {
                    if (props.route.params.isUpdatingCountry) {
                      updateUserCountryHandler(
                        itemData.item.country,
                        props.route.params.id
                      );
                    } else {
                      setUserCountryHandler(itemData.item.country);
                    }
                    props.navigation.goBack();
                  }}
                >
                  <View style={styles.country}>
                    <View style={styles.countryContainer}>
                      <Text style={styles.countryFlag}>{flagImg}</Text>
                      <Text style={styles.countryName}>
                        {itemData.item.country}
                      </Text>
                    </View>
                  </View>
                </TouchableButton>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default SelectMyCountry;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
  },
  textInputContainer: {
    flexDirection: "row",
    backgroundColor: "#F1F2F6",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 8,
    overflow: "hidden",
    marginVertical: 16,
    marginHorizontal: 32,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: "#F1F2F6",
    paddingLeft: 8,
  },
  searchResult: { marginBottom: 55 },
  flatListHeaderText: {
    fontFamily: "open-sans-bold",
    fontSize: 12,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  worldwideContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E9F2",
    paddingBottom: 8,
    marginBottom: 8,
  },
  globePng: {
    height: 18,
    width: 18,
    marginRight: 12,
    marginLeft: 6,
  },
  country: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 32,
  },
  countryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  countryFlag: { fontSize: 16, marginRight: 8 },
  countryName: { fontSize: 16, fontFamily: "open-sans" },
  dailyNewCasesContainer: {
    backgroundColor: Colors.red,
    padding: 3,
    marginRight: 7,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 6,
  },
});
