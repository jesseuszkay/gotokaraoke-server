/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("sing_king_data", (table) => {
    table.string("videoId", 1000);
    table.string("title", 1000);
    table.string("url", 1000);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("sing_king_data");
};
