const Sequelize = require("sequelize");
const db = require("../db");

const Movie = db.define("movie", {
  title: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  db_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  poster_path: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 5,
    },
    allowNull: true,
  },
  watched_date: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  notes: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
});

module.exports = Movie;
