import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
//import MovieCard from "../../components/MovieCard";
import MovieCard from "@/components/MovieCard";
//import { getTheme } from "../../constants/colors";
import { getTheme } from "@/constants/colors";
//import { useMovies } from "../../hooks/useMovies";
import { useMovies } from "../../../hooks/useMovies";

export default function HomeScreen() {
  const { data, isLoading, error } = useMovies();
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);
  const colors = getTheme(isDark);

  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text>Error fetching movies</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
