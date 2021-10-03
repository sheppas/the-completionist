import React from "react";
import { connect } from "react-redux";
import { editUserMovie, fetchUserMovie } from "../store/oneUserMovie";

class EditMovie extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      rating:"",
      watched_date:"",
      notes:""
      //NEED THE ABOVE TO BE ONE USER MOVIE'S DETAILS
    }
  }

  componentDidMount(){
    this.props.getMovie(this.props.match.params.movieId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.oneMovie.id !== this.props.oneMovie.id) {
      this.setState({
        rating: this.props.oneMovie.rating|| "",
        watched_date: this.props.oneMovie.watched_date || "",
        notes: this.props.oneMovie.notes || "",
      });
    }
  }


  handleChange(evt){
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  handleSubmit(event){
    event.preventDefault();
    console.log("these are the props", this.props.oneMovie)
    const movieInDBFormat = this.createMovieDetails(this.props.oneMovie)
    this.props.editMovie(movieInDBFormat, this.props.user.id, )
  }

  createMovieDetails(movie) {
    return {
      id:movie.id,
      title: movie.title,
      //THE WRONG ID NUMBER IS PULLING IN BELOW, NOT SURE HOW TO FIX ATM
      db_id: movie.db_id,
      poster_path: movie.poster_path,
      rating:this.state.rating,
      watched_date:this.state.watched_date,
      notes:this.state.notes
    }

  }

  render(){
    const movie = this.props.oneMovie ? this.props.oneMovie : {};
    const {rating, watched_date, notes} = this.state

    if(movie === {}) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      )
    }
    return (
      <div>
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} width='300' height='450' />
        <h2>{movie.title}</h2>
        <form onSubmit={(evt) => this.handleSubmit(evt)}>
          <label htmlFor="rating">Rating:</label>
          <input name="rating" onChange={this.handleChange} value={rating} />
          <label htmlFor="notes">Notes:</label>
          <input type="date" name="watched_date" onChange={this.handleChange} value={watched_date} />
          <label htmlFor="notes">Notes:</label>
          <input name="notes" onChange={this.handleChange} value={notes} />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    oneMovie: state.oneUserMovie,
    user: state.auth,
    TMBDMovie: state.oneMovie
  }
}

const mapDispatch = (dispatch) => {
  return {
    getMovie: (id) => dispatch(fetchUserMovie(id)),
    editMovie: (movie, userId) => dispatch(editUserMovie(movie, userId))
  };
};

export default connect(mapState, mapDispatch)(EditMovie);
