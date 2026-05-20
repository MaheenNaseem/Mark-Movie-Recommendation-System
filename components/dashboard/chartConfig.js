// for adjustin screen width according to the chart
import { Dimensions, StyleSheet } from "react-native";

export const SCREEN_WIDTH = Dimensions.get("window").width;

export function buildChartConfig(isDark, colors) {
  return {
    backgroundColor: colors.card,
    backgroundGradientFrom: colors.card,
    backgroundGradientTo: colors.card,
    decimalPlaces: 0,
    // The bar/line colour — purple from our theme
    color: (opacity = 1) => `rgba(175, 71, 210, ${opacity})`,
    // Label colour changes based on dark/light mode
    labelColor: (opacity = 1) =>
      isDark
        ? `rgba(234, 234, 234, ${opacity})`
        : `rgba(85, 85, 85, ${opacity})`,
    style: { borderRadius: 14 },
    propsForBackgroundLines: { stroke: colors.border },
  };
}

export const sharedStyles = StyleSheet.create({
  // for the cards spacing
  section: {
    borderRadius: 14,
    padding: 15,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },

  // charts decor
  chart: {
    borderRadius: 10,
    marginTop: 6,
    alignSelf: "center",
  },

  chartCaption: {
    fontSize: 12,
    marginBottom: 2,
  },

  emptyChartText: {
    fontSize: 13,
    lineHeight: 20,
    paddingVertical: 8,
  },
});
