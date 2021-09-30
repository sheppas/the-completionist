import React from "react"
import {connect} from "react-redux"
import { searchMovies } from "../store/search"


const SearchFunction = (props) => {
  return (
    <div>
      <label htmlFor="search">Find a Movie</label>
      <input type="text"/>
      <button type="submit">Search</button>
    </div>
  )
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const searchTerm = evt.target.value
      dispatch(searchMovies(searchTerm))
    }
  }
}

export const Search = connect(null, mapDispatch)(SearchFunction)
