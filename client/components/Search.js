import React from "react"
import {connect} from "react-redux"
import { searchMovies } from "../store/search"
import history from "../history"


class SearchFunction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: "",
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.search(this.state.query)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }


  //Ideas for "YOUR SEARCH TERM" pass query as prop to a child component...or another state
  //Use a ternary within handle submit, have a state called query-submitted. If there's something in query-submitted, it shows right under the search bar and "acts" like the headline
  //Change the reducer to be an object containing an array and a search term
  render(){
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} name="search">
          <label className="search-label" htmlFor="search-input">Find a Movie</label>
          <input
            name="query"
            type="text"
            value={this.state.query}
            id="search-input"
            placeholder="Search..."
            onChange={this.handleChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    )

  }
}


const mapDispatch = (dispatch) => {
  return {
      search: (query) => dispatch(searchMovies(query, history))
  }
}

export const Search = connect(null, mapDispatch)(SearchFunction)
