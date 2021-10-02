import React from "react";
import { connect } from "react-redux";
import { fetchMovies } from "../store/popularMovies";
import { Link } from "react-router-dom";

class MovieListing extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getMoviesTMDB();
  }

  handleSubmit(event){
    event.preventDefault();
    //ADD MOVIE THUNK TBD
  }

  render() {
    const movies = this.props.movies ? this.props.movies : []

    if (movies.length === 0) {
      return (
        <div>
          <h2>...Loading...</h2>
        </div>
      );
    }
      return (
        <div>
          <h2>What We're Watching</h2>
          {movies.map((movie) => (
            <div key={movie.id} className='individual-movie'>
              <Link to={`/movies/${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} width='150' height='225'/>
              <p>{movie.title}</p>
              </Link>
            </div>
          ))}
        </div>
      );
    }
  }

const mapState = (state) => {
  return {
    movies: state.movies,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getMoviesTMDB: () => dispatch(fetchMovies()),
  };
};

export default connect(mapState, mapDispatch)(MovieListing)
