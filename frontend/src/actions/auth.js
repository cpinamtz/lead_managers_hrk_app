import axios from 'axios';
import { createMessage, returnErrors } from './messages';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_SUCCESS
} from "./types";

//LOAD USER
export const loadUser = () => (dispatch, getState) => {
  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    }).catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

//LOGIN USER
export const login = (username, password) => dispatch => {

  //Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ username, password });

  axios.post('/api/auth/login', body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

//UPDATE USER
export const updateUser = user => (dispatch, getState) => {

  axios.patch('/api/auth/user', user, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ updateUser: "User updated" }));
      dispatch({
        type: UPDATE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

//REGISTER USER
export const register = ({ username, password, email }) => dispatch => {

  //Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ username, email, password });

  axios.post('/api/auth/register', body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  axios
    .post('/api/auth/logout', null, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    }).catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Setup config with token - helper function
export const tokenConfig = getState => {
  // Get token from state (it comes from localStorage)
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;

};