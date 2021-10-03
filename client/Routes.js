import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import AddMovieForm from './components/AddMovieForm';
import { Login } from './components/AuthForm';
import { Signup } from './components/SignUp';
import Home from './components/Home';
import MovieDetail from './components/MovieDetail';
import MovieListing from './components/MovieListing';
import SearchResults from './components/SearchResults';
import UserMoviesListing from './components/UserMoviesListing'
import EditMovie from './components/EditMovie';
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={MovieListing} />
            <Route exact path="/movies" component={MovieListing} />
            <Route path="/search-results" component={SearchResults}/>
            <Route path="/movies/:movieId" component={MovieDetail} />
            <Route path="/shelf/:userId" component={UserMoviesListing}/>
            <Route exact path="/add-movie" component={AddMovieForm} />
            <Route exact path="/edit-movie/:movieId" component={EditMovie} />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
