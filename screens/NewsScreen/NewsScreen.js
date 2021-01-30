import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import TimeAgo from "react-native-timeago";

import * as statsActions from "../../store/actions/stats";
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
      <FlatList
        contentContainerStyle={styles.container}
        data={allNews.items}
        keyExtractor={(item) => item.title}
        ListHeaderComponent={() => (
          <Text style={styles.title}>Latest News</Text>
        )}
        renderItem={(itemData) => (
          <View style={styles.newContainer}>
            <View style={styles.newsContent}>
              <Image
                style={styles.image}
                source={{
                  uri: itemData.item.urlToImage,
                }}
              />
              <View style={styles.newsTextContainer}>
                <Text numberOfLines={2} style={styles.newsTitle}>
                  {itemData.item.title}
                </Text>
                <Text style={styles.description} numberOfLines={2}>
                  {itemData.item.description}
                </Text>
              </View>
            </View>
            <TimeAgo style={styles.timeAgo} time={itemData.item.addedOn} />
          </View>
        )}
      />
    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    marginTop: 30,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontFamily: "open-sans-semibold",
    marginBottom: 24,
  },
  newContainer: {
    padding: 12,
    marginBottom: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e9f2",
  },
  newsContent: {
    flexDirection: "row",
  },
  description: { fontFamily: "open-sans", color: "#5A6679" },
  timeAgo: {
    fontFamily: "open-sans",
    color: "#8391A7",
  },
  image: {
    width: 88,
    height: 88,
    resizeMode: "cover",
    borderRadius: 5,
    marginRight: 8,
    marginBottom: 8,
  },
  newsTextContainer: {
    flex: 1,
  },
  newsTitle: {
    fontFamily: "open-sans-semibold",
    fontSize: 16,
    marginBottom: 10,
  },
});
