// Import dotenv to process environment variables from `.env` file.
require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  client: "mysql",
  connection: {
    host: "us-cdbr-east-06.cleardb.net",
    database: "heroku_fce985c65ff7d41",
    user: "bb8cc0060af505",
    password: "2582168b",
    charset: "utf8",
  },
};
