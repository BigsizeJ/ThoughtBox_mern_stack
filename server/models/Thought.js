const { model, models, Schema } = require("mongoose");

const ThoughtSchema = new Schema(
  {
    thought: { type: String, required: [true, "image is required"] },
    tag: { type: Schema.Types.Array, required: [true, "tag is required"] },
    hearts: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      required: [true, "heart is required"],
    },
    interactions: [
      {
        creator: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: [true, "creator is required"],
        },
        comment: Schema.Types.String,
        replies: [
          {
            creator: {
              type: Schema.Types.ObjectId,
              ref: "User",
              required: [true, "creator is required"],
            },
            comment: Schema.Types.String,
          },
        ],
      },
    ],
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("Thought", ThoughtSchema);
