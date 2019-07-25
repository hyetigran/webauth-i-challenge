const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

module.exports = {
  find,
  findBy,
  add
};

function find() {
  return db("users");
}

function findBy(username) {
  return db("users").where({ username: username });
}

function add(user) {
  return db("users")
    .insert(user)
    .then(ids => ({ id: ids[0] }));
}