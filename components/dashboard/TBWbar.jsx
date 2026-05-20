// Shows how many movies from the watchlist you have NOT watched yet
import { StyleSheet, Text, View } from "react-native";
import { sharedStyles } from "./chartConfig";

export default function TBWbar({ percent, toBeWatched, totalMovies, colors }) {
  return (
    <View style={[sharedStyles.section, { backgroundColor: colors.card }]}>
      <Text style={[sharedStyles.sectionTitle, { color: colors.highlight }]}>
        To Be Watched
      </Text>

      <View style={styles.barWrapper}>
        <View style={styles.labelRow}>
          <Text style={[styles.percentText, { color: colors.secondary }]}>
            {percent}% Left to Watch
          </Text>
          <Text style={[styles.fractionText, { color: colors.textLight }]}>
            {toBeWatched}/{totalMovies}
          </Text>
        </View>

        <View
          style={[styles.barBackground, { backgroundColor: colors.border }]}
        >
          <View
            style={[
              styles.barFill,
              {
                width: `${percent}%`,
                backgroundColor: colors.secondary,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  barWrapper: {
    paddingVertical: 12,
  },

  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 8,
  },

  percentText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  fractionText: {
    fontSize: 14,
  },

  barBackground: {
    height: 24,
    borderRadius: 12,
    overflow: "hidden",
  },

  barFill: {
    height: "100%",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },

  statusText: {
    fontSize: 13,
  },
});
