import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NewsDetailsScreen({ route }) {
  const { article } = route.params;

  const saveFavorite = async () => {
    const old = await AsyncStorage.getItem("favorites");

    let list = old ? JSON.parse(old) : [];

    if (!list.find((i) => i.id === article.id)) {
      list.push(article);
    }

    await AsyncStorage.setItem(
      "favorites",
      JSON.stringify(list)
    );

    alert("Додано");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{article.title}</Text>

      <Text>{article.body}</Text>

      <Button
        title="Додати в обране"
        onPress={saveFavorite}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
});