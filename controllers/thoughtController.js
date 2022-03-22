const { User, Thought } = require("../models");

module.exports = {
  /** GET to get all thoughts */
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  /** GET to get a single thought by its _id */
  getSingleThought(req, res) {
    const { thoughtId } = req.params;
    Thought.findById(thoughtId)
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "thoughtId not found" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  /** POST to create a new thought */
  // This validates that the username exists and pushes to their thought list in the Thought model
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  /** PUT to update a thought by its _id */
  updateThought(req, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that id." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  /** DELETE to remove a thought by its _id */
  deleteThought(req, res) {
    Thought.findByIdAndDelete(req.params.thoughtId).then((thought) =>
      !thought
        ? res.status(404).json({ message: "No thought found with that id." })
        : res.json({ thought, message: `Deleted thought id ${thought.id}` })
    );
  },
  /** POST to create a reaction stored in a single thought's reactions array field */
  addReaction(req, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      {
        $addToSet: { reactions: req.body },
      },
      { runValidators: true, new: true }
    )
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  /** DELETE to pull and remove a reaction by the reaction's reactionId value */
  removeReaction(req, res) {
    const { thoughtId, reactionId } = req.params;
    Thought.findByIdAndUpdate(
      thoughtId,
      {
        $pull: { reactions: reactionId },
      },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
