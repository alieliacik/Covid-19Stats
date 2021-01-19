import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components/native";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { countryCodeEmoji } from "country-code-emoji";
import { AntDesign } from "@expo/vector-icons";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import Colors from "../constants/Colors";
import * as globalActions from "../store/actions/stats";
import Card from "../components/Card";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const total = {
  totalConfirmed: 95854091,
  totalDeaths: 2045768,
  totalRecovered: 68407548,
  totalNewCases: 334682,
  totalNewDeaths: 6334,
  totalActiveCases: 25400775,
  totalCasesPerMillionPop: 12297,
  created: "2021-01-18T20:32:00.000Z",
};

const GlobalScreen = (props) => {
  const dispatch = useDispatch();
  const globalStats = useSelector((state) => state.global.globalStats);
  const [isLoading, setIsLoading] = useState(true);
  // const fetchData = async () => {
  //   const response = await fetch(
  //     "http://api.coronatracker.com/v3/stats/worldometer/country"
  //   );

  //   if (!response.ok) {
  //     const message = `An error has occured: ${response.status}`;
  //     throw new Error(message);
  //   }

  //   const resData = await response.json();
  //   const filteredResData = await resData.filter((c) => !!c.countryCode);
  //   setCountresData(filteredResData);
  //   setIsLoading(false);
  // };

  const loadGlobalStats = useCallback(async () => {
    try {
      await dispatch(globalActions.fetchGlobalData());
    } catch (err) {
      console.log(err.message);
    }
  }, []);
  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync(
      Permissions.LOCATION
    );
    if (status !== "granted") {
      Alert.alert("Location permissions required");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    const latAndLong = {
      latitude: Number(location.coords.latitude),
      longitude: Number(location.coords.longitude),
    };
    let currCountry = await Location.reverseGeocodeAsync(latAndLong).then(
      (res) => {
        console.log(res[0].isoCountryCode);
        setCurrentCountry("Turkey");
        // setCurrentCountry(res[0].country);
      }
    );

    setLocation(JSON.stringify(location, null, 2));
  };

  useEffect(() => {
    setIsLoading(true);
    loadGlobalStats().then(() => setIsLoading(false));

    // fetchData().catch((err) => console.log(err));
    // getLocation();
  }, [dispatch]);

  let TouchableButton;

  if (Platform.OS === "android") {
    TouchableButton = TouchableNativeFeedback;
  } else {
    TouchableButton = TouchableOpacity;
  }

  if (isLoading) {
    return (
      <SkeletonPlaceholder backgroundColor="#fff">
        <View
          style={{
            height: 50,
            marginVertical: 3.5,
            marginHorizontal: 5,
            borderRadius: 5,
          }}
        ></View>
        <View
          style={{
            height: 50,
            marginVertical: 3.5,
            marginHorizontal: 5,
            borderRadius: 5,
          }}
        ></View>
        <View
          style={{
            height: 50,
            marginVertical: 3.5,
            marginHorizontal: 5,
            borderRadius: 5,
          }}
        ></View>
        <View
          style={{
            height: 50,
            marginVertical: 3.5,
            marginHorizontal: 5,
            borderRadius: 5,
          }}
        ></View>
        <View
          style={{
            height: 50,
            marginVertical: 3.5,
            marginHorizontal: 5,
            borderRadius: 5,
          }}
        ></View>
        <View
          style={{
            height: 50,
            marginVertical: 3.5,
            marginHorizontal: 5,
            borderRadius: 5,
          }}
        ></View>
        <View
          style={{
            height: 50,
            marginVertical: 3.5,
            marginHorizontal: 5,
            borderRadius: 5,
          }}
        ></View>
        <View
          style={{
            height: 50,
            marginVertical: 3.5,
            marginHorizontal: 5,
            borderRadius: 5,
          }}
        ></View>
        <View
          style={{
            height: 50,
            marginVertical: 3.5,
            marginHorizontal: 5,
            borderRadius: 5,
          }}
        ></View>
        <View
          style={{
            height: 50,
            marginVertical: 3.5,
            marginHorizontal: 5,
            borderRadius: 5,
          }}
        ></View>
        <View
          style={{
            height: 50,
            marginVertical: 3.5,
            marginHorizontal: 5,
            borderRadius: 5,
          }}
        ></View>
        <View
          style={{
            height: 50,
            marginVertical: 3.5,
            marginHorizontal: 5,
            borderRadius: 5,
          }}
        ></View>
        <View
          style={{
            height: 50,
            marginVertical: 3.5,
            marginHorizontal: 5,
            borderRadius: 5,
          }}
        ></View>
        <View
          style={{
            height: 50,
            marginVertical: 3.5,
            marginHorizontal: 5,
            borderRadius: 5,
          }}
        ></View>
        <View
          style={{
            height: 50,
            marginVertical: 3.5,
            marginHorizontal: 5,
            borderRadius: 5,
          }}
        ></View>
        <View
          style={{
            height: 50,
            marginVertical: 3.5,
            marginHorizontal: 5,
            borderRadius: 5,
          }}
        ></View>
        <View
          style={{
            height: 50,
            marginVertical: 3.5,
            marginHorizontal: 5,
            borderRadius: 5,
          }}
        ></View>
        <View
          style={{
            height: 50,
            marginVertical: 3.5,
            marginHorizontal: 5,
            borderRadius: 5,
          }}
        ></View>
      </SkeletonPlaceholder>
    );
  }

  const FlatListHeader = () => (
    <View>
      <View>
        <View style={styles.cardContainer}>
          <Card
            category="CONFIRMED"
            totalConfirmed={numberWithCommas(total.totalConfirmed)}
            totalNewCases={numberWithCommas(total.totalNewCases)}
            color={Colors.red}
          />
          <Card
            category="ACTIVE"
            totalConfirmed={numberWithCommas(total.totalActiveCases)}
            totalNewCases={numberWithCommas(total.totalNewCases)}
            color={Colors.blue}
          />
        </View>
        <View style={styles.cardContainer}>
          <Card
            category="RECOVERD"
            totalConfirmed={numberWithCommas(total.totalRecovered)}
            totalNewCases={numberWithCommas(total.totalNewCases)}
            color={Colors.green}
          />
          <Card
            category="DECEASED"
            totalConfirmed={numberWithCommas(total.totalDeaths)}
            totalNewCases={numberWithCommas(total.totalNewDeaths)}
            color={Colors.gray}
          />
        </View>
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          paddingVertical: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "open-sans-bold",
            fontSize: 12,
          }}
        >
          Country
        </Text>
        <Text style={{ fontFamily: "open-sans-bold" }}>Case Number</Text>
      </View>
    </View>
  );
  const numberWithCommas = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (
    <Container>
      <FlatList
        style={{ width: "100%" }}
        data={globalStats}
        keyExtractor={(itemData) => itemData.country}
        ListHeaderComponent={() => <FlatListHeader />}
        renderItem={(itemData) => {
          const flagImg = countryCodeEmoji(itemData.item.countryCode);

          return (
            <View style={{ marginHorizontal: 5, marginVertical: 3.5 }}>
              <TouchableButton
                onPress={() => Alert.alert("pressed")}
                style={{
                  paddingVertical: 16,
                  paddingHorizontal: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "#fff",
                  borderRadius: 3,
                  elevation: 5,
                  shadowColor: "black",
                  shadowOffset: {
                    width: 2,
                    height: 2,
                  },
                  shadowOpacity: 0.08,
                  shadowRadius: 2,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 10, marginRight: 4 }}>
                    {itemData.index + 1}
                  </Text>
                  <Text style={{ fontSize: 16, marginRight: 8 }}>
                    {flagImg}
                  </Text>
                  <Text style={{ fontSize: 16, fontFamily: "open-sans" }}>
                    {itemData.item.country}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {itemData.item.dailyDeaths !== 0 && (
                    <View
                      style={{
                        backgroundColor: Colors.red,
                        padding: 3,
                        marginRight: 7,
                        borderRadius: 5,
                        flexDirection: "row",
                        alignItems: "center",
                        paddingRight: 6,
                      }}
                    >
                      <AntDesign name="arrowup" size={12} color="#fff" />
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "open-sans-bold",
                          color: "#fff",
                        }}
                      >
                        {numberWithCommas(itemData.item.dailyConfirmed)}
                      </Text>
                    </View>
                  )}

                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "open-sans-bold",
                      color: Colors.red,
                    }}
                  >
                    {numberWithCommas(itemData.item.totalConfirmed)}
                  </Text>
                </View>
              </TouchableButton>
            </View>
          );
        }}
      />
    </Container>
  );
};

export default GlobalScreen;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
