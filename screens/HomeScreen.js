import React from "react";
import { View, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Завдання 1 - Користувачі"
        onPress={() => navigation.navigate("Users")}
      />

      <View style={styles.space} />

      <Button
        title="Завдання 2 - Пости"
        onPress={() => navigation.navigate("Posts")}
      />

      <View style={styles.space} />

      <Button
        title="Завдання 3 - Каталог товарів"
        onPress={() => navigation.navigate("Products")}
      />

      <View style={styles.space} />

      <Button
        title="Завдання 4 - Погода"
        onPress={() => navigation.navigate("Weather")}
      />

      <View style={styles.space} />

      <Button
        title="Завдання 5 - Новини"
        onPress={() => navigation.navigate("News")}
      />

      <View style={styles.space} />

      <Button
        title="Улюблені новини"
        onPress={() => navigation.navigate("Favorites")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  space: {
    height: 15,
  },
});