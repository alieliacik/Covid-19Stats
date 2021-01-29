import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";

import * as statsActions from "../store/actions/stats";
import { FlatList } from "react-native-gesture-handler";

const News = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const allNews = useSelector((state) => state.stats.allNews);

  const loadNews = async () => {
    try {
      await dispatch(statsActions.fetchNews());
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    loadNews().then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="red" />;
  }
  return (
    <View>
      <Text style={styles.title}>Latest News</Text>
      <FlatList
        contentContainerStyle={styles.container}
        data={allNews.items}
        keyExtractor={(item) => item.title}
        renderItem={(itemData) => (
          <View style={styles.newContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: itemData.item.urlToImage,
                }}
              />
            </View>
            <View>
              <Text>Title</Text>
              <Text>Description</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 32,
    marginVertical: 40,
  },
  title: {
    fontSize: 24,
    fontFamily: "open-sans-semibold",
    marginBottom: 32,
  },
  newContainer: {
    flexDirection: "row",
    padding: 12,
    marginBottom: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e9f2",
  },
  imageContainer: { width: 88, height: 88 },
  image: {
    width: 88,
    height: 88,
  },
});
