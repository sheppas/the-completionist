import React from "react";
import { connect } from "react-redux";
import { fetchMovieTMDB } from "../store/oneMovie";
import MovieListing from "./MovieListing";

class SingleMovie extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getMovieTMDB(this.props.match.params.movieId);
  }

  render() {
    const movie = this.props.movie ? this.props.movie : {};

    if (!movie.id) {
      return (
        <div>
          <h2>Hey, it looks like we can't find this movie!</h2>
          <p>
            Let us know what's missing by emailing us at {" "}
            <a href='mailto:moviehelp@thecompletionist.com'>
              moviehelp@thecompletionist.com
            </a>
            .
          </p>
          {/* BEFORE I CAN DO THIS, I HAVE TO FIGURE OUT HOW TO FIX THE LINKING <p>Check out some others:</p>
          <MovieListing /> */}
        </div>
      );
    }
    return (
      <div>
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <div>
          <a
            href={`https://www.themoviedb.org/movie/${movie.id}-${movie.title}`}
            target='_blank'
          >
            Learn more at TMDB
          </a>
        </div>
        <button>Add to My Movies</button>
      </div>
    );
  }
}

const mapState = (state) => {
  console.log(state);
  return {
    movie: state.oneMovie,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getMovieTMDB: (db_id) => dispatch(fetchMovieTMDB(db_id)),
  };
};

export default connect(mapState, mapDispatch)(SingleMovie);
