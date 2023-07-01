import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStore } from "../../hooks/useStore";
import Card from "../Card";
import CardSkeleton from "../CardSkeleton";
import { BsChatFill } from "react-icons/bs";
import { FaUsers, FaUserCheck } from "react-icons/fa";
import { StoreType } from "../../hooks/context/StoreProvider";

const UserInfo = () => {
  const { user, userThoughts, dispatch } = useStore();
  const thoughts = userThoughts;
  useEffect(() => {
    (async () => {
      const res = axios.get(`http://localhost:3000/user/${user._id}/thoughts`);
      const data = (await res).data;
      dispatch({ type: StoreType.GET_USER_THOUGHTS, payload: data });
    })();
  });

  return (
    <section className="mt-5">
      <div className="flex flex-col">
        <div className="flex gap-x-4 items-center">
          <img
            src={user && user.picture}
            className="rounded-full object-contain w-20 h-20 lg:w-24 lg:h-24"
          />
          <div>
            <p className="text-base lg:text-xl">{user && user.name}</p>
            <p className="text-base lg:text-lg text-gray-400">
              {user && user.email}
            </p>
            <div className="flex my-1 gap-x-4">
              <div className="profile-info gap-1">
                <BsChatFill />
                <p className="hidden md:flex">Thoughts:</p>
                <p>{thoughts && thoughts.length}</p>
              </div>
              <div className="profile-info gap-1">
                <FaUsers className="w-6 h-6" />
                <p className="hidden md:flex">Followers:</p>
                <p>0</p>
              </div>
              <div className="profile-info gap-1">
                <FaUserCheck className="w-5 h-5" />
                <p className="hidden md:flex">Following:</p>
                <p>0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-4 flex flex-col">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-500 font-bold">
          My thoughts
        </h1>
        <div className="grid mt-2 grid-cols-1 gap-4 grid-rows-6 lg:grid-cols-3 lg:grid-rows-2">
          {thoughts === null
            ? Array.from({ length: 6 }, (_, i) => ({ index: i + 1 })).map(
                (i) => <CardSkeleton key={i.index} />
              )
            : thoughts.map((thought: any) => <Card thought={thought} />)}
        </div>
      </div>
    </section>
  );
};

export default UserInfo;
