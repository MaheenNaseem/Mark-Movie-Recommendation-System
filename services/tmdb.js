import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

export const fetchPopularMovies = async () => {
  try {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
      params: { api_key: API_KEY },
    });
    return res.data.results;
  } catch (e) {
    console.log("Fetch failed:", e.message);
    return [];
  }
};
