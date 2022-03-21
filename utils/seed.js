const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { users, thoughts } = require("./data.json");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing users and thoughts
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Drop existing students
  await Thought.deleteMany({});

  // Add user to the collection and await the results
  await User.collection.insertMany(users);

  // Add thoughts to the collection and await the results
  await Thought.collection.insertMany(thoughts);

  // Add friends and thoughts to the users
  await User.collection.findOneAndUpdate(
    { _id: users[0]._id },
    { $addToSet: { friends: users[1]._id, thoughts: thoughts[0]._id } }
  );
  await User.collection.findOneAndUpdate(
    { _id: users[1]._id },
    { $addToSet: { friends: users[0]._id, thoughts: thoughts[1]._id } }
  );

  // Add reactions to the thoughts

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
