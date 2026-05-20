import { configureStore } from "@reduxjs/toolkit";
import { saveReviews } from "../utils/loggedreviews";
import { saveWatchlist } from "../utils/loggedwatchlist";
import reviewReducer from "./slices/reviewslice";
import themeReducer from "./slices/themeslice";
import watchlistReducer from "./slices/watchlistslice";

export const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
    reviews: reviewReducer,
    theme: themeReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveWatchlist(state.watchlist.movies);
  saveReviews(state.reviews.reviews);
});

export default store;
