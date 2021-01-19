import React from "react";
import { StyleSheet, View, Text } from "react-native";
import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";

const StyledCard = styled.View`
  background-color: #fff;
  width: 47%;
  margin: 1.5%;
  border-radius: 5px;
  elevation: 5;
  shadow-color: black;
  shadow-ofset: {
      width: 2,
      height: 2,
    };
  shadow-opacity: 0.1;
  padding: 16px;
  shadow-radius: 8px;
`;
const CardCateGory = styled.Text`
  font-family: open-sans;
  color: ${(props) => props.color};
  font-size: 12px;
  margin-bottom: 8px;
`;

const TotalStats = styled.Text`
  font-family: open-sans-bold;
  color: ${(props) => props.color};
  font-size: 22px;
  margin-bottom: 10px;
`;

const DailyStatsContainer = styled.View`
  align-self: flex-start;
  background-color: ${(props) => props.color};
  padding: 3px;
  margin-right: 7px;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  padding-right: 6px;
`;

const DailyStats = styled.Text`
  font-family: "open-sans";
  color: #fff;
  font-size: 14px;
`;

const Card = (props) => {
  return (
    <StyledCard>
      <CardCateGory color={props.color}>{props.category}</CardCateGory>
      <View>
        <TotalStats color={props.color}>{props.totalConfirmed}</TotalStats>
      </View>
      <DailyStatsContainer color={props.color}>
        <DailyStats color={props.color}>
          <AntDesign name="arrowup" size={16} color="#fff" />
          {props.totalNewCases}
        </DailyStats>
      </DailyStatsContainer>
    </StyledCard>
  );
};

export default Card;

/* const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    width: (WindowsDimensions.fullWidth / 100) * 47,
    marginHorizontal: (WindowsDimensions.fullWidth / 100) * 1.5,
    marginVertical: (WindowsDimensions.fullWidth / 100) * 1.5,
    borderRadius: 5,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    padding: 16,
    shadowRadius: 8,
  },
  cardCategory: {
    fontFamily: "open-sans",
    color: props.color,
    fontSize: 12,
    marginBottom: 8,
  },
  total: {
   
  },
  dailyContainer: {},
  daily: {},
}); */
