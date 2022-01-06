import React from "react";
import { connect } from "react-redux";
import { fetchMovieTMDB } from "../store/oneMovie";
import { fetchUserMovies } from "../store/userMovies";
import { Link } from "react-router-dom";

class SingleMovie extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getMovieTMDB(this.props.match.params.movieId);
  }

  render() {
    const movie = this.props.movie ? this.props.movie : {};
    const releaseDate = movie.release_date

    if (!movie.id) {
      return (
        <div>
          <hr />
          <h2>Hey, it looks like we can't find this movie!</h2>
          <p>
            Let us know what's missing by emailing us at{" "}
            <a href='mailto:moviehelp@thecompletionist.com'>
              moviehelp@thecompletionist.com
            </a>
          </p>
        </div>
      );
    }
    return (
      <div>
        <hr />
        <div className='movie-details'>
          <div className='img-and-add'>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              width='300'
              height='450'
            />
          </div>
          <div className='text-and-link'>
            <h2>{movie.title} ({releaseDate.slice(0,4)})</h2>
            <p>{movie.overview}</p>
            <div>
              <a
                href={`https://www.themoviedb.org/movie/${movie.id}-${movie.title}`}
                target='_blank'
                className='external-link'
              >
                Learn more at TMDB
              </a>
            </div>
            <Link to={"/add-movie"}>
              <button>Add to My Movies</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    movie: state.oneMovie,
    user: state.auth,
    userMovies: state.userMovies,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getMovieTMDB: (db_id) => dispatch(fetchMovieTMDB(db_id)),
    getUserMovies: (userId) => dispatch(fetchUserMovies(userId))
  };
};

export default connect(mapState, mapDispatch)(SingleMovie);
