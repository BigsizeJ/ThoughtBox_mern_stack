import Home from "./pages/Home.";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import axios from "axios";
import { useStore } from "./hooks/useStore";
import { StoreType } from "./hooks/context/StoreProvider";
import ExpressThought from "./pages/ExpressThought";
import Profile from "./pages/Profile";
import UserInfo from "./components/profile/UserInfo";
import Interactions from "./components/profile/Interactions";
import Thought from "./pages/Thought";

function App() {
  const { dispatch } = useStore();

  useEffect(() => {
    (async () => {
      const user_token = JSON.parse(localStorage.getItem("user_tokens") as any);
      if (user_token === null || user_token === "") return;
      try {
        const userData = await axios.post("http://localhost:3000/auth/user", {
          tokens: user_token,
        });
        dispatch({ type: StoreType.GET_USER, payload: userData.data });
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
    })();

    return () => {};
  }, []);
  return (
    <>
      <GoogleOAuthProvider clientId="951358914987-8du7e0t7sf7bq8p9ktes6qf3hla6kk7h.apps.googleusercontent.com">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/express-thought" element={<ExpressThought />} />
          <Route path="/profile" element={<Profile />}>
            <Route index element={<UserInfo />} />
            <Route path="interactions" element={<Interactions />} />
          </Route>
          <Route path="/thought/:id" element={<Thought />} />
        </Routes>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
