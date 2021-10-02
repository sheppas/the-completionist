import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import movies from './popularMovies'
import searchResults from './search'
import oneMovie from './oneMovie'
import userMovies from './userMovies'
import oneUserMovie from './oneUserMovie'

//WHATEVER YOU NAME IT HERE IS WHAT IT WILL BE IN MAP STATE!
const reducer = combineReducers({ auth, movies, searchResults, oneMovie, userMovies, oneUserMovie})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
