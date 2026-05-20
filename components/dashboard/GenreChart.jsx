import { Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { buildChartConfig, SCREEN_WIDTH, sharedStyles } from "./chartConfig";

const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const PIE_COLORS = [
  "#AF47D2",
  "#FF8F00",
  "#FFDB00",
  "#26C6DA",
  "#EF5350",
  "#66BB6A",
  "#AB47BC",
  "#FFA726",
];

export default function GenreChart({ movies, isDark, colors }) {
  const chartConfig = buildChartConfig(isDark, colors);

  const genreCount = {};
  movies
    .filter((m) => m.watched && m.genre_ids)
    .forEach((m) => {
      m.genre_ids.forEach((gid) => {
        const name = GENRE_MAP[gid] || "Other";
        genreCount[name] = (genreCount[name] || 0) + 1;
      });
    });

  const topGenres = Object.entries(genreCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const pieChartData = topGenres.map(([name, count], index) => ({
    name,
    population: count,
    color: PIE_COLORS[index % PIE_COLORS.length],
    legendFontColor: colors.textLight,
    legendFontSize: 12,
  }));

  if (pieChartData.length === 0) {
    return (
      <View style={[sharedStyles.section, { backgroundColor: colors.card }]}>
        <Text style={[sharedStyles.sectionTitle, { color: colors.highlight }]}>
          Genre Breakdown
        </Text>
        <Text
          style={[sharedStyles.emptyChartText, { color: colors.textLight }]}
        >
          Mark movies as watched to see your genre breakdown here.{"\n\n"}
          Genre data is saved when you add movies from the detail screen.
        </Text>
      </View>
    );
  }

  return (
    <View style={[sharedStyles.section, { backgroundColor: colors.card }]}>
      <Text style={[sharedStyles.sectionTitle, { color: colors.highlight }]}>
        Genre Breakdown
      </Text>
      <Text style={[sharedStyles.chartCaption, { color: colors.textLight }]}>
        Genres from your watched movies
      </Text>

      <PieChart
        data={pieChartData}
        width={SCREEN_WIDTH - 62}
        height={200}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        style={sharedStyles.chart}
      />
    </View>
  );
}
