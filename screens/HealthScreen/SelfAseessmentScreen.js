import React from "react";
import { WebView } from "react-native-webview";

const SelfAssessmentScreen = (props) => {
  return (
    <WebView
      source={{
        uri: "https://covid-19.ontario.ca/self-assessment/",
      }}
    />
  );
};

export default SelfAssessmentScreen;
