import AsyncStorage from "@react-native-async-storage/async-storage";
// used to prevent watchlist from disappering

const KEY = "WATCHLIST_DATA";

export const saveWatchlist = async (movies) => {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(movies));
  } catch (e) {
    console.log("Save error:", e);
  }
};

// Load
export const loadWatchlist = async () => {
  try {
    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.log("Load error:", e);
    return [];
  }
};
