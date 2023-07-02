const express = require("express");
const router = express.Router();
const User = require("../models/User");

const {
  createThoughtController,
  getThoughtsController,
} = require("../controllers/userControllers");

router.post("/thought/new", createThoughtController);

router.get("/:id/thoughts", getThoughtsController);

router.post("/follow/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  const userFollowing = await User.findOne({ _id: userId })
    .populate("hearted_thought")
    .populate("followers")
    .populate("following");

  const userToBeFollowed = await User.findOne({ _id: id })
    .populate("hearted_thought")
    .populate("followers")
    .populate("following");

  userToBeFollowed.followers.push(userId);
  userFollowing.following.push(id);

  await userToBeFollowed.save();
  await userFollowing.save();
});

router.post("/unfollow/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  const userUnfollowing = await User.findOne({ _id: userId })
    .populate("hearted_thought")
    .populate("followers")
    .populate("following");

  const userFollowed = await User.findOne({ _id: id })
    .populate("hearted_thought")
    .populate("followers")
    .populate("following");

  userFollowed.followers = userFollowed.followers.filter(
    (follower) => follower._id.toString() !== userId
  );

  userUnfollowing.following = userUnfollowing.following.filter(
    (follow) => follow._id.toString() !== id
  );

  await userFollowed.save();
  await userUnfollowing.save();
});

module.exports = router;
