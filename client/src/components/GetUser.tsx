import axios from "axios";

const GetUser = async () => {
  const user_token = JSON.parse(localStorage.getItem("user_tokens") as any);
  if (user_token === null || user_token === "") return;
  try {
    const userData = await axios.post("http://localhost:3000/auth/user", {
      tokens: user_token,
    });
    return await userData.data;
  } catch (err) {
    const refresh = await axios.post(
      "http://localhost:3000/auth/google/refresh-token",
      {
        refreshToken: user_token.refresh_token,
      }
    );
    localStorage.removeItem("user_tokens");

    localStorage.setItem("user_tokens", JSON.stringify(await refresh.data));
  }
};

export default GetUser;
