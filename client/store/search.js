import axios from "axios";
import history from "../history";

//ACTION TYPE
const SET_RESULTS = "SET_RESULTS";

//ACTION CREATORS
const setResults = (movies) => {
  return {
    type: SET_RESULTS,
    movies,
  };
};


//THUNKS
export const searchMovies = (searchValue, history) => async (dispatch) => {
  try {
    const searchString = searchValue.split(' ').join('+')
    const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=964c3023860303f4cb3d17fa3814e4db&query=${searchString}`);
    const movies = res.data.results;
    dispatch(setResults(movies));
    history.push('/search-results')
    document.getElementById('search-input').value='';
  } catch (err) {
    console.log(err)
  }
}

//REDUCER
export default function (state=[], action) {
  switch(action.type){
    case SET_RESULTS:
      return action.movies
    default:
      return state
  }
}
