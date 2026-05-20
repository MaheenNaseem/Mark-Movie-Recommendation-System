import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "reviews",
  initialState: { reviews: [] },

  reducers: {
    addReview: (state, action) => {
      state.reviews.push(action.payload);
    },

    deleteReview: (state, action) => {
      state.reviews = state.reviews.filter((r) => r.id !== action.payload);
    },

    updateReview: (state, action) => {
      const index = state.reviews.findIndex((r) => r.id === action.payload.id);

      if (index !== -1) {
        state.reviews[index] = action.payload;
      }
    },
    setInitialReviews: (state, action) => {
      state.reviews = action.payload;
    },
  },
});

export const { addReview, deleteReview, updateReview, setInitialReviews } =
  reviewSlice.actions;

export default reviewSlice.reducer;
