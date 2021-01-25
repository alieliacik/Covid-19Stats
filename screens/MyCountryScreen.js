import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import TimeAgo from "react-native-timeago";
import Colors from "../constants/Colors";
import * as statsActions from "../store/actions/stats";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import CaseNumberChart from "../components/CaseNumberChart";

const SkeletonComponent = () => (
  <SkeletonPlaceholder backgroundColor="#fff">
    <View style={styles.skeletonItemLong}></View>
    <View style={styles.skeletonItem}></View>
    <View style={styles.skeletonItemLong}></View>
    <View style={styles.skeletonItem}></View>
    <View style={styles.skeletonItemLong}></View>
    <View style={styles.skeletonItem}></View>
    <View style={{ flex: 1, flexDirection: "row", width: 150 }}>
      <View style={styles.skeletonItemShort}></View>
      <View style={styles.skeletonItemShort}></View>
      <View style={styles.skeletonItemShort}></View>
    </View>
  </SkeletonPlaceholder>
);

const MyCountryScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const selectedCountryStats = useSelector(
    (state) => state.stats.selectedCountryStats
  );

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
          source={require("../assets/Virus.png")}
        />
        <Image
          style={styles.virusImage2}
          source={require("../assets/Virus.png")}
        />
        <Image
          style={styles.virusImage3}
          source={require("../assets/Virus.png")}
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
            <Text style={styles.dailyNumber}>
              <AntDesign name="arrowup" size={15} color={Colors.red} />
              {dailyConfirmed}
            </Text>
          </View>
          {isLoading ? (
            <View style={{ paddingVertical: 20 }}>
              <ActivityIndicator size="large" color={Colors.red} />
            </View>
          ) : (
            <CaseNumberChart allStats={selectedCountryStats.allStats} />
          )}
        </View>
      </View>
      <View style={styles.table}>
        <View style={styles.tableHeaderWrapper}>
          <View style={{ ...styles.tableHeaderContainer, width: "27%" }}>
            <Text style={styles.tableHeaderText}>Date</Text>
          </View>
          <View style={{ ...styles.tableHeaderContainer, width: "22%" }}>
            <Text style={{ ...styles.tableHeaderText, color: Colors.red }}>
              C<Text style={{ fontSize: 8 }}>onfirmed</Text>
            </Text>
          </View>
          <View style={{ ...styles.tableHeaderContainer, width: "22%" }}>
            <Text style={{ ...styles.tableHeaderText, color: Colors.green }}>
              R<Text style={{ fontSize: 8 }}>ecovered</Text>
            </Text>
          </View>
          <View style={{ ...styles.tableHeaderContainer, width: "22%" }}>
            <Text style={{ ...styles.tableHeaderText, color: Colors.gray }}>
              D<Text style={{ fontSize: 8 }}>eceased</Text>
            </Text>
          </View>
        </View>

        {isLoading ? (
          <SkeletonComponent />
        ) : (
          selectedCountryStats.lastTenDaysStats &&
          selectedCountryStats.lastTenDaysStats.map((country) => {
            return (
              <View
                key={country.last_updated}
                style={styles.tableHeaderWrapper}
              >
                <View style={{ ...styles.tableHeaderContainer, width: "27%" }}>
                  <Text
                    style={{
                      ...styles.tableContentText,
                      fontFamily: "open-sans-bold",
                    }}
                  >
                    {country.last_updated}
                  </Text>
                </View>
                <View style={{ ...styles.tableHeaderContainer, width: "22%" }}>
                  <Text style={styles.tableContentText}>
                    {country.new_infections !== "0" ? (
                      country.new_infections
                    ) : (
                      <AntDesign name="exclamationcircleo" size={15} />
                    )}
                  </Text>
                </View>
                <View style={{ ...styles.tableHeaderContainer, width: "22%" }}>
                  <Text style={styles.tableContentText}>
                    {country.new_recovered !== "0" ? (
                      country.new_recovered
                    ) : (
                      <AntDesign name="exclamationcircleo" size={15} />
                    )}
                  </Text>
                </View>
                <View style={{ ...styles.tableHeaderContainer, width: "22%" }}>
                  <Text style={styles.tableContentText}>
                    {country.new_deaths !== "0" ? (
                      country.new_deaths
                    ) : (
                      <AntDesign name="exclamationcircleo" size={15} />
                    )}
                  </Text>
                </View>
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
};

export default MyCountryScreen;

const styles = StyleSheet.create({
  skeletonItemLong: {
    height: 20,
    borderRadius: 5,
    marginVertical: 8,
  },
  skeletonItem: {
    height: 20,
    width: "50%",
    borderRadius: 5,
    marginVertical: 5,
  },
  skeletonItemShort: {
    width: 70,
    height: 18,
    borderRadius: 5,
    marginVertical: 10,
    marginRight: 15,
  },
  table: {
    paddingHorizontal: 26,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  tableHeaderWrapper: {
    flexDirection: "row",
  },
  tableHeaderContainer: {
    backgroundColor: Colors.lightGray,
    padding: 8,
    fontSize: 32,
    margin: "1%",
    borderRadius: 5,
  },
  tableHeaderText: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  tableContentText: {
    fontFamily: "open-sans",
    fontSize: 12,
  },
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
