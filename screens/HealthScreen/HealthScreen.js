import React, { useEffect, useState, useRef } from "react";
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

import FadeInView from "../../constants/FadeInView";
import Colors from "../../constants/Colors";

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
  const [showSymptoms, setShowSymptoms] = useState(false);
  const [symptomsLayoutY, setSymptomsLayoutY] = useState(false);
  const [showPreventive, setShowPreventive] = useState(false);
  const [preventiveLayoutY, setPreventiveLayoutY] = useState(false);
  const scrollRef = useRef();

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
    <ScrollView ref={scrollRef} contentContainerStyle={styles.container}>
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
      <TouchableButton
        useForeground={true}
        onLayout={(e) => setSymptomsLayoutY(e.nativeEvent.layout.y)}
        onPress={() => {
          setShowSymptoms((prevState) => !prevState);
          if (!showSymptoms) {
            scrollRef.current?.scrollTo({
              y: symptomsLayoutY - 5,
              animated: true,
            });
          }
        }}
      >
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
      {showSymptoms && (
        <FadeInView style={styles.infoCardContainer}>
          <Text style={styles.cardText}>
            The COVID-19 virus affects different people in different ways. Most
            infected people will develop mild to moderate illness and recover
            without hospitalization.{"\n"}
          </Text>
          <Text style={styles.cardTitle}>Most common symptoms:</Text>
          <Text style={styles.cardText}>
            &#x25CF; fever {"\n"}&#x25CF; dry cough {"\n"}&#x25CF; tiredness{" "}
            {"\n"}
          </Text>
          <Text style={styles.cardTitle}>Less common symptoms:</Text>
          <Text style={styles.cardText}>
            &#x25CF; aches and pains {"\n"}&#x25CF; sore throat {"\n"}&#x25CF;
            diarrhoea {"\n"}&#x25CF; conjunctivitis {"\n"}&#x25CF; headache{" "}
            {"\n"}
            &#x25CF; loss of taste or smell {"\n"}&#x25CF; a rash on skin, or
            discolouration of fingers or toes {"\n"}
          </Text>
          <Text style={styles.cardTitle}>Serious symptoms:</Text>
          <Text style={styles.cardText}>
            &#x25CF; difficulty breathing or shortness of breath {"\n"}&#x25CF;
            chest pain or pressure {"\n"}&#x25CF; loss of speech or movement{" "}
            {"\n"}
          </Text>
          <Text style={styles.cardText}>
            Seek immediate medical attention if you have serious symptoms.
            Always call before visiting your doctor or health facility. {"\n"}
            {"\n"}People with mild symptoms who are otherwise healthy should
            manage their symptoms at home. {"\n"}
            {"\n"}On average it takes 5–6 days from when someone is infected
            with the virus for symptoms to show, however it can take up to 14
            days.
          </Text>
        </FadeInView>
      )}
      <TouchableButton
        useForeground={true}
        onLayout={(e) => setPreventiveLayoutY(e.nativeEvent.layout.y)}
        onPress={() => {
          setShowPreventive((prevState) => !prevState);
          if (!showPreventive) {
            scrollRef.current?.scrollTo({
              y: preventiveLayoutY - 5,
              animated: true,
            });
          }
        }}
      >
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
      {showPreventive && (
        <FadeInView style={styles.infoCardContainer}>
          <Text style={styles.cardText}>
            Protect yourself and others around you by knowing the facts and
            taking appropriate precautions. Follow advice provided by your local
            health authority.{"\n"}
          </Text>
          <Text style={styles.cardTitle}>
            To prevent the spread of COVID-19:
          </Text>
          <Text style={styles.cardText}>
            &#x25CF; Clean your hands often. Use soap and water, or an
            alcohol-based hand rub. {"\n"}&#x25CF; Maintain a safe distance from
            anyone who is coughing or sneezing. {"\n"}&#x25CF; Wear a mask when
            physical distancing is not possible. {"\n"}&#x25CF; Don’t touch your
            eyes, nose or mouth. {"\n"}&#x25CF; Cover your nose and mouth with
            your bent elbow or a tissue when you cough or sneeze. {"\n"}&#x25CF;
            Stay home if you feel unwell. {"\n"}&#x25CF; If you have a fever,
            cough and difficulty breathing, seek medical attention. {"\n"}
          </Text>
          <Text style={styles.cardText}>
            Calling in advance allows your healthcare provider to quickly direct
            you to the right health facility. This protects you, and prevents
            the spread of viruses and other infections. {"\n"}
          </Text>
          <Text style={styles.cardTitle}>Masks</Text>
          <Text style={styles.cardText}>
            Masks can help prevent the spread of the virus from the person
            wearing the mask to others. Masks alone do not protect against
            COVID-19, and should be combined with physical distancing and hand
            hygiene. Follow the advice provided by your local health authority.
          </Text>
        </FadeInView>
      )}
      <TouchableButton
        onPress={() => {
          props.navigation.navigate("Self-Assessment");
        }}
      >
        <View style={styles.selfAssessmentButton}>
          <Text style={styles.selfAssessmentButtonText}>
            Start self-assessment
          </Text>
        </View>
      </TouchableButton>
      <TouchableButton
        onPress={() => {
          props.navigation.navigate("Profile");
        }}
      >
        <View style={styles.selfAssessmentButton}>
          <Text style={styles.selfAssessmentButtonText}>
            Set self-isolation countdown
          </Text>
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
  selfAssessmentButton: {
    backgroundColor: Colors.lightBlue,
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  selfAssessmentButtonText: {
    textAlign: "center",
    fontFamily: "open-sans-bold",
    color: "#fff",
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: "open-sans-semibold",
    marginTop: 15,
    marginBottom: 10,
  },

  cardContainer: {
    flexDirection: "row",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#F9FAFC",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    borderRadius: 4,
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
    elevation: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    borderRadius: 4,
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
  infoCardContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
});
