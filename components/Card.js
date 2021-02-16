import React, { useRef, useEffect } from "react";
import { StyleSheet, View, Animated } from "react-native";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import FadeInView from "../constants/FadeInView";

const StyledCard = styled.View`
  background-color: #fff;
  width: ${({ width }) => width}%;
  margin: 1.5%;
  border-radius: 5px;
  elevation: 5;
  shadow-color: black;
  shadow-offset: 2px 2px;
  shadow-opacity: 0.1;
  padding: 12px;
  shadow-radius: 8px;
`;
const CategoryName = styled.Text`
  font-family: open-sans;
  color: ${(props) => props.color};
  font-size: 12px;
  margin-right: 10px;
  letter-spacing: 1px;
`;
const CategoryContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TotalStats = styled.Text`
  font-family: open-sans-semibold;
  color: ${(props) => props.color};
  font-size: 20px;
`;

const DailyStatsContainer = styled.View`
  align-self: flex-start;
  background-color: ${(props) => props.color};
  padding: 3px;
  margin-top: 7px;
  margin-right: 7px;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  padding-right: 6px;
`;

const DailyStats = styled.Text`
  font-family: open-sans;
  color: #fff;
  font-size: 14px;
`;

const Card = (props) => {
  return (
    <StyledCard width={props.width}>
      <CategoryContainer>
        <CategoryName color={props.color}>{props.category}</CategoryName>
        <AntDesign name="linechart" size={12} color={props.color} />
      </CategoryContainer>
      <View>
        <TotalStats color={props.color}>{props.totalConfirmed}</TotalStats>
      </View>
      {props.dailyConfirmed && (
        <DailyStatsContainer color={props.color}>
          <DailyStats color={props.color}>
            <AntDesign name="arrowup" size={15} color="#fff" />
            {props.dailyConfirmed}
          </DailyStats>
        </DailyStatsContainer>
      )}
    </StyledCard>
  );
};

export default Card;
