const knex = require("knex")(require("../knexfile"));

const index = (_req, res) => {
  knex("albums")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving albums: ${err}`));
};

const getOne = (req, res) => {
  knex("albums")
    .where({ id: req.params.albumid })
    .then((response) => {
      if (response.length > 0) {
        res.status(200).json(response[0]);
      } else {
        res.status(404).send("Album not found");
      }
    })
    .catch((err) => res.status(400).send(`Error retrieving album: ${err}`));
};

module.exports = {
  index,
  getOne,
};
