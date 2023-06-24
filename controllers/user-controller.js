const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const signup = (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(
    password,
    Number(process.env.SALT_ROUNDS)
  );
  knex("users")
    .insert({
      username,
      password: hashedPassword,
    })
    .then((result) => {
      return knex("users").where({ id: result[0] });
    })
    .then((createdUser) => {
      res.status(201).json(createdUser);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Unable to create new user",
      });
    });
};

const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Login requires username and password",
    });
  }

  // if match => send the token (jwt.sign ({ id }))
  knex("users")
    .where({ username: username })
    .then((usersFound) => {
      if (usersFound.length === 0) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      const user = usersFound[0];

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });

      res.json({ token });
    });
};

const profile = (req, res, next) => {
  // Middleware function
  const { authorization } = req.headers;

  // Format: 'Bearer eyJhbG...ocLIs'
  const token = authorization.slice("Bearer ".length);

  // Verify the token
  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      // Token verification failed: forbidden
      return res.status(401).json({ error: "failed" });
    } else {
      // Token verification succeeded: allow access
      // Make the token payload available to following handlers
      req.payload = payload;
      next();
    }
  });
};

const retrieveUserDetails = (req, res) => {
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
};

const add = (req, res) => {
  const { user_id, song_id } = req.body;

  knex("song_matches")
    .where({ user_id, song_id })
    .then((matches) => {
      if (matches.length > 0) {
        return res.status(400).json({ message: "Song already on list" });
      } else {
        return knex("song_matches").insert({ user_id, song_id });
      }
    })
    .then((result) => {
      if (result) {
        return knex("song_matches").where({ id: result[0] });
      } else {
        throw new Error("Unable to add song to list");
      }
    })
    .then((createdMatch) => {
      res.status(201).json(createdMatch);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Unable to add song to list",
      });
    });
};

const remove = (req, res) => {
  const { songid, userid } = req.params;

  knex("song_matches")
    .where({ user_id: userid, song_id: songid })
    .del()
    .then((deletedRows) => {
      if (deletedRows > 0) {
        res.status(200).json({ message: "Row deleted successfully" });
      } else {
        throw new Error("Row not found");
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Unable to delete row",
      });
    });
};

module.exports = {
  signup,
  login,
  profile,
  retrieveUserDetails,
  add,
  remove,
};
