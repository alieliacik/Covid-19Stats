import React from "react";
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";

const TouchableButtonComponent = (props) => {
  let TouchableButton;

  if (Platform.OS === "android") {
    TouchableButton = TouchableNativeFeedback;
  } else {
    TouchableButton = TouchableOpacity;
  }

  return (
    <TouchableButton style={{ ...props.style }} {...props}>
      {props.children}
    </TouchableButton>
  );
};

export default TouchableButtonComponent;
