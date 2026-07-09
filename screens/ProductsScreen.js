import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default function ProductsScreen() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
      setFiltered(data);
    } catch {
      setError("Немає підключення до Інтернету");
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = (text) => {
    setSearch(text);

    if (text === "") {
      setFiltered(products);
    } else {
      setFiltered(
        products.filter((item) =>
          item.title.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error !== "") {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Пошук..."
        value={search}
        onChangeText={filterProducts}
        style={styles.input}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="contain"
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    margin: 10,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    padding: 10,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },

  image: {
    width: 70,
    height: 70,
    marginRight: 10,
  },

  title: {
    fontWeight: "bold",
  },

  price: {
    marginTop: 5,
    color: "green",
    fontSize: 16,
  },
});