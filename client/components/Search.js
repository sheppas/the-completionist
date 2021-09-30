import React from "react"
import {connect} from "react-redux"


const Search = (props) => {
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
      console.log(searchTerm)
      // dispatch(searchFunctionTBD(searchTerm))
    }
  }
}

export const Search = connect(null, mapDispatch)(Search)
