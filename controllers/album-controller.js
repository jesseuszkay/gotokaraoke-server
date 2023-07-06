const knex = require("knex")(require("../knexfile"));

const index = (_req, res) => {
  knex("albums")
    .orderBy("title")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving albums: ${err}`));
};

const getOne = (req, res) => {
  knex("albums")
    .select(
      "albums.id",
      "albums.title as album_title",
      "albums.artist as album_artist",
      "albums.year_released as album_year_released",
      "albums.album_art",
      "songs.id as song_id",
      "songs.title as song_title",
      "songs.videoId as song_videoId",
      "songs.duration_ms as song_duration_ms"
    )
    .leftJoin("songs", "albums.id", "songs.album_id")
    .where("albums.id", req.params.albumid)
    .then((response) => {
      if (response.length > 0) {
        const album = {
          id: response[0].id,
          title: response[0].album_title,
          artist: response[0].album_artist,
          album_art: response[0].album_art,
          year_released: response[0].album_year_released,
          songs: response.map((item) => ({
            id: item.song_id,
            title: item.song_title,
            videoId: item.song_videoId,
            duration_ms: item.song_duration_ms,
          })),
        };
        res.status(200).json(album);
      } else {
        res.status(404).send("Album not found");
      }
    })
    .catch((err) => res.status(400).send(`Error retrieving album: ${err}`));
};

/* const retrieveUserDetails = (req, res) => {
    const userId = req.payload.userId;
    knex("users")
      .select(
        "users.username",
        "song_matches.song_id",
        "songs.title",
        "songs.artists",
        "songs.year_released",
        "songs.duration_ms",
        "songs.videoId"
      )
      .leftJoin("song_matches", "users.id", "song_matches.user_id")
      .leftJoin("songs", "song_matches.song_id", "songs.id")
      .where("users.id", userId)
      .then((data) => {
        // Create an array of objects containing song IDs and titles
        const songs = data.map((item) => {
          return {
            id: item.song_id,
            title: item.title,
            artists: item.artists,
            year_released: item.year_released,
            duration_ms: item.duration_ms,
            videoId: item.videoId,
          };
        });
  
        // Extract the unique username (since it's the same for all rows)
        const username = data.length > 0 ? data[0].username : null;
  
        const userDetails = {
          userId: userId,
          username: username,
          songs: songs,
        };
  
        return res.status(200).json(userDetails);
      })
      .catch((err) => {
        res.status(400).send(`Error retrieving user details: ${err}`);
      });
  }; */

module.exports = {
  index,
  getOne,
};
