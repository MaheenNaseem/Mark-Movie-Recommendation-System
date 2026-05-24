import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Constants from "expo-constants";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useSelector } from "react-redux";
import MovieCard from "../../../components/MovieCard";
import { getTheme } from "../../../constants/colors";

const API_KEY = Constants.expoConfig.extra.tmdbApiKey;
//const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

const fetchTrending = async () => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/week`,
    { params: { api_key: API_KEY } },
  );
  return res.data.results;
};

export default function TrendingScreen() {
  const isDark = useSelector((state) => state.theme.isDark);
  const colors = getTheme(isDark);
  const { data, isLoading, error } = useQuery({
    queryKey: ["trending"],
    queryFn: fetchTrending,
  });

  if (isLoading)
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );

  if (error)
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.white }}>Error fetching movies</Text>
      </View>
    );

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
  container: { flex: 1, padding: 15 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
