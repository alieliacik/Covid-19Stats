import React, { useEffect } from "react";
import styled from "styled-components/native";
import { View, Text } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const MyCountryScreen = (props) => {
  return (
    <Container>
      <Text>{props.route.params.selectedCountry}</Text>
    </Container>
  );
};

export default MyCountryScreen;
