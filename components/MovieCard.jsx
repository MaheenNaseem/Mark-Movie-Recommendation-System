import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { getTheme } from "../constants/colors";

export default function MovieCard({ movie }) {
  const router = useRouter();
  // const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);
  const colors = getTheme(isDark);

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={() => router.push(`/movie/${movie.id}`)}
    >
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }}
        style={styles.image}
      />

      <Text style={[styles.title, { color: colors.white }]}>{movie.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 12,
  },

  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },

  title: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "bold",
  },
});
