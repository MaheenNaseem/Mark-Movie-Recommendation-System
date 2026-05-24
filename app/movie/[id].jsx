import axios from "axios";
import Constants from "expo-constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getTheme } from "../../constants/colors";
import { addMovie } from "../../store/slices/watchlistslice";

const API_KEY = Constants.expoConfig.extra.tmdbApiKey;
//const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

export default function MovieDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // for setting the theme according colors for the app
  const isDark = useSelector((state) => state.theme.isDark);
  const colors = getTheme(isDark);

  // for the redux toolkit
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlist.movies);

  useEffect(() => {
    if (!API_KEY || !id) return;

    // gets the movie from api
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/movie/${id}`, {
          params: {
            api_key: API_KEY,
            language: "en-US",
          },
        });

        setMovie(res.data);
        setError(null);
      } catch (err) {
        console.log("Error details:", err.response?.data || err.message);
        setError(err.response?.data?.status_message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  // to display error over the screen
  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: "red", textAlign: "center", padding: 20 }}>
          Error: {error}
        </Text>
      </View>
    );
  }

  //  runs when screen state is loading
  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.center}>
        <Text style={{ color: colors.white }}>No movie data available</Text>
      </View>
    );
  }

  // checks if the movie is already in the watchlist
  const isAlreadyAdded = watchlist.some((m) => m.id === movie?.id);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={[styles.backBtn, { backgroundColor: colors.secondary }]}
      >
        <Text style={[styles.backBtnText, { color: colors.highlight }]}>
          ← Back
        </Text>
      </TouchableOpacity>

      {movie.poster_path && (
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          style={styles.image}
        />
      )}

      <Text style={[styles.title, { color: colors.white }]}>{movie.title}</Text>

      <Text style={[styles.rating, { color: colors.highlight }]}>
        ⭐ {movie.vote_average?.toFixed(1)}
      </Text>

      <Text style={[styles.overview, { color: colors.textLight }]}>
        {movie.overview}
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isAlreadyAdded ? "gray" : colors.primary },
        ]}
        onPress={() => {
          if (!isAlreadyAdded) {
            dispatch(
              addMovie({
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                watched: false,
                // we save genres so we can add its stats in the dashboard
                genre_ids: movie.genres ? movie.genres.map((g) => g.id) : [],
              }),
            );
          }
        }}
      >
        <Text style={styles.buttonText}>
          {isAlreadyAdded ? "Added" : "Add to Watchlist"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => router.push(`/reviews/${movie.id}`)}
      >
        <Text style={[styles.buttonText]}>Go To Reviews</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 50,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: 400,
    borderRadius: 15,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
  },

  rating: {
    fontSize: 18,
    marginTop: 5,
  },

  overview: {
    fontSize: 16,
    marginTop: 10,
    lineHeight: 22,
  },

  button: {
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  backBtn: {
    position: "absolute",
    top: 10,
    left: 10,
    borderRadius: 10,
    padding: 10,
    zIndex: 10,
  },

  backBtnText: {
    fontWeight: "bold",
  },
});
