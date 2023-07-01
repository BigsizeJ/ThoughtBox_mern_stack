const express = require("express");
const router = express.Router();

const {
  authUserController,
  authGoogleController,
  authRefreshTokenController,
} = require("../controllers/authControllers");

router.post("/user", authUserController);

router.post("/google", authGoogleController);

router.post("/google/refresh-token", authRefreshTokenController);


module.exports = router;
