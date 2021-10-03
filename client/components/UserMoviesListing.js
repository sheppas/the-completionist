import React from "react";
import { connect } from "react-redux";
import { deleteUserMovie, fetchUserMovies } from "../store/userMovies";
import { Link } from "react-router-dom";
import { fetchMovieTMDB } from "../store/oneMovie";
import dateFormat from "dateformat";

class UserMoviesListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myMovies: [],
    };
  }

  componentDidMount() {
    this.props.getMovies(this.props.match.params.userId);
  }

  componentDidUpdate() {
    this.props.getMovies(this.props.match.params.userId);
  }

  render() {
    const yourMovies = this.props.yourMovies ? this.props.yourMovies : [];
    const userId = this.props.match.params.userId;

    if (yourMovies.length === 0) {
      return (
        <div>
          <h2>Well, what are you waiting for? Add a movie!</h2>
          {/* BEFORE I CAN DO THIS, I HAVE TO FIGURE OUT HOW TO FIX THE LINKING <p>Check out some others:</p>
          <MovieListing /> */}
        </div>
      );
    }

    return (
      <div>
        <hr />
        <div>
          <h2>Your Movies</h2>
          <div className='listed-user-movies'>
            {yourMovies.map((movie) => (
              <div key={movie.id} className='individual-user-movie'>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  width='150'
                  height='225'
                />
                <div id='indiv-user-movie-text'>
                  <h3>{movie.title}</h3>
                  <p>Rating: {movie.rating} out of 5</p>
                  <p>Watched: {dateFormat(movie.watched_date, "mmmm d, yyyy")}</p>
                  <p id="user-notes">Your Notes: {movie.notes}</p>
                  <div id='user-movie-button'>
                    <Link to={`/edit-movie/${movie.id}`}>
                      <button>Edit Movie</button>
                    </Link>
                    <button
                      onClick={() => {
                        this.props.deleteMovie(userId, movie);
                      }}
                    >
                      Delete Movie
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    yourMovies: state.userMovies,
    TMDBMovie: state.oneMovie,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getMovies: (userId) => dispatch(fetchUserMovies(userId)),
    deleteMovie: (userId, movie) => dispatch(deleteUserMovie(userId, movie)),
  };
};

export default connect(mapState, mapDispatch)(UserMoviesListing);
