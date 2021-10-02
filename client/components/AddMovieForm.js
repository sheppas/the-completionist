import React from "react";
import { connect } from "react-redux";
import { addUserMovie } from "../store/userMovies";
import { fetchMovieTMDB } from "../store/oneMovie";

class AddMovieForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      rating:'',
      watched_date:'',
      notes:''
    }
  }

  handleChange(evt){
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  handleSubmit(event){
    event.preventDefault();
    const movieInDBFormat = this.createMovieDetails(this.props.oneMovie)
    this.props.addMovieToShelf(this.props.user.id, movieInDBFormat)
  }

  createMovieDetails(movie) {
    return {
      title: movie.title,
      db_id: movie.id,
      poster_path: movie.poster_path,
      rating:this.state.rating,
      watched_date:this.state.watched_date,
      notes:this.state.notes
    }
  }

  render(){
    const movie = this.props.oneMovie ? this.props.oneMovie : {};

    return (
      <div>
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} width='300' height='450' />
        <h2>{movie.title}</h2>
        <form onSubmit={(evt) => this.handleSubmit(evt)}>
          <label htmlFor="rating">Rating:</label>
          <input name="rating" onChange={this.handleChange} value={this.state.name} />
          <label htmlFor="notes">Notes:</label>
          <input type="date" name="watched_date" onChange={this.handleChange} value={this.state.watched_date} />
          <label htmlFor="notes">Notes:</label>
          <input name="notes" onChange={this.handleChange} value={this.state.notes} />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    oneMovie: state.oneMovie,
    user: state.auth,
    userMovies: state.userMovies
  }
}

const mapDispatch = (dispatch) => {
  return {
    getMovieTMDB: (db_id) => dispatch(fetchMovieTMDB(db_id)),
    addMovieToShelf: (userId, movie) => dispatch(addUserMovie(userId, movie))
  };
};

export default connect(mapState, mapDispatch)(AddMovieForm);
