import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const ShowActivePath = () => {
  const location = useLocation();
  const { pathname } = location;

  const paths = pathname.split("/").filter((path) => path !== "");

  if (paths.length === 0) {
    return null; // Handle root path if desired
  }

  const activePath = paths[paths.length - 1];
  const formattedActivePath =
    activePath.charAt(0).toUpperCase() + activePath.slice(1);

  return <>{formattedActivePath}</>;
};

const ProfileNav = () => {
  const [open, setOpen] = useState<boolean>(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (
        dropRef.current &&
        open &&
        !dropRef.current.contains(e.target as HTMLElement)
      ) {
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("click", closeDropdown);

    return () => window.removeEventListener("click", closeDropdown);
  }, [open]);

  return (
    <section className="flex relative text-gray-200" ref={dropRef}>
      <button
        className="flex items-center gap-x-2 text-base lg:text-lg"
        onClick={() => setOpen((prev) => !prev)}
      >
        <ShowActivePath />
        <IoIosArrowDown
          className={`${
            open ? "rotate-180" : "rotate-0"
          } text-xl transition duration-300`}
        />
      </button>
      <div
        className={`${
          open
            ? "top-8 pointer-events-auto opacity-100"
            : "top-5 pointer-events-none opacity-0"
        } absolute flex flex-col bg-[#192f4c] p-3 
      right-1 w-44 transition-all duration-300 gap-y-2 `}
      >
        <Link className="w-full link-with-icon" to="/profile">
          Profile
        </Link>
        <Link className="w-full link-with-icon" to="/profile/interactions">
          Interactions
        </Link>
      </div>
    </section>
  );
};

export default ProfileNav;
