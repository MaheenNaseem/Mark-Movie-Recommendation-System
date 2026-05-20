import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getTheme } from "../../constants/colors";
import { removeMovie, toggleWatched } from "../../store/slices/watchlistslice";

export default function Watchlist() {
  const movies = useSelector((state) => state.watchlist.movies);
  const isDark = useSelector((state) => state.theme.isDark);
  const colors = getTheme(isDark);
  const dispatch = useDispatch();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.highlight }]}>
        My Watchlist
      </Text>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
              }}
              style={styles.image}
            />

            <View style={{ flex: 1 }}>
              <Text style={[styles.movieTitle, { color: colors.white }]}>
                {item.title}
              </Text>

              <Text style={[styles.status, { color: colors.textLight }]}>
                {item.watched ? "Watched" : "Not Watched"}
              </Text>

              <TouchableOpacity
                onPress={() => dispatch(toggleWatched(item.id))}
              >
                <Text style={[styles.action, { color: colors.secondary }]}>
                  Toggle Watched
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => dispatch(removeMovie(item.id))}>
                <Text style={styles.delete}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 20,
  },

  card: {
    flexDirection: "row",
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
  },

  image: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginRight: 10,
  },

  movieTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },

  status: {
    marginVertical: 5,
  },

  action: {
    marginTop: 5,
  },

  delete: {
    color: "red",
    marginTop: 5,
  },
});
