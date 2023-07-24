const knex = require("knex")(require("../knexfile"));

const index = (_req, res) => {
  knex("tags")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving tags: ${err}`));
};

module.exports = {
  index,
};
