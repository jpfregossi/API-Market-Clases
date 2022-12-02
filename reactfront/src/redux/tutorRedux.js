import { createSlice } from "@reduxjs/toolkit";

const tutorSlice = createSlice({
  name: "tutor",
  initialState: {
    clases: null,
    editmode: false,
    otro: false,
  },
  reducers: {
    getTutorStart: (state) => {
      state.isFetching = true;
    },
    getTutorSuccess: (state, action) => {
      state.isFetching = false;
      state.clases = action.payload;
      state.error = false;
    },
    getTutorFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    acceptContratacionStart: (state) => {
      state.isFetching = true;
    },
    acceptContratacionSuccess: (state, action) => {
      state.isFetching = false;
      state.clases = action.payload;
      state.error = false;
    },
    acceptContratacionFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    acceptFeedbackStart: (state) => {
      state.isFetching = true;
    },
    acceptFeedbackSuccess: (state, action) => {
      state.isFetching = false;
      state.clases = action.payload;
      state.error = false;
    },
    acceptFeedbackFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    blockFeedbackStart: (state) => {
      state.isFetching = true;
    },
    blockFeedbackSuccess: (state, action) => {
      state.isFetching = false;
      state.clases = action.payload;
      state.error = false;
    },
    blockFeedbackFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    registerClaseStart: (state) => {
      state.isFetching = true;
    },
    registerClaseSuccess: (state, action) => {
      state.isFetching = false;
      state.clases = action.payload;
      state.error = false;
    },
    registerClaseFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { getTutorStart, getTutorSuccess, getTutorFailure, acceptContratacionStart, acceptContratacionSuccess, acceptContratacionFailure, acceptFeedbackStart, acceptFeedbackSuccess, acceptFeedbackFailure, blockFeedbackStart, blockFeedbackSuccess, blockFeedbackFailure, registerClaseStart, registerClaseSuccess, registerClaseFailure } = tutorSlice.actions;

export default tutorSlice.reducer;