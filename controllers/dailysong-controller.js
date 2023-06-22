const knex = require("knex")(require("../knexfile"));

const add = (req, res) => {
  const videoId = req.body.videoId;
  const fun = 0;
  const boring = 0;
  const easy = 0;
  const hard = 0;

  knex("daily_songs")
    .where({ videoId })
    .first()
    .then((existingSong) => {
      if (existingSong) {
        res
          .status(200)
          .json({ message: "A row with the same videoId already exists." });
        return;
      }
      return knex("daily_songs").insert({ videoId, fun, boring, easy, hard });
    })
    .then((result) => {
      if (!result) {
        return;
      }
      return knex("daily_songs").where({ id: result[0] });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Unable to add song to list",
        error: error.message,
      });
    });
};

const rate = (req, res) => {
  const videoID = req.params.videoid;
  const { type, direction } = req.body;

  let columnToUpdate = "";

  // Determine the column to update based on the 'type' parameter
  if (type === "fun") {
    columnToUpdate = "fun";
  } else if (type === "boring") {
    columnToUpdate = "boring";
  } else if (type === "easy") {
    columnToUpdate = "easy";
  } else if (type === "hard") {
    columnToUpdate = "hard";
  }

  if (columnToUpdate) {
    // Use the columnToUpdate variable to update the specified column
    knex("daily_songs")
      .where({ videoId: videoID })
      .increment(columnToUpdate, direction === "increase" ? 1 : -1)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => res.status(400).send(`Error updating song: ${err}`));
  } else {
    res.status(400).send("Invalid type parameter.");
  }
};

module.exports = {
  add,
  rate,
};
