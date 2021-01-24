import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Colors from "../constants/Colors";
import FadeInView from "../constants/FadeInView";

const CaseNumberChart = (props) => {
  const [dotCaseNum, setDotCaseNum] = useState("");
  const [dotDate, setDotDate] = useState("");

  const modifiedCaseNumbers = props.allStats.map((c) =>
    c.new_infections.replace(/\,/g, "")
  );
  const modifiedCaseDates = props.allStats.map((c) => c.last_updated);

  return (
    <View>
      <FadeInView key={dotCaseNum} duration={300}>
        <View style={styles.dotStatsContainer}>
          <View style={styles.dotCaseNumTextContainer}>
            <Text style={styles.dotCaseNumText}>
              {dotCaseNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
          </View>
          <Text style={styles.dotDateText}>{dotDate}</Text>
        </View>
      </FadeInView>
      <LineChart
        formatYLabel={(lab) =>
          lab.slice(0, lab.length - 3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
        onDataPointClick={(value) => {
          const selectedDateIndex = value.dataset.data.findIndex(
            (i) => i === value.value
          );
          setDotCaseNum(value.value);
          setDotDate(modifiedCaseDates[selectedDateIndex]);
        }}
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: modifiedCaseNumbers,
              date: modifiedCaseDates,
            },
          ],
        }}
        width={(Dimensions.get("window").width / 100) * 80}
        height={220}
        yAxisInterval={2522} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 1,
          },
          propsForDots: {
            r: "0.1",
            strokeWidth: "2",
            stroke: "black",
          },
        }}
        bezier
        style={{
          marginVertical: 18,
          borderRadius: 16,
          marginLeft: -13,
        }}
      />
    </View>
  );
};

export default CaseNumberChart;

const styles = StyleSheet.create({
  dotStatsContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    alignSelf: "flex-start",
  },
  dotCaseNumTextContainer: {
    backgroundColor: Colors.red,
    borderRadius: 3,
  },
  dotCaseNumText: {
    fontFamily: "open-sans",
    color: "#fff",
    fontSize: 16,
    paddingHorizontal: 5,
  },

  dotDateText: {
    fontFamily: "open-sans",
    fontSize: 13,
    color: Colors.red,
    opacity: 0.8,
    marginLeft: 5,
    backgroundColor: "#fff",
  },
});
