import { toggleTheme } from "@/store/slices/themeslice";
import { Drawer } from "expo-router/drawer";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getTheme } from "../../../constants/colors";

export default function MoviesDrawerLayout() {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);
  const colors = getTheme(isDark);

  return (
    <Drawer
      screenOptions={{
        drawerContentContainerStyle: {
          paddingTop: 50,
        },
        headerShown: true,

        drawerStyle: { backgroundColor: colors.card },
        drawerLabelStyle: { color: colors.white },
        headerStyle: { backgroundColor: colors.header },
        headerTintColor: colors.highlight,
        headerRight: () => (
          <TouchableOpacity
            style={styles.togglebtn}
            onPress={() => dispatch(toggleTheme())}
          >
            <Text style={styles.toggleText}>{isDark ? "☀️" : "🌙"}</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen name="index" options={{ title: "Popular Movies" }} />
      <Drawer.Screen
        name="trendingMovie"
        options={{ title: "Trending Movies" }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  togglebtn: {
    marginRight: 30,
  },
  toggleText: {
    fontSize: 30,
  },
});
