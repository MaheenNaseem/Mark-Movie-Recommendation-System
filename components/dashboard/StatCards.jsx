import { StyleSheet, Text, View } from "react-native";

function StatCard({ title, value, colors }) {
  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Text style={[styles.cardTitle, { color: colors.textLight }]}>
        {title}
      </Text>
      <Text style={[styles.cardValue, { color: colors.highlight }]}>
        {value}
      </Text>
    </View>
  );
}

export default function StatCards({
  totalMovies,
  watchedMovies,
  averageRating,
  estimatedHours,
  totalReviews,
  colors,
}) {
  return (
    // react fragment to return multiple elements
    <>
      <View style={styles.row}>
        <StatCard
          title="WatchList"
          value={totalMovies}
          subtitle="movies saved"
          colors={colors}
        />
        <StatCard
          title="Watched"
          value={watchedMovies}
          subtitle={`of ${totalMovies}`}
          colors={colors}
        />
      </View>

      <View style={styles.row}>
        <StatCard
          title="Average Rating"
          value={averageRating !== "N/A" ? `${averageRating}/10` : "-"}
          subtitle={
            totalReviews > 0 ? `${totalReviews} reviews` : "no reviews yet"
          }
          colors={colors}
        />
        <StatCard
          title="Hours Watched"
          value={`${estimatedHours}h`}
          subtitle="2h per movie"
          colors={colors}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },

  card: {
    flex: 1,
    borderRadius: 14,
    padding: 15,
  },

  cardTitle: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 6,
  },

  cardValue: {
    fontSize: 26,
    fontWeight: "bold",
  },

  cardSubtitle: {
    fontSize: 12,
    marginTop: 4,
  },
});
