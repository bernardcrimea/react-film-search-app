import axios from "axios";
import { AUTH_SUCCESS, AUTH_LOGOUT } from "./actionTypes";

export function auth(email, password, isLogin) {
  return async (dispatch) => {
    const authData = { email, password, returnSecureToken: true };

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;

    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    }
    const responce = await axios.post(url, authData);
    const data = responce.data;

    const exporationDate = new Date(
      new Date().getTime() + data.expiresIn * 1000
    );

    localStorage.setItem("token", data.idToken);
    localStorage.setItem("user", data.localId);
    localStorage.setItem("exporationDate", exporationDate);

    dispatch(authSuccess(data.idToken));
    dispatch(autoLogout(data.expiresIn));
  };
}

export function autoLogin() {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout);
    } else {
      const exporationDate = new Date(localStorage.getItem("exporationDate"));
      if (exporationDate <= new Date()) {
        dispatch(logout);
      } else {
        dispatch(authSuccess(token));
        dispatch(
          autoLogout((exporationDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token,
  };
}

export function autoLogout(time) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("exporationDate");
  localStorage.removeItem("watched");
  localStorage.removeItem("watchlist");
  return {
    type: AUTH_LOGOUT,
  };
}
