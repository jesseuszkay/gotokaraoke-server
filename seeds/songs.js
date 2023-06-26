// import seed data files, arrays of objects
const songsData = require("../seed-data/songs");

exports.seed = function (knex) {
  knex("songs").insert(songsData);
};
