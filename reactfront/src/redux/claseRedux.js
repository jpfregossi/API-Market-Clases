import { createSlice } from "@reduxjs/toolkit";

const claseSlice = createSlice({
  name: "clases",
  initialState: {
    clase: null,
    editmode: false
  },
  reducers: {
    registerClaseStart: (state) => {
      state.isFetching = true;
    },
    registerClaseSuccess: (state, action) => {
      state.isFetching = false;
      state.clase.push(action.payload)
      state.error = false;
    },
    registerClaseFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateClaseStart: (state) => {
      state.isFetching = true;
    },
    updateClaseSuccess: (state, action) => {
      state.isFetching = false;
      state.clase.splice(
        state.clase.findIndex((clase) => clase._id === action.payload),
        1
      );
    },
    updateClaseFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { registerClaseStart, registerClaseSuccess, registerClaseFailure, updateClaseStart, updateClaseSuccess, updateClaseFailure } = claseSlice.actions;

export default claseSlice.reducer;