require("dotenv").config();
const User = require("../models/User");
const { OAuth2Client, UserRefreshClient } = require("google-auth-library");

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage"
);

const authUserController = async (req, res) => {
  try {
    const { id_token } = req.body.tokens;
    const userInfo = await oAuth2Client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    // Extract relevant user data
    const userData = {
      picture: userInfo.payload.picture,
      email: userInfo.payload.email,
      name: userInfo.payload.name,
      hearted_thought: [],
      followers: [],
      following: [],
    };

    const user = await User.findOne({ email: userData.email })
      .populate("hearted_thought")
      .populate("followers")
      .populate("following");

    if (user) return res.status(201).json(user);

    const newUser = await User.create(userData);
    return res.status(201).json(newUser);
  } catch (error) {
    // Handle the error gracefully
    console.error("Failed to authenticate user:");
    res.status(500).json({ error: "Failed to authenticate user." });
  }
};

const authGoogleController = async (req, res) => {
  const { tokens } = await oAuth2Client.getToken(req.body.code);

  res.json(tokens);
};

const authRefreshTokenController = async (req, res) => {
  const user = new UserRefreshClient(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    req.body.refreshToken
  );
  const { credentials } = await user.refreshAccessToken(); // optain new tokens
  res.json(credentials);
};

module.exports = {
  authUserController,
  authRefreshTokenController,
  authGoogleController,
};
