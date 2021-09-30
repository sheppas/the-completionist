import React from "react";
import { connect } from "react-redux";
import { fetchMovies } from "../store/popularMovies";

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
      console.log(movies)
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
              <p>{movie.title}</p>
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
