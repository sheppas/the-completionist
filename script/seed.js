'use strict'

const {db, models: {User, Movie} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', email:'cody@cody.com', password: '123' }),
    User.create({ username: 'murphy', email:'murphy@murphy.com', password: '123' }),
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  const movies =  await Promise.all([
    Movie.create({title: 'Chicago', db_id:'001574', poster_path: '/v1Sg3GuHDz9uhrKqYozOeCMLSpj.jpg', rating: 5, watched_date: 2020-12-22, notes: 'This is one of my favorite movie musicals'}),
    Movie.create({title: 'Interstellar', db_id:'157336', poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',rating: 2, watched_date: 2020-11-22, notes: 'Too many docking scenes for my taste'})
  ])

  console.log(`seeded ${movies.length} movies`)
  console.log(`seeded successfully`)

  //WHY ISN'T THIS WORKING?
  await movies[0].setUsers(users[0]);
  await movies[1].setUsers(users[1]);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
