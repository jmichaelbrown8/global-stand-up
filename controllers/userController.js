const { User, Thought } = require("../models");

module.exports = {
  /** GET all users */
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  /** GET a single user by its _id and populated thought and friend data */
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that id" })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  /** POST a new user */
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  /** PUT to update a user by its _id */
  updateUser(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that id" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  /** DELETE to remove user by its _id */
  // bonus: remove a user's associated thoughts when deleted
  deleteUser(req, res) {
    User.findByIdAndDelete(req.params.userId)
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that id" })
          : res.json({ user, message: `Deleted user ${user.id}` })
      )
      .catch((err) => res.status(500).json(err));
  },
  /** POST to add a new friend to a user's friend list */
  addFriend(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      {
        $addToSet: { friends: req.body },
      },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user what that id" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  /** DELETE to remove a friend from a user's friend list */
  removeFriend(req, res) {
    const { userId, friendId } = req.params;
    User.findByIdAndUpdate(
      userId,
      {
        $pull: { friends: friendId },
      },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user what that id" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
