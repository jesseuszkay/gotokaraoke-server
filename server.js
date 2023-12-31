const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;
const bcrypt = require("bcrypt");

app.use(cors({ origin: process.env.CORS_ORIGIN }));

const songRoutes = require("./routes/song-routes");
const tagRoutes = require("./routes/tag-routes");
const userRoutes = require("./routes/user-routes");
const albumRoutes = require("./routes/album-routes");

app.use(express.json());
app.use("/songs", songRoutes);
app.use("/tags", tagRoutes);
app.use("/user", userRoutes);
app.use("/albums", albumRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
