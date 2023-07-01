import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../hooks/useStore";
import { StoreType } from "../hooks/context/StoreProvider";
import { FaUserPlus } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";

const Thought = () => {
  const { id } = useParams();
  const { user, viewedThought, dispatch } = useStore();
  const [isHearted, setIsHearted] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/thoughts/${id}`)
      .then(async (res) => {
        const data = await res.data;
        console.log(data);

        dispatch({ type: StoreType.VIEWED_THOUGHT, payload: data });
      })
      .catch((err) => console.error(err));

    if (user && viewedThought) {
      const alreadyHearted = user.hearted_thought.find(
        (thought: any) => thought._id === thought._id
      );
      if (alreadyHearted) setIsHearted(true);
    }

    return () => {};
  }, []);

  const handleReplySubmit = (e: FormEvent) => {
    e.preventDefault();
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
              <p className="text-base lg:text-xl">
                {viewedThought.creator.name}
              </p>
              <p className="text-sm lg:text-base">
                {viewedThought.creator.email}
              </p>
            </div>
          </div>
          <div className="flex ">
            <div className="flex gap-y-1 flex-col">
              <p className="text-base md:text-xl">{viewedThought.thought}</p>
              <div
                className="flex flex-col mt-2 justify-between 
              lg:flex-row lg:items-center"
              >
                <div className="flex flex-wrap gap-x-2 w-full">
                  {viewedThought.tag.map((tag: string) => (
                    <p className="text-gray-500">{tag}</p>
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
                    />
                    <p>{viewedThought.hearts.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {user._id !== viewedThought.creator._id && (
            <form
              className="w-full flex flex-col mt-2 gap-y-1"
              onSubmit={handleReplySubmit}
            >
              <p>What are your thoughts?</p>
              <textarea className="w-full reply" required={true}></textarea>
              <button className="p-1 bg-blue-500 w-fit hover:bg-blue-400 mt-1">
                Comment
              </button>
            </form>
          )}

          <h1 className="text-base md:text-xl text-gray-200">Interactions</h1>
          {viewedThought.interactions.length <= 0 && (
            <h1 className="text-gray-500 w-full text-center text-lg md:text-xl">
              No interactions{" "}
            </h1>
          )}
        </section>
      )}
    </section>
  );
};

export default Thought;
