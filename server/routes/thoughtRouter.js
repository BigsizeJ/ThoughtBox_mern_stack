const express = require("express");
const router = express.Router();
const Thought = require("../models/Thought");
const User = require("../models/User");

router.get("/popular", async (req, res) => {
  const thoughts = await Thought.find({}).populate("creator");
  return res.status(200).json(thoughts);
});

router.post("/:id/modify-heart", async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  try {
    const thought = await Thought.findOne({ _id: id }).populate("hearts");
    const user = await User.findOne({ _id: user_id });
    const isExist = thought.hearts.find(
      (heart) => heart._id.toString() === user_id
    );
    /// update and remove the existing user and thought hearts that is duplicate
    if (isExist) {
      thought.hearts = thought.hearts.filter(
        (heart) => heart._id.toString() !== user_id
      );
      user.hearted_thought = user.hearted_thought.filter(
        (thought) => thought._id.toString() !== id
      );
      thought.save();
      user.save();
      return res.status(200).json();
    }
    // update the user and thought hearts
    await Thought.updateOne({ _id: id }, { $push: { hearts: user_id } });
    await User.updateOne({ _id: user_id }, { $push: { hearted_thought: id } });
    return res.status(200).json();
  } catch (err) {
    res.status(500);
    return console.error("There some error modifying a heart");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const thought = await Thought.findOne({ _id: id })
    .populate("creator")
    .populate("interactions.creator")
    .populate("interactions.replies.creator");

  res.json(thought);
});

router.post("/interact/:id", async (req, res) => {
  const { id } = req.params;
  const { creator, comment } = req.body;
  const thought = await Thought.findOne({ _id: id })
    .populate("creator")
    .populate("interactions.creator")
    .populate("interactions.replies.creator");

  thought.interactions.push({
    creator: creator,
    comment: comment,
    replies: [],
  });
  await thought.populate("interactions.creator");
  await thought.save();

  res.status(200).json(thought);
});

router.post("/reply/:id", async (req, res) => {
  const { id } = req.params;
  const { creator, commentId, comment } = req.body;
  const thought = await Thought.findOne({ _id: id })
    .populate("creator")
    .populate("interactions.creator")
    .populate("interactions.replies.creator");
  thought.interactions = thought.interactions.map((interaction) => {
    if (interaction._id.toString() === commentId) {
      return {
        ...interaction,
        replies: [
          ...interaction.replies,
          { creator: creator, comment, comment },
        ],
      };
    }
    return interaction;
  });
  await thought.populate("interactions.replies.creator");
  await thought.save();
  res.status(200).json(thought);
});

module.exports = router;
