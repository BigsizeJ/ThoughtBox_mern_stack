import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../hooks/useStore";
import { StoreType } from "../hooks/context/StoreProvider";
import { FaUserPlus } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";
import GetUser from "../components/GetUser";
import { nanoid } from "nanoid";
import CommentCard from "../components/CommentCard";
import Reply from "../components/Reply";

const Thought = () => {
  const { id } = useParams();
  const { user, viewedThought, dispatch } = useStore();
  const [isHearted, setIsHearted] = useState<boolean>(false);
  const [thought, setThought] = useState<string>("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/thoughts/${id}`)
      .then(async (res) => {
        const data = await res.data;
        const upUser = await GetUser();

        const newDataWithReply = {
          ...data,
          interactions: data.interactions.map((comment: any) => ({
            ...comment,
            isReplying: false,
          })),
        };

        dispatch({ type: StoreType.VIEWED_THOUGHT, payload: newDataWithReply });
        const alreadyHearted = upUser?.hearted_thought.find(
          (hearted: any) => hearted._id === data._id
        );

        if (alreadyHearted) setIsHearted(true);
      })
      .catch((err) => console.error(err));

    return () => {};
  }, []);

  const HeartThought = async () => {
    if (user === null) return;
    const user_id = user._id;

    const res = await axios.post(
      `http://localhost:3000/thoughts/${viewedThought._id}/modify-heart`,
      {
        user_id: user_id,
      }
    );

    if (res.status === 200) {
      const newThought = await axios.get(
        `http://localhost:3000/thoughts/${viewedThought._id}`
      );

      const updatedUser = await GetUser();
      dispatch({ type: StoreType.GET_USER, payload: updatedUser });
      dispatch({
        type: StoreType.UPDATE_HEART_OF_VIEWED_THOUGHT,
        payload: newThought.data.hearts,
      });
      setIsHearted((prev) => !prev);
    }
  };

  const handleInteraction = async (e: FormEvent) => {
    e.preventDefault();
    setThought("");
    const res = await axios.post(
      `http://localhost:3000/thoughts/interact/${viewedThought._id}`,
      { creator: user._id, comment: thought.trim() }
    );
    if (res.status === 200) {
      const data = await res.data;

      dispatch({ type: StoreType.VIEWED_THOUGHT, payload: data });
    }
  };

  return (
    <section className="py-10 px-5 md:p-10 flex flex-col items-center">
      {viewedThought && (
        <section className="bg-[#192f4c] p-4 flex flex-col shadow-lg gap-y-4 w-full md:w-3/5">
          <div className="flex gap-x-2 items-center">
            <img
              src={viewedThought.creator.picture}
              className="rounded-full w-12 h-12"
            />
            <div>
              <div className="flex gap-x-2 items-center lg:text-lg">
                <p className="text-base lg:text-xl">
                  {viewedThought.creator.name}
                </p>
                <FaUserPlus className="mt-1" />
              </div>

              <p className="text-sm lg:text-base">
                {viewedThought.creator.email}
              </p>
            </div>
          </div>
          <div className="flex ">
            <div className="flex gap-y-1 flex-col">
              <p className="text-lg md:text-xl">{viewedThought.thought}</p>
              <div
                className="flex flex-col mt-2 justify-between 
              lg:flex-row lg:items-center"
              >
                <div className="flex flex-wrap gap-x-2 w-full">
                  {viewedThought.tag.map((tag: string) => (
                    <p className="text-gray-500" key={nanoid()}>
                      {tag}
                    </p>
                  ))}
                </div>
                <div className="flex gap-x-3 w-full justify-end mt-2 px-2 ">
                  <div className="flex text-sm md:text-base gap-x-1 items-center">
                    <IoIosChatbubbles className="text-xl" />
                    <p>{viewedThought.interactions.length}</p>
                  </div>
                  <div className="flex text-sm md:text-base gap-x-1 items-center">
                    <AiFillHeart
                      className={`${
                        isHearted ? "text-red-500" : "text-white"
                      } cursor-pointer text-xl`}
                      onClick={() => HeartThought()}
                    />
                    <p>{viewedThought.hearts.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {user && user._id !== viewedThought.creator._id && (
            <form
              className="w-full flex flex-col mt-2 gap-y-1"
              onSubmit={handleInteraction}
            >
              <p>What are your thoughts?</p>
              <Reply thought={thought} setThought={setThought} />
            </form>
          )}

          <section className="flex gap-y-1 flex-col">
            <h1 className="text-base mb-2 md:text-xl text-gray-400">
              Interactions
            </h1>

            {viewedThought.interactions.length <= 0 && (
              <h1 className="text-gray-500 w-full text-center text-lg md:text-xl">
                No interactions
              </h1>
            )}
            <section className="grid gri-flow-cols gap-y-5">
              {viewedThought.interactions.length >= 1 &&
                viewedThought.interactions.map((comment: any) => (
                  <CommentCard comment={comment} />
                ))}
            </section>
          </section>
        </section>
      )}
    </section>
  );
};

export default Thought;
