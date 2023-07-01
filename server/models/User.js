const { model, models, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    picture: { type: String, required: [true, "image is required"] },
    email: { type: String, required: [true, "password is required"] },
    name: { type: String, required: [true, "name is required"] },
    hearted_thought: {
      type: [Schema.Types.ObjectId],
      ref: "Thought",
      required: [true, "hearted_thought is required"],
    },
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
