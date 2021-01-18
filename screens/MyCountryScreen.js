import React from "react";
import styled from "styled-components/native";
import { View, Text } from "react-native";
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
import SkeletonContent from "react-native-skeleton-content";
const MyCountryScreen = (props) => {
  return (
    <Container>
      <SkeletonContent containerStyle={{ flex: 1 }} isLoading={true}>
        {/* <Text>{props.route.params.myCountry}</Text> */}
        <Text>ASDASDASDASDASdasdasd</Text>
      </SkeletonContent>
    </Container>
  );
};

export default MyCountryScreen;
