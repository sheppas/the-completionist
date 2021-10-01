/*What I want to happen: The search term is listed in the headline for search results. How do I ensure that it makes it from the search bar, to the request, and then here in the headline?*/


import React from "react"
import {connect} from "react-redux"

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
    movies: state.searchResults
  }
}

export default connect(mapState)(SearchResults)
