import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: { movies: [] }, // Fixed: Wrap movies array in an object
  reducers: {
    addMovie: (state, action) => {
      const exists = state.movies.find((m) => m.id === action.payload.id);

      if (!exists) {
        state.movies.push(action.payload);
      }
    },

    removeMovie: (state, action) => {
      state.movies = state.movies.filter((m) => m.id !== action.payload);
    },

    toggleWatched: (state, action) => {
      const movie = state.movies.find((m) => m.id === action.payload);

      if (movie) {
        movie.watched = !movie.watched;
      }
    },
    setInitialState: (state, action) => {
      state.movies = action.payload;
    },
  },
});

export const { addMovie, removeMovie, toggleWatched, setInitialState } =
  watchlistSlice.actions;

export default watchlistSlice.reducer;
