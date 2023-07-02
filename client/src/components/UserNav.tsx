import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiOutlinePencilAlt, HiOutlineUser } from "react-icons/hi";

const UserNav = ({ user, logout }: any) => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (
        menuRef.current &&
        dropdown &&
        !menuRef.current.contains(e.target as HTMLElement)
      ) {
        setDropdown((prev) => !prev);
      }
    };

    window.addEventListener("click", handleClose);

    return () => window.removeEventListener("click", handleClose);
  }, [dropdown]);

  return (
    <section className="relative" ref={menuRef}>
      <img
        className="w-10 h-10 object-contain rounded-full cursor-pointer"
        src={user.picture}
        alt="User profile picture"
        onClick={() => setDropdown((prev) => !prev)}
      />
      <nav
        className={`${
          dropdown
            ? "top-12 pointer-events-auto opacity-100"
            : "top-10 pointer-events-none opacity-0"
        } w-56 h-fit absolute right-1 bg-[#192f4c] transition-all duration-300 p-3 z-50`}
      >
        <section className="flex items-center gap-x-2">
          <img
            src={user.picture}
            alt="User picture"
            className="w-6 h-6 object-contain rounded-full"
          />
          <p>{user.name}</p>
        </section>
        <div className="w-full h-[1px] bg-gray-500 my-2"></div>

        <section className="flex flex-col py-1 gap-y-2">
          <Link to="/profile" className="link-with-icon">
            My profile <HiOutlineUser className="w-6 h-6" />
          </Link>
          <Link to="/express-thought" className="link-with-icon">
            Express thought <HiOutlinePencilAlt className="w-6 h-6" />
          </Link>
          {/* sign out button */}
          <button
            className="bg-blue-500 px-2 py-[3px] w-full transition duration-200 hover:bg-blue-400 font-semibold mt-2"
            onClick={() => logout()}
          >
            Sign out
          </button>
        </section>
      </nav>
    </section>
  );
};

export default UserNav;
