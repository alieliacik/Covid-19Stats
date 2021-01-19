import React from "react";
import styled from "styled-components/native";
import { View, Text } from "react-native";
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const MyCountryScreen = (props) => {
  return (
    <Container>
      <Text>{props.route.params.myCountry}</Text>
    </Container>
  );
};

export default MyCountryScreen;
