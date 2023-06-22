const knex = require("knex")(require("../knexfile"));

const index = (_req, res) => {
  knex("songs")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving songs: ${err}`));
};

const filter = (req, res) => {
  knex("songs")
    .modify(function (query) {
      const decadeFilter = req.params.filter.split("&")[0];
      const lengthFilter = req.params.filter.split("&")[1];
      const genreFilter = req.params.filter.split("&")[2];
      const searchFilter = req.params.filter.split("&")[3];
      if (decadeFilter !== "") {
        query.where({ decade: decadeFilter });
      }
      if (lengthFilter !== "") {
        query.where({ song_length: lengthFilter });
      }
      if (genreFilter !== "") {
        query
          .join("tag_matches", "songs.id", "=", "tag_matches.song_id")
          .where({ "tag_matches.tag_id": genreFilter });
      }
      if (searchFilter !== "") {
        query.where(function () {
          this.where("title", "like", `%${searchFilter}%`).orWhere(
            "artists",
            "like",
            `%${searchFilter}%`
          );
        });
      }
    })
    .then((songsFound) => {
      const songData = songsFound;
      res.status(200).json(songData);
    })
    .catch(() => {
      res.status(200).json(null);
    });
};

module.exports = {
  index,
  filter,
};
