const knex = require("knex")(require("../knexfile"));

const index = (_req, res) => {
  knex("tag_matches")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving songs: ${err}`));
};

module.exports = {
  index,
};
