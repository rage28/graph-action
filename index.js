const { Model } = require("objection");
const Knex = require("knex");
const Person = require("./src/Person");

Model.knex(
  Knex({
    client: "postgresql",
    connection: "postgres://user1:password1@localhost:5432/graph-action",
  })
);

const person = {
  firstName: "Matt",
  lastName: "Damon",
  age: 43,

  parent: {
    firstName: "Kent",
    lastName: "Damon",
    age: 70,
  },

  pets: [
    {
      name: "Doggo",
      species: "dog",
    },
    {
      name: "Kat",
      species: "cat",
    },
  ],

  movies: [
    {
      name: "The Martian",
    },
    {
      name: "Good Will Hunting",
    },
  ],

  children: [
    {
      firstName: "Isabella",
      lastName: "Damon",
      age: 13,
    },
  ],
};

const insertData = async () => {
  return Person.transaction(async (trx) => {
    return (
      Person.query(trx)
        // For security reasons, limit the relations that can be inserted.
        .allowGraph("[pets, children.[pets, movies], movies, parent]")
        .insertGraph(person)
    );
  });
};

insertData().then((insertedGraph) => console.log(insertedGraph));
