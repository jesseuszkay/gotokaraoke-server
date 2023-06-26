/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("songs", (table) => {
    table.increments("id").primary();
    table.string("title");
    table.string("artists");
    table.string("spotify_track_id");
    table.string("spotify_album_id");
    table.string("tags");
    table.integer("year_released");
    table.integer("duration_ms");
    table.string("song_length");
    table.string("videoId");
    table.string("url");
    table.string("decade");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("songs");
};
