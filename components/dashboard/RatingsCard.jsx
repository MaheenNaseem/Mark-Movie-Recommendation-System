// uses a bar chart to show how many movies the user gace rating

import { Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { buildChartConfig, SCREEN_WIDTH, sharedStyles } from "./chartConfig";

export default function RatingChart({ reviews, isDark, colors }) {
  const chartConfig = buildChartConfig(isDark, colors);

  const ratingBuckets = Array(10).fill(0);
  reviews.forEach((r) => {
    const val = Math.round(Number(r.rating));
    if (val >= 1 && val <= 10) {
      ratingBuckets[val - 1] += 1;
    }
  });

  const barChartData = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [{ data: ratingBuckets }],
  };

  if (reviews.length === 0) {
    return (
      <View style={[sharedStyles.section, { backgroundColor: colors.card }]}>
        <Text style={[sharedStyles.sectionTitle, { color: colors.highlight }]}>
          Rating Distribution
        </Text>
        <Text
          style={[sharedStyles.emptyChartText, { color: colors.textLight }]}
        >
          Write reviews with ratings to see your rating chart here.
        </Text>
      </View>
    );
  }

  return (
    <View style={[sharedStyles.section, { backgroundColor: colors.card }]}>
      <Text style={[sharedStyles.sectionTitle, { color: colors.highlight }]}>
        ⭐ Rating Distribution
      </Text>
      <Text style={[sharedStyles.chartCaption, { color: colors.textLight }]}>
        How many movies you gave each score
      </Text>

      <BarChart
        data={barChartData}
        width={SCREEN_WIDTH - 62}
        height={210}
        chartConfig={chartConfig}
        fromZero
        showValuesOnTopOfBars
        withInnerLines={false}
        style={sharedStyles.chart}
      />
    </View>
  );
}
