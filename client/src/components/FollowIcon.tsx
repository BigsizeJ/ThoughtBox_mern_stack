import React from "react";
import { FaUserPlus, FaUserCheck } from "react-icons/fa";

interface IconProps {
  isFollowing: boolean;
  handleFollowButton: () => Promise<void>;
  handleUnfollowButton: () => Promise<void>;
}

const FollowIcon = ({
  isFollowing,
  handleFollowButton,
  handleUnfollowButton,
}: IconProps) => {
  const style =
    "cursor-pointer hover:text-blue-500 transition duration-200 md:text-lg";

  return (
    <>
      {isFollowing ? (
        <FaUserCheck className={style} onClick={handleUnfollowButton} />
      ) : (
        <FaUserPlus className={style} onClick={handleFollowButton} />
      )}
    </>
  );
};

export default FollowIcon;
