import axios from "axios";
import history from "../history";

//ACTION TYPE
const SET_USER_MOVIES = "SET_USER_MOVIES";
const ADD_MOVIE = "ADD_MOVIE";
const DELETE_MOVIE = "DELETE_MOVIE";

//ACTION CREATOR
const setUserMovies = (movies) => {
  return {
    type: SET_USER_MOVIES,
    movies,
  };
};

const _addUserMovie = (movie) => {
  return {
    type: ADD_MOVIE,
    movie,
  };
};

const _deleteMovie = (movie) => {
  return {
    type: DELETE_MOVIE,
    movie,
  };
};

//THUNKS
export const fetchUserMovies = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/shelf/${userId}`);
      dispatch(setUserMovies(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addUserMovie = (userId, movie) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/shelf/${userId}`, movie);
      dispatch(_addUserMovie(data));
      history.push(`/shelf/${userId}`);
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteUserMovie = (userId, movie) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/shelf/${userId}`, {data: movie});
      dispatch(_deleteMovie(data));
      history.push(`/shelf/${userId}`);
    } catch (err) {
      console.log(err);
    }
  };
};

//REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case SET_USER_MOVIES:
      return action.movies;
    case ADD_MOVIE:
      return [...state, action.movie];
    case DELETE_MOVIE:
      return state.filter((movie) => movie.id !== action.movie)
    default:
      return state;
  }
}
