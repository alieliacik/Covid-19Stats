import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import TimeAgo from "react-native-timeago";

import Colors from "../../constants/Colors";
import * as statsActions from "../../store/actions/stats";
import CaseNumberChart from "../../components/CaseNumberChart";
import MonthlyStats from "./MonthlyStats/MonthlyStats";

const CountryScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [showMonth, setShowMonth] = useState(false);
  const allStats = useSelector((state) => state.stats.allStats);

  const {
    countryName,
    lastUpdated,
    totalConfirmed,
    dailyConfirmed,
    countryCode,
  } = props.route.params.selectedCountry;

  const loadSelectedCountryStats = useCallback(async () => {
    try {
      await dispatch(statsActions.fetchCountryDailyStats(countryCode));
    } catch (error) {
      console.log(error.message);
      props.navigation.goBack();
    }
  }, [countryCode]);

  useEffect(() => {
    setIsLoading(true);
    loadSelectedCountryStats().then(() => setIsLoading(false));
  }, [dispatch]);

  return (
    <ScrollView>
      <View style={styles.header}>
        <Image
          style={styles.virusImage1}
          source={require("../../assets/Virus.png")}
        />
        <Image
          style={styles.virusImage2}
          source={require("../../assets/Virus.png")}
        />
        <Image
          style={styles.virusImage3}
          source={require("../../assets/Virus.png")}
        />
        <Text style={styles.appName}>Covid-19 Global</Text>
        <Text style={styles.countryName}>{countryName}</Text>
        <Text style={styles.lastUpdated}>
          {`Last Updated `}
          <TimeAgo time={lastUpdated} />
        </Text>
      </View>
      <View style={styles.stats}>
        <View style={styles.confirmedCard}>
          <Text style={styles.confirmedText}>CONFIRMED</Text>
          <View style={styles.caseCountContainer}>
            <Text style={styles.totalNumber}>{totalConfirmed}</Text>
            {dailyConfirmed !== "0" && (
              <Text style={styles.dailyNumber}>
                <AntDesign name="arrowup" size={15} color={Colors.red} />
                {dailyConfirmed}
              </Text>
            )}
          </View>
          {isLoading ? (
            <View style={{ paddingVertical: 20 }}>
              <ActivityIndicator size="large" color={Colors.red} />
            </View>
          ) : (
            <CaseNumberChart allStats={allStats} />
          )}
        </View>
      </View>
      <Pressable
        style={{
          backgroundColor: Colors.blue,
          paddingVertical: 5,
          marginHorizontal: 16,
          width: 150,
        }}
        onPress={() => setShowMonth((prevState) => !prevState)}
      >
        <Text>Show Months</Text>
      </Pressable>
      {showMonth && <MonthlyStats showMonth={showMonth} />}
    </ScrollView>
  );
};

export default CountryScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.backgroundBlue,
    paddingHorizontal: 26,
    paddingTop: 40,
    height: 280,
    position: "relative",
    overflow: "hidden",
  },

  appName: {
    marginBottom: 16,
    fontSize: 14,
    color: "#fff",
    fontFamily: "open-sans",
  },

  countryName: {
    marginBottom: 4,
    fontSize: 32,
    color: "#fff",
    fontFamily: "open-sans-bold",
  },
  lastUpdated: {
    fontSize: 14,
    color: Colors.darkGray,
    fontFamily: "open-sans",
  },
  virusImage1: {
    position: "absolute",
    transform: [{ scale: 1 }],
    top: 10,
    right: 0,
  },
  virusImage2: {
    position: "absolute",
    transform: [{ scale: 1.7 }],
    bottom: -5,
    left: -3,
  },
  virusImage3: {
    position: "absolute",
    transform: [{ scale: 0.6 }],
    right: -20,
    bottom: -15,
  },
  stats: {
    transform: [{ translateY: -50 }],
    overflow: "hidden",
  },
  confirmedCard: {
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: "#fff",
    marginHorizontal: 26,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  confirmedText: {
    fontSize: 12,
    color: Colors.red,
    fontFamily: "open-sans",
    marginBottom: 4,
  },
  caseCountContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  totalNumber: {
    fontSize: 34,
    color: Colors.red,
    fontFamily: "open-sans-bold",
  },
  dailyNumber: {
    fontSize: 14,
    color: Colors.red,
    marginLeft: 8,
    marginBottom: 7,
    fontFamily: "open-sans",
  },
});
