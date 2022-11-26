import { createSlice } from "@reduxjs/toolkit";

const claseSlice = createSlice({
  name: "clases",
  initialState: {
    clase: null,
    editmode: false
  },
  reducers: {
  },
});

export const {  } = claseSlice.actions;

export default claseSlice.reducer;