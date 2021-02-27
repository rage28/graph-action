module.exports = {
  development: {
    client: "postgresql",
    connection: "postgres://user1:password1@localhost:5432/graph-action",
    pool: {
      min: 2,
      max: 5,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
