//Find one movie -- uses the direct movie URL format: https://api.themoviedb.org/3/movie/157336?api_key=964c3023860303f4cb3d17fa3814e4db

import axios from "axios"

//ACTION TYPE
const SET_MOVIE = "SET_MOVIE"

//ACTION CREATOR
const setMovie = (movie) => {
  return {
    type :SET_MOVIE,
    movie
  }
}

//THUNKS
export const fetchMovieTMDB = (db_id) => async (dispatch) => {
  try {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${db_id}?api_key=964c3023860303f4cb3d17fa3814e4db`);
    const movie = res.data;
    dispatch(setMovie(movie))
  } catch(err) {
    console.log(err)
  }
}

//REDUCER
export default function (state={}, action) {
  switch(action.type){
    case SET_MOVIE:
      return action.movie;
    default:
      return state;
  }
}
