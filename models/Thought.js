const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const User = require("./User");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: [1, "Please enter your thought"],
      maxlength: [280, "Please have thoughts shorter than 280 characters..."],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => date.toLocaleString(),
    },
    username: {
      type: Schema.Types.String,
      ref: "User",
      required: true,
      // Validates that the username exists in the collection
      validate: {
        validator: function (username) {
          return User.exists({ username });
        },
        message: "User does not exist",
      },
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

// post save action to add it to the user
thoughtSchema.post("save", function (thought, next) {
  User.findOneAndUpdate(
    { username: thought.username },
    { $addToSet: { thoughts: thought } },
    { select: "-username" },
    next
  );
});

// friendCount virtual
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
