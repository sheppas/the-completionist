/*What I want to happen: The search term is listed in the headline for search results. How do I ensure that it makes it from the search bar, to the request, and then here in the headline?*/


import React from "react"
import {connect} from "react-redux"
import { Link } from "react-router-dom"

class SearchResults extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    const movies = this.props.movies ? this.props.movies : []
    if (movies.length === 0) {
      return (
        <div>
          <h2>It appears these are not the droids you're looking for. Please search again.</h2>
        </div>
      );
    }
      return (
        <div>
          <h2>Your Search Results</h2>
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
    movies: state.searchResults
  }
}

export default connect(mapState)(SearchResults)
