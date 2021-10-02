import React from "react";
import { connect } from "react-redux";
import { fetchUserMovies } from "../store/userMovies";
import { Link } from "react-router-dom";
import { fetchMovieTMDB } from "../store/oneMovie";

class UserMoviesListing extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      myMovies: []
    }
  }

  componentDidMount() {
    this.props.getMovies(this.props.match.params.userId);
  }

  render() {
    const yourMovies = this.props.yourMovies ? this.props.yourMovies : []

    if (yourMovies.length === 0) {
      return (
        <div>
          <h2>Well, what are you waiting for? Add a movie!</h2>
           {/* BEFORE I CAN DO THIS, I HAVE TO FIGURE OUT HOW TO FIX THE LINKING <p>Check out some others:</p>
          <MovieListing /> */}
        </div>
      )
    }

    return (
      <div>
        <h2>Your Movies</h2>
        {yourMovies.map((movie) => (
          <div key={movie.id} className='individual-users-movie'>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} width='150' height='225'/>
            <p>{movie.title}</p>
            <p>Watched: {movie.watched_date}</p>
            <h3>Your Notes</h3>
            <p>{movie.notes}</p>
          </div>
        ))}
    </div>
    );
  }
}

const mapState = (state) => {
  return {
    yourMovies: state.userMovies,
    TMDBMovie: state.oneMovie
  }
}

const mapDispatch = (dispatch) => {
  return {
    getMovies: (userId) => dispatch(fetchUserMovies(userId)),
  }
}

export default connect(mapState, mapDispatch)(UserMoviesListing)
