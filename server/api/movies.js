const router = require("express").Router();
const {
  models: { Movie, User },
} = require("../db");

//GET all of a User's Movies - findAll where userId
router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const movies = await user.getMovies();
    res.send(movies);
  } catch (err) {
    next(err);
  }
});

//POST add a Movie to their Watched List
router.post("/:userId", async (req, res, next) => {
  try {
    let movie = await Movie.create(req.body);
    const user = await User.findByPk(req.params.userId);
    await user.addMovies(movie);
    res.send(movie);
  } catch (err) {
    next(err);
  }
});

//PUT update a Movie on their Watched List (Ratings, Date Watched, Notes) -- where userId, movieId?

router.put("/:userId", async (req, res, next) => {
  try {
    let movie = await Movie.findByPk(req.body.id);
    await movie.update(req.body);
  } catch (err) {
    next(err);
  }
});

//DELETE Remove a Movie on their Watched List -- where userId, movieId?
router.delete("/:userId", async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.body.id);
    await movie.destroy;
    res.send(movie);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
