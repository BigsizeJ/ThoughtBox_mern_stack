import { IoIosChatbubbles } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";
import { useStore } from "../hooks/useStore";
import axios from "axios";
import { StoreType } from "../hooks/context/StoreProvider";
import GetUser from "./GetUser";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FollowIcon from "./FollowIcon";
import { nanoid } from "nanoid";

const Card = ({ thought }: any) => {
  const { user, dispatch } = useStore();
  const [isHearted, setIsHearted] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && thought) {
      const alreadyHearted = user.hearted_thought.find(
        (hearted: any) => hearted._id === thought._id
      );
      if (alreadyHearted) setIsHearted(true);

      const alreadyFollowed = user.following.find(
        (u: any) => u._id === thought.creator._id
      );
      if (alreadyFollowed) setIsFollowing(true);
    }
  }, [user]);

  const HeartThought = async () => {
    if (user === null) return;
    const user_id = user._id;

    const res = await axios.post(
      `http://localhost:3000/thoughts/${thought._id}/modify-heart`,
      {
        user_id: user_id,
      }
    );

    if (res.status === 200) {
      const newThought = await axios.get(
        `http://localhost:3000/thoughts/${thought._id}`
      );
      const updatedUser = await GetUser();
      dispatch({ type: StoreType.GET_USER, payload: updatedUser });
      dispatch({
        type: StoreType.GET_THOUGHT,
        payload: { thought_id: thought._id, thought: newThought.data },
      });
      setIsHearted((prev) => !prev);
    }
  };

  const handleFollowButton = async () => {
    if (user === null) return;

    axios.post(`http://localhost:3000/user/follow/${thought.creator._id}`, {
      userId: user?._id,
    });
    setIsFollowing((prev) => !prev);
  };

  const handleUnfollowButton = async () => {
    if (user === null) return;

    axios.post(`http://localhost:3000/user/unfollow/${thought.creator._id}`, {
      userId: user?._id,
    });
    const updatedUser = await GetUser();
    setIsFollowing((prev) => !prev);
  };

  return (
    <div
      key={thought._id}
      className="text-gray-200 bg-[#192f4c] p-5 shadow-lg shadow-gray-900 
      flex flex-col gap-y-2 lg:py-4 "
    >
      <div className="flex justify-start items-center gap-3">
        <img
          className="object-contain rounded-full"
          src={thought.creator.picture}
          width={35}
          height={35}
          alt="creator image"
        />
        <div className="w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-x-2 items-center">
              <p>{thought.creator.name}</p>
              {thought.creator._id !== user?._id && user && (
                <FollowIcon
                  isFollowing={isFollowing}
                  handleFollowButton={handleFollowButton}
                  handleUnfollowButton={handleUnfollowButton}
                />
              )}
            </div>
            <div className="flex gap-x-2 md:gap-x-4">
              <div className="flex items-center gap-x-1">
                <IoIosChatbubbles
                  className="transition duration-200 hover:text-blue-500 cursor-pointer md:text-xl"
                  onClick={() => navigate(`/thought/${thought._id}`)}
                />
                <p>{thought.interactions.length}</p>
              </div>
              <div className="flex items-center gap-x-1">
                <AiFillHeart
                  className={`${
                    isHearted ? "text-red-500" : "text-white"
                  } cursor-pointer md:text-xl`}
                  onClick={() => HeartThought()}
                />
                <p>{thought.hearts.length}</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-400">{thought.creator.email}</p>
        </div>
      </div>
      <p className="text-base line-clamp-3">{thought.thought}</p>
      <div className="flex flex-wrap gap-x-2">
        {thought.tag.map((tag: string) => (
          <p className="text-gray-500" key={nanoid()}>
            {tag}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Card;
