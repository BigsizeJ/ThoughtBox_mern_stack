const Thought = require("../models/Thought");

const createThoughtController = async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);

    return res.status(200).json({ message: "success posting thought" });
  } catch (err) {
    return res.status(400).json({ error: "Error posting thought" });
  }
};

const getThoughtsController = async (req, res) => {
  const { id } = req.params;
  try {
    const thoughts = await Thought.find({ creator: id }).populate("creator");

    return res.status(200).json(thoughts);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  createThoughtController,
  getThoughtsController,
};
