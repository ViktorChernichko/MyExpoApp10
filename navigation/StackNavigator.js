import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UsersScreen from "../screens/UsersScreen";
import PostsScreen from "../screens/PostsScreen";
import PostDetailsScreen from "../screens/PostDetailsScreen";
import ProductsScreen from "../screens/ProductsScreen";
import WeatherScreen from "../screens/WeatherScreen";
import NewsScreen from "../screens/NewsScreen";
import NewsDetailsScreen from "../screens/NewsDetailsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">

        <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Практична робота №9" }}
        />

        <Stack.Screen
            name="Users"
            component={UsersScreen}
            options={{ title: "Користувачі" }}
        />


        <Stack.Screen
            name="Posts"
            component={PostsScreen}
            options={{ title: "Пости" }}
        />

        <Stack.Screen
            name="PostDetails"
            component={PostDetailsScreen}
            options={{ title: "Пост" }}
        />

        <Stack.Screen
            name="Products"
            component={ProductsScreen}
            options={{ title: "Товари" }}
        />

        <Stack.Screen
            name="Weather"
            component={WeatherScreen}
            options={{ title: "Погода" }}
        />

        <Stack.Screen
            name="News"
            component={NewsScreen}
            options={{ title: "Новини" }}
        />

        <Stack.Screen
            name="NewsDetails"
            component={NewsDetailsScreen}
            options={{ title: "Новина" }}
        />

        <Stack.Screen
            name="Favorites"
            component={FavoritesScreen}
            options={{ title: "Обране" }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}