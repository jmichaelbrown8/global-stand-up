const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

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
      get: function () {
        return this.toLocaleString();
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// friendCount virtual
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports(Thought);
