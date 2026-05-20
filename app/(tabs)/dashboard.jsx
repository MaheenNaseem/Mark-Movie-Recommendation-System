import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import GenreChart from "../../components/dashboard/GenreChart";
import RatingsChart from "../../components/dashboard/RatingsCard";
import StatCards from "../../components/dashboard/StatCards";
import TBWbar from "../../components/dashboard/TBWbar";
import { getTheme } from "../../constants/colors";

export default function DashboardScreen() {
  // gets the current theme enabled
  const isDark = useSelector((state) => state.theme.isDark);
  const colors = getTheme(isDark);

  // gets data from redux slice
  const movies = useSelector((state) => state.watchlist.movies);
  const reviews = useSelector((state) => state.reviews.reviews);

  // process calculations here, call the graphs and pass them the value
  const totalMovies = movies.length;
  const watchedMovies = movies.filter((m) => m.watched).length;
  const totalReviews = reviews.length;
  const toBeWatchedMovies = totalMovies - watchedMovies; // Movies not watched yet
  const estimatedHours = watchedMovies * 2;

  // calculates average ratings
  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((sum, r) => sum + Number(r.rating), 0) / totalReviews
        ).toFixed(1)
      : "N/A";

  const toBeWatchedPercent =
    totalMovies > 0 ? Math.round((toBeWatchedMovies / totalMovies) * 100) : 0;

  // runs when there are no movies in the watch list
  if (totalMovies === 0) {
    return (
      <View
        style={[styles.emptyContainer, { backgroundColor: colors.background }]}
      >
        <Text style={{ fontSize: 60 }}></Text>
        <Text style={[styles.emptyTitle, { color: colors.highlight }]}>
          No stats yet!
        </Text>
        <Text style={[styles.emptyText, { color: colors.textLight }]}>
          Add movies to your watchlist and mark them as watched to see your
          analytics and charts here.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.heading, { color: colors.highlight }]}>
        Dashboard
      </Text>

      {/* displays the stat card from components */}
      <StatCards
        totalMovies={totalMovies}
        watchedMovies={watchedMovies}
        averageRating={averageRating}
        totalReviews={totalReviews}
        estimatedHours={estimatedHours}
        colors={colors}
      />

      {/* displays the to be watched bar graph from components */}

      <TBWbar
        toBeWatched={toBeWatchedMovies}
        totalMovies={totalMovies}
        percent={toBeWatchedPercent}
        colors={colors}
      />

      {/* displays the ratings bar chart from components */}
      <RatingsChart reviews={reviews} isDark={isDark} colors={colors} />

      {/* displays the genre chart from components */}
      <GenreChart movies={movies} isDark={isDark} colors={colors} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },

  content: {
    padding: 15,
    paddingBottom: 40,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 15,
  },

  emptyText: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
});
