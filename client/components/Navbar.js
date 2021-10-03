import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { Search } from './Search'

const Navbar = ({handleClick, isLoggedIn, userId}) => (
  <div id="nav">
    <Link to="/">
    <h1 id="header-name">The Completionist</h1>
    </Link>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          {/* <Link to="/">Home</Link> */}
          <Link to={`/shelf/${userId}`}>My Movies</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Search />
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
