const { User, Thought } = require("../models");

module.exports = {
  // GET to get all thoughts
  getThoughts(req, res) {
    res.send("Unimplemented");
  },
  // GET to get a single thought by its _id
  getSingleThought(req, res) {
    res.send("Unimplemented");
  },
  // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  createThought(req, res) {
    res.send("Unimplemented");
  },
  // PUT to update a thought by its _id
  updateThought(req, res) {
    res.send("Unimplemented");
  },
  // DELETE to remove a thought by its _id
  deleteThought(req, res) {
    res.send("Unimplemented");
  },
  // POST to create a reaction stored in a single thought's reactions array field
  addReaction(req, res) {
    res.send("Unimplemented");
  },
  // DELETE to pull and remove a reaction by the reaction's reactionId value
  removeReaction(req, res) {
    res.send("Unimplemented");
  },
};
