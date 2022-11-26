import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    error2: false,
    confirmedPassword: null,
    orders: [],
  },
  reducers: {
    loginStart: (state) => {
      console.log("Iniciando login");
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      console.log("Error en loginFailure");
    },
    registerStart: (state) => {
      console.log("Iniciando registro");
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    registerFailure: (state) => {
      state.isFetching = false;
      state.error2 = true;
    },
    newsletterregisterStart: (state) => {
      console.log("Iniciando newsletter registro");
      state.isFetching = true;
    },
    newsletterregisterSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    newsletterregisterFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      console.log("Error en newsletterregisterFailure");
    },
    checkCurrentPasswordStart: (state) => {
      console.log("Iniciando checkeo password");
      state.isFetching = true;
    },
    checkCurrentPasswordSuccess: (state, action) => {
      state.isFetching = false;
      state.confirmedPassword = action.payload;
      state.error = false;
    },
    checkCurrentPasswordFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      console.log("Error en checkCurrentPasswordFailure");
    },
    updateCredentialsStart: (state) => {
      console.log("Iniciando update credencial");
      state.isFetching = true;
    },
    updateCredentialsSuccess: (state, action) => {
      state.isFetching = false;
      state.confirmedPassword = null;
      state.currentUser.username = action.payload;
      state.error = false;
    },
    updateCredentialsSuccess2: (state, action) => {
      state.isFetching = false;
      state.confirmedPassword = null;
      state.currentUser.email = action.payload;
      state.error = false;
    },
    updateCredentialsSuccess3: (state, action) => {
      state.isFetching = false;
      state.confirmedPassword = null;
      state.currentUser.password = action.payload;
      state.error = false;
    },
    updateCredentialsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      console.log("Error en updateCredentialsFailure");
    },
    getUserOrdersStart: (state) => {
      console.log("Iniciando orden");
      state.isFetching = true;
      state.error = false;
    },
    getUserOrdersSuccess: (state, action) => {
      state.isFetching = false;
      state.orders = action.payload;
    },
    getUserOrdersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      console.log("Error en getUserOrdersFailure");
    },
    editOrderStart: (state) => {
      console.log("Iniciando edit orden");
      state.isFetching = true;
    },
    resetPasswordStart: (state) => {
      console.log("Iniciando reset pwd");
      state.isFetching = true;
    },
    resetPasswordSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
    },
    resetPasswordFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      console.log("Error en resetPasswordFailure");
    },
  },
});

export const { getUserOrdersStart, getUserOrdersSuccess, getUserOrdersFailure, updateCredentialsStart, updateCredentialsSuccess, updateCredentialsSuccess2, updateCredentialsSuccess3, updateCredentialsFailure, checkCurrentPasswordStart, checkCurrentPasswordSuccess, checkCurrentPasswordFailure, loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure, newsletterregisterStart,  newsletterregisterSuccess, newsletterregisterFailure, resetPasswordStart, resetPasswordSuccess, resetPasswordFailure } = userSlice.actions;

export default userSlice.reducer;