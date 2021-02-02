import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import TimeAgo from "react-native-timeago";

const SelectedNews = (props) => {
  const {
    title,
    content,
    urlToImage,
    addedOn,
    author,
  } = props.route.params.selectedNews;

  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={{
          uri: urlToImage,
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <TimeAgo style={styles.time} time={addedOn} />
        {!!author && <Text style={styles.author}>{author}</Text>}
        <Text style={styles.content}>
          {content.replace(/\nAdvertisement/g, "")}
        </Text>
      </View>
    </ScrollView>
  );
};

export default SelectedNews;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  container: {
    paddingHorizontal: 15,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 19,
    marginTop: 15,
  },
  time: {
    fontFamily: "open-sans",
    color: "#8391A7",
    marginTop: 10,
  },
  author: {
    marginTop: 8,
    fontFamily: "open-sans-semibold",
  },
  content: {
    fontFamily: "open-sans",
    marginTop: 8,
    marginBottom: 15,
  },
});
