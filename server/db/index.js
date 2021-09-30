//the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Movie = require('./models/Movie')

//associations

User.belongsToMany(Movie, {through: 'shelf'})
Movie.belongsToMany(User, {through: 'shelf'})

module.exports = {
  db,
  models: {
    User,
    Movie,
  },
}
