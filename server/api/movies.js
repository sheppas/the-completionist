const router = require("express").Router();
const {
  models: { Movie },
} = require("../db");
module.exports = router

//GET one movie from internal DB

router.get('/:movieId', async (req, res, next) => {
  try{
    const movie = await Movie.findByPk(req.params.movieId);
    res.send(movie);
  } catch(err) {
    next(err)
  }
})

//EDIT one movie from internal DB

//PUT update a Movie on their Watched List (Ratings, Date Watched, Notes) -- where userId, movieId?

router.put("/:movieId", async (req, res, next) => {
  try {
    console.log("these are the params", req.params)
    let movie = await Movie.findByPk(req.params.movieId);
    await movie.update(req.body);
  } catch (err) {
    next(err);
  }
});
