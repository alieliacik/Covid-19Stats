import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
} from "react-native";
import { LogBox } from "react-native";
import { vw } from "react-native-expo-viewport-units";
import { AntDesign } from "@expo/vector-icons";

const images = [
  { id: 1, uri: require("../../assets/advice1.png") },
  { id: 2, uri: require("../../assets/advice2.png") },
  { id: 3, uri: require("../../assets/advice3.png") },
  { id: 4, uri: require("../../assets/advice4.png") },
  { id: 5, uri: require("../../assets/advice5.png") },
  { id: 6, uri: require("../../assets/advice6.png") },
];

const HealthScreen = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [modalSource, setModalSource] = useState(images[0].uri);

  let TouchableButton;

  if (Platform.OS === "android") {
    TouchableButton = TouchableNativeFeedback;
  } else {
    TouchableButton = TouchableOpacity;
  }

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Modal animationType="fade" visible={showModal} transparent>
        <View style={styles.modalContainer}>
          <Image style={styles.modalImage} source={modalSource} />
          <AntDesign
            onPress={() => setShowModal(false)}
            name="closecircle"
            size={40}
            color="#fff"
          />
        </View>
      </Modal>
      <Text style={styles.title}>Healthy Tips</Text>
      <TouchableButton useForeground={true}>
        <View style={styles.cardContainer}>
          <View>
            <Image
              style={styles.image}
              source={require("../../assets/symptoms.png")}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Symptoms</Text>
            <Text style={styles.cardText}>
              The COVID-19 virus affects different people in different ways.
            </Text>
          </View>
        </View>
      </TouchableButton>
      <TouchableButton useForeground={true}>
        <View style={styles.cardContainer}>
          <View>
            <Image
              style={styles.image}
              source={require("../../assets/preventive.png")}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Preventive Measures</Text>
            <Text style={styles.cardText}>
              Check how to prevent infection and to slow transmission of
              COVID-19.
            </Text>
          </View>
        </View>
      </TouchableButton>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListHeaderComponent={() => (
          <Text style={[styles.cardTitle, { marginBottom: 15 }]}>
            Advice from WHO
          </Text>
        )}
        renderItem={(itemData) => (
          <TouchableButton
            useForeground={true}
            onPress={() => {
              setShowModal(true);
              setModalSource(itemData.item.uri);
            }}
          >
            <View style={styles.flatListCard}>
              <Image style={styles.adviceImage} source={itemData.item.uri} />
            </View>
          </TouchableButton>
        )}
      />
    </ScrollView>
  );
};

export default HealthScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontFamily: "open-sans-semibold",
    marginTop: 15,
    marginBottom: 24,
  },

  cardContainer: {
    flexDirection: "row",
    height: 114,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#F9FAFC",
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    height: 80,
    width: 80,
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: "open-sans-semibold",
    marginBottom: 8,
  },
  cardText: {
    fontFamily: "open-sans",
    color: "#5A6679",
    fontSize: 14,
  },
  flatListCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
  },
  adviceImage: {
    width: vw(42),
    height: vw(42),
    resizeMode: "contain",
    borderRadius: 15,
  },
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    zIndex: 5,
    position: "relative",
  },
  modalImage: {
    width: vw(100),
    height: vw(100),
    borderRadius: 16,
    marginBottom: 20,
  },
});
