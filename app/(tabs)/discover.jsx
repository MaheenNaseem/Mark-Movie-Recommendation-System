import Constants from "expo-constants";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import MovieCard from "../../components/MovieCard";
import { getTheme } from "../../constants/colors";

const API_KEY = Constants.expoConfig.extra.tmdbApiKey;

export default function DiscoverScreen() {
  // gets the current theme enabled
  const isDark = useSelector((state) => state.theme.isDark);
  const colors = getTheme(isDark);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // searches for the movie from api
  const searchMovies = async () => {
    if (!query.trim()) return; // trims the query

    // sets use states
    setLoading(true);
    setSearched(true);

    // if success full then save results
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch (e) {
      console.log("Search error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.highlight }]}>
        Discover
      </Text>

      <View style={[styles.searchRow, { backgroundColor: colors.card }]}>
        <TextInput
          placeholder="Search movies..."
          placeholderTextColor={colors.textLight}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={searchMovies}
          style={[styles.input, { color: colors.white }]}
        />
        <TouchableOpacity
          onPress={searchMovies}
          style={[styles.searchBtn, { backgroundColor: colors.primary }]}
        >
          <Text style={{ color: colors.white, fontWeight: "bold" }}>
            Search
          </Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <ActivityIndicator
          size="large"
          color={colors.secondary}
          style={{ marginTop: 30 }}
        />
      )}

      {!loading && searched && results.length === 0 && (
        <Text style={[styles.emptyText, { color: colors.textLight }]}>
          No movies found. Try a different search!
        </Text>
      )}

      {!loading && !searched && (
        <Text style={[styles.emptyText, { color: colors.textLight }]}>
          Search for any movie above
        </Text>
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
        showsVerticalScrollIndicator={false}
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
    marginBottom: 15,
    marginTop: 20,
  },
  searchRow: {
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 15,
  },
  searchBtn: {
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 15,
  },
});
