import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function NewsScreen({ navigation }) {
  const [news, setNews] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await res.json();
      setNews(data);
      setFiltered(data);
    } catch (e) {}
  };

  const filterNews = (text) => {
    setSearch(text);

    if (text === "") {
      setFiltered(news);
    } else {
      setFiltered(
        news.filter((item) =>
          item.title.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.input}
        placeholder="Пошук..."
        value={search}
        onChangeText={filterNews}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("NewsDetails", {
                article: item,
              })
            }
          >
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>

              <Text numberOfLines={2}>{item.body}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 8,
  },

  card: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },

  title: {
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 5,
  },
});