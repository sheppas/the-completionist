import React from "react";
import { connect } from "react-redux";
import { fetchMovies } from "../store/popularMovies";
import { Link } from "react-router-dom";


class MovieListing extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getMoviesTMDB();
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
          <div id="hero">
            <div>
              <h1>Welcome to The Completionist</h1>
              <p id="hero-text">Your tracker...for everything</p>
            </div>
          </div>
          <h2 className="headline">What We're Watching</h2>
          <div className="listed-movies">
          {movies.map((movie) => (
            <div key={movie.id} className='individual-movie'>
              <Link to={`/movies/${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} width='150' height='225'/>
              <p>{movie.title}</p>
              </Link>
            </div>
          ))}
          </div>
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
