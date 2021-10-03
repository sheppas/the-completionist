import axios from "axios";
//URIs
const popularMovies =
  "https://api.themoviedb.org/3/movie/popular?api_key=964c3023860303f4cb3d17fa3814e4db";

//ACTION TYPES
const SET_MOVIES = "SET_MOVIES";

//ACTION CREATORS
const setMovies = (movies) => {
  return {
    type: SET_MOVIES,
    movies,
  };
};

//THUNKS
export const fetchMovies = () => async (dispatch) => {
  try {
    const res = await axios.get(popularMovies);
    const movies = res.data.results;
    dispatch(setMovies(movies));
  } catch (err) {
    console.log(err);
  }
};

//REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.movies;
    default:
      return state;
  }
}
