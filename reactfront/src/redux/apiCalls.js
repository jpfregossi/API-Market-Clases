
import { updateCredentialsStart, updateCredentialsSuccess, updateCredentialsSuccess2, getUserOrdersStart, getUserOrdersSuccess, getUserOrdersFailure, updateCredentialsFailure, loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure, newsletterregisterStart,  newsletterregisterSuccess, newsletterregisterFailure, checkCurrentPasswordStart, checkCurrentPasswordSuccess, checkCurrentPasswordFailure} from "./userRedux";
import { addCommentStart, addCommentSuccess, addCommentFailure, getCommentStart, getCommentSuccess, getCommentFailure, deleteCommentStart, deleteCommentSuccess, deleteCommentFailure, editCommentStart, editCommentSuccess, editCommentFailure, setEditModeStart, setEditModeSuccess, setEditModeFailure } from "./commentsratingsRedux";
import { registerClaseStart, registerClaseSuccess, registerClaseFailure, updateClaseStart, updateClaseSuccess, updateClaseFailure } from "./claseRedux";
import { userRequest, publicRequest } from "../requestMethods";
import { getTutorStart, getTutorSuccess, getTutorFailure, acceptContratacionStart, acceptContratacionSuccess, acceptContratacionFailure, acceptFeedbackStart, acceptFeedbackSuccess, acceptFeedbackFailure, blockFeedbackStart, blockFeedbackSuccess, blockFeedbackFailure }  from "./tutorRedux";

const CryptoJS = require("crypto-js");

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const unconfirmPassword = async (dispatch) => {
  dispatch(checkCurrentPasswordStart());
  try {
    dispatch(checkCurrentPasswordSuccess(null));
  } catch (err) {
    dispatch(checkCurrentPasswordFailure());
  }
};

export const checkCurrentPassword = async (dispatch, id, currentPassword) => {
  dispatch(checkCurrentPasswordStart());
  try {
    const res = await publicRequest.post("/auth/checkpassword", {id: id, currentPassword: currentPassword});
    dispatch(checkCurrentPasswordSuccess(res.data));
  } catch (err) {
    dispatch(checkCurrentPasswordFailure());
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};

export const addComment = async (dispatch, id, username, rating, text, token) => {
  dispatch(addCommentStart());
  try {
    userRequest.interceptors.request.use(function (config) {
      config.headers.Authentication =  token;
      return config;
    });
    console.log("id: " + id + " username: " + username +  " rating: " + rating + " text: " + text + " token: " + token);
    const res = await userRequest.post("/feedback", {
      clase_id: id,
      rating: rating,
      message: text,
      username: username
    });
    dispatch(addCommentSuccess(res.data));
  } catch (err) {
    dispatch(addCommentFailure());
  }
};

export const deleteComment = async (dispatch, commentid) => {
  dispatch(deleteCommentStart());
  try {
    const res = await publicRequest.delete(`/feedback/delete/${commentid}`);
    dispatch(deleteCommentSuccess(commentid));
  } catch (err) {
    dispatch(deleteCommentFailure());
  }
};


export const getCommentsratings = async (dispatch, id) => {
  dispatch(getCommentStart());
  try {
    const res = await publicRequest.get(`/feedback/find/${id}`);
    dispatch(getCommentSuccess(res.data));
  } catch (err) {
    dispatch(getCommentFailure());
  }
};

export const updateComment = async (dispatch, commentid, text, rating) => {
  dispatch(editCommentStart());
  try {
    const res = await publicRequest.put(`/feedback/update/${commentid}`, {
      text: text,
      rating: rating
    });
    dispatch(editCommentSuccess({commentid, text, rating}));
  } catch (err) {
    dispatch(editCommentFailure());
  }
};



export const setEditMode = async (dispatch) => {
  dispatch(setEditModeStart());
  try {
    dispatch(setEditModeSuccess());
  } catch (err) {
    dispatch(setEditModeFailure());
  }
};


export const updateCredentials = async (dispatch, id, type, username, email, password) => {
  dispatch(updateCredentialsStart())
  try {
    if (type === "username") {
      const res = await publicRequest.put("/auth/updateUsername", {id: id, username: username});
      dispatch(updateCredentialsSuccess(username))
    } else if (type === "email") {
      const res = await publicRequest.put("/auth/updateEmail", {id: id, email: email});
      dispatch(updateCredentialsSuccess2(email))
    } else if (type === "password") {
      const res = await publicRequest.put("/auth/updatePassword", {id: id, password: password});
    }   
  } catch (err) {
    dispatch(updateCredentialsFailure())
  }
};

export const newsletterregister = async (dispatch, user) => {
  dispatch(newsletterregisterStart());
  try {
    const res = await publicRequest.post("/auth/newsletterregister", user);
    dispatch(newsletterregisterSuccess(res.data));
  } catch (err) {
    dispatch(newsletterregisterFailure());
  }
};

export const getUserOrders = async (dispatch, token) => {
  dispatch(getUserOrdersStart());
  try {
    publicRequest.interceptors.request.use(function (config) {
      config.headers.Authentication =  token;
      return config;
    });
    const res = await publicRequest.get(`/orders/find`);
    dispatch(getUserOrdersSuccess(res.data));
  } catch (err) {
    dispatch(getUserOrdersFailure());
  }
};

export const getTutorClases = async (dispatch, token) => {
  dispatch(getTutorStart());
  try {
    userRequest.interceptors.request.use(function (config) {
      config.headers.Authentication =  token;
      return config;
    });
    const res = await userRequest.get(`/tutor/clases`);
    dispatch(getTutorSuccess(res.data));
  } catch (err) {
    dispatch(getTutorFailure());
  }
};

export const registerClase = async (dispatch, token, newClase) => {
  dispatch(registerClaseStart());
  try {
    userRequest.interceptors.request.use(function (config) {
      config.headers.Authentication =  token;
      return config;
    });
    const res = await userRequest.post("/clases/register", newClase);
    dispatch(registerClaseSuccess(res.data));
  } catch (err) {
    dispatch(registerClaseFailure());
  }
};



export const acceptContratacion = async (dispatch, id, action, token) => {
  dispatch(acceptContratacionStart());
  try {
    userRequest.interceptors.request.use(function (config) {
      config.headers.Authentication =  token;
      return config;
    });
    const req = { id: id, estado: action };
    const res = await userRequest.put(`/orders/update`, req);
    dispatch(acceptContratacionSuccess(res.data));
  } catch (err) {
    dispatch(acceptContratacionFailure());
  }
};

export const acceptFeedback = async (dispatch, id, token) => {
  dispatch(acceptFeedbackStart());
  try {
    userRequest.interceptors.request.use(function (config) {
      config.headers.Authentication =  token;
      return config;
    });
    const req = { id: id, estado: "ACEPTADO" };
    const res = await userRequest.put(`/feedback/accept`, req);
    dispatch(acceptFeedbackSuccess(res.data));
  } catch (err) {
    dispatch(acceptFeedbackFailure());
  }
};

export const blockFeedback = async (dispatch, id, msg, token) => {
  dispatch(blockFeedbackStart());
  try {
    userRequest.interceptors.request.use(function (config) {
      config.headers.Authentication =  token;
      return config;
    });
    const req = { id: id, message: msg };
    const res = await userRequest.put(`/feedback/block`, req);
    dispatch(blockFeedbackSuccess(res.data));
  } catch (err) {
    dispatch(blockFeedbackFailure());
  }
};
