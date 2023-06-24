const knex = require("knex")(require("../knexfile"));

const addSong = (req, res) => {
  const videoId = req.body.videoId;
  console.log("hi");
  knex("daily_songs")
    .where({ videoId })
    .first()
    .then((existingSong) => {
      if (existingSong) {
        return res.status(200).json({ message: "Song added successfully." });
      }
      knex("daily_songs").insert({ videoId, fun: 0, easy: 0 });
    })
    .then(() => {
      return res.status(200).json({ message: "Song added successfully." });
    })
    .catch((error) => {});
};

// Endpoint for adding a vote to the daily_song_votes table
const addVote = (req, res) => {
  const videoId = req.body.videoId;
  const userId = req.body.userId;

  knex("daily_song_votes")
    .where({ videoId, user_id: userId })
    .first()
    .then((existingVote) => {
      if (existingVote) {
        return res.status(200).json({ message: "Voter added successfully." });
      }
      return knex("daily_song_votes").insert({
        videoId,
        user_id: userId,
        fun: 0,
        easy: 0,
      });
    })
    .then(() => {
      res.status(200).json({ message: "Vote added successfully." });
    })
    .catch((error) => {});
};

const rate = (req, res) => {
  const videoId = req.params.videoid;
  const userId = req.body.userId;
  const type = req.body.type;

  knex("daily_song_votes")
    .where({ videoId, user_id: userId })
    .update({ [type]: knex.raw("NOT ??", [type]) })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error updating song votes: ${err}`));
};

const getDailySongStats = (req, res) => {
  const videoID = req.params.videoid;
  knex("daily_songs")
    .where("videoId", videoID)
    .then((data) => {
      res.status(200).json(data[0]);
    })
    .catch((err) => res.status(400).send(`Error retrieving song data: ${err}`));
};

module.exports = {
  addSong,
  addVote,
  rate,
  getDailySongStats,
};
