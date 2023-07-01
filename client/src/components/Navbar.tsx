import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useGoogleLogin } from "@react-oauth/google";
import { useStore } from "../hooks/useStore";
import { StoreType } from "../hooks/context/StoreProvider";
import axios from "axios";
import UserNav from "./UserNav";

const Navbar = () => {
  const { user, dispatch } = useStore();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const tokens = await axios.post("http://localhost:3000/auth/google", {
        code,
      });

      let user_token;
      if (localStorage.getItem("user_tokens") !== null) {
        user_token = localStorage.getItem("user_tokens");
      } else {
        localStorage.setItem("user_tokens", JSON.stringify(tokens.data));
        user_token = localStorage.getItem("user_tokens");
      }

      const userData = await axios.post("http://localhost:3000/auth/user", {
        tokens: JSON.parse(user_token as string),
      });
      dispatch({ type: StoreType.GET_USER, payload: userData.data });
      window.location.reload();
    },
    flow: "auth-code",
  });

  const logout = () => {
    localStorage.removeItem("user_tokens");
    navigate("/");
    dispatch({ type: StoreType.GET_USER, payload: null });
  };

  return (
    <nav className="flex p-3 border-b border-slate-600 items-center justify-between">
      <Link to="/" className="flex items-center gap-x-2">
        <img
          className="object-contain w-10 h-10"
          src={logo}
          alt="Thoughtbox logo"
        />
        <h1
          className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-500
        font-bold text-2xl hidden md:flex"
        >
          ThoughtBox
        </h1>
      </Link>
      <section className="flex items-center gap-x-4">
        <NavLink to="/explore" className="link">
          Explore
        </NavLink>
        {user === null ? (
          <button onClick={() => login()} className="button">
            Sign in
          </button>
        ) : (
          <UserNav user={user} logout={logout} />
        )}
      </section>
    </nav>
  );
};
export default Navbar;
