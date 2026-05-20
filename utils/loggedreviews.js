import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "REVIEWS_DATA";

export const saveReviews = async (reviews) => {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(reviews));
  } catch (e) {
    console.log("Save reviews error:", e);
  }
};

export const loadReviews = async () => {
  try {
    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.log("Load reviews error:", e);
    return [];
  }
};
