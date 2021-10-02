import axios from "axios";
import history from "../history";

//ACTION TYPE
const SET_USER_MOVIE = "SET_USER_MOVIE";
const EDIT_USER_MOVIE = "EDIT_USER_MOVIE";

//ACTION CREATOR
const _editUserMovie = (movie) => {
  return {
    type: EDIT_USER_MOVIE,
    movie
  }
}

const _setUserMovie = (movie) => {
  return {
    type: SET_USER_MOVIE,
    movie

  }
}

//THUNK
export const fetchUserMovie = (movieId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/movies/${movieId}`)
      dispatch(_setUserMovie(data));
    } catch (err) {
      console.log(err)
    }
  }
}

export const editUserMovie = (movie, userId) => {
  return async (dispatch) => {
    try {
      console.log("this is the movie", movie)
      const {data : updated} = await axios.put(`/api/movies/${movie.id}`, movie);
    dispatch(_editUserMovie(updated));
    history.push(`shelf/${userId}`)
    } catch (err) {
      console.log(err)
    }
  }
}

//REDUCER
export default function (state = {}, action) {
  switch (action.type) {
    case SET_USER_MOVIE:
      return action.movie;
    case EDIT_USER_MOVIE:
      return action.movie;
    default:
      return state;
  }
}
