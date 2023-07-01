const express = require("express");
const router = express.Router();
const {
  createThoughtController,
  getThoughtsController,
} = require("../controllers/userControllers");

router.post("/thought/new", createThoughtController);

router.get("/:id/thoughts", getThoughtsController);

module.exports = router;
