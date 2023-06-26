// import seed data files, arrays of objects
const songsData = require("../seed-data/song-data");

exports.seed = function (knex) {
  return knex("songs")
    .del()
    .then(function () {
      return knex("songs").insert(songsData);
    });
};
