import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = "89d9fb301484ecf104cf115ed1270a92";

export default function WeatherScreen() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadLastCity();
  }, []);

  const loadLastCity = async () => {
    const saved = await AsyncStorage.getItem("city");

    if (saved) {
      setCity(saved);
      getWeather(saved);
    }
  };

  const getWeather = async (name = city) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API}&units=metric`
      );

      if (!res.ok) {
        setError("Місто не знайдено");
        return;
      }

      const data = await res.json();

      setWeather(data);
      setError("");

      await AsyncStorage.setItem("city", name);
    } catch {
      setError("Помилка мережі");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={city}
        onChangeText={setCity}
        placeholder="Місто"
        style={styles.input}
      />

      <Button title="Отримати погоду" onPress={() => getWeather()} />

      {error !== "" && <Text style={styles.error}>{error}</Text>}

      {weather && (
        <View style={styles.card}>
          <Text>Температура: {weather.main.temp}°C</Text>
          <Text>Вологість: {weather.main.humidity}%</Text>
          <Text>Вітер: {weather.wind.speed} м/с</Text>
          <Text>{weather.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },

  card: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#eee",
    borderRadius: 10,
  },

  error: {
    color: "red",
    marginTop: 10,
  },
});