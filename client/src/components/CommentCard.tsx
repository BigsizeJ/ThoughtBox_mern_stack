import React, { FormEvent, useState } from "react";
import { BiReply } from "react-icons/bi";
import { useStore } from "../hooks/useStore";
import { StoreType } from "../hooks/context/StoreProvider";
import Reply from "./Reply";
import axios from "axios";

const CommentCard = ({ comment }: any) => {
  const { user, viewedThought, dispatch } = useStore();
  const [thought, setThought] = useState<string>("");
  const [viewReply, setViewReply] = useState<boolean>(false);

  const handleReplying = (id: string) => {
    if (user === null) return;

    dispatch({ type: StoreType.UPDATE_REPLY_OF_VIEWED_THOUGHT, payload: id });
  };

  const handleReplySubmit = async (e: FormEvent, commentId: string) => {
    e.preventDefault();
    setThought("");

    // turn isReplying to false
    dispatch({
      type: StoreType.UPDATE_REPLY_OF_VIEWED_THOUGHT,
      payload: commentId,
    });
    const res = await axios.post(
      `http://localhost:3000/thoughts/reply/${viewedThought._id}`,
      {
        creator: user._id,
        commentId: commentId,
        comment: thought.trim(),
      }
    );
    if (res.status === 200) {
      const data = await res.data;

      /// updating the viewed_thought
      dispatch({ type: StoreType.VIEWED_THOUGHT, payload: data });
    }
  };

  return (
    <section className="pt-2 px-4 border-1 border-l border-gray-500">
      <div className="flex items-center gap-x-2">
        <img
          src={comment.creator.picture}
          alt="comment profile picture"
          className="rounded-full w-7 h-7"
        />
        <div>
          <div>
            <p className="text-sm">{comment.creator.name}</p>
          </div>

          <p className="text-xs">{comment.creator.email}</p>
        </div>
      </div>
      <p className="px-2 py-3 text-base">{comment.comment}</p>
      <div
        className={`${
          comment.replies.length > 0 ? "justify-between" : "justify-end"
        }
        ${viewReply ? "mb-2" : "mb-0"}
        w-full flex items-center text-gray-400`}
      >
        {comment.replies.length > 0 && (
          <button
            className="text-sm hover:text-blue-500"
            onClick={() => setViewReply((prev) => !prev)}
          >
            {viewReply ? "Hide Reply" : "View Reply"}
          </button>
        )}
        <button
          className="text-sm flex px-2 hover:text-blue-500"
          onClick={() => handleReplying(comment._id)}
        >
          <BiReply
            className={`${comment.isReplying ? "mb-1" : "mb-0"} text-xl`}
          />{" "}
          Reply
        </button>
      </div>

      <section className="grid grid-flow-row gap-y-3">
        {comment.replies.length > 0 &&
          viewReply &&
          comment.replies.map((reply: any) => (
            <div className="ml-4 border-l border-1 border-gray-500 px-4">
              <div className="flex items-center gap-x-2">
                <img
                  src={reply.creator.picture}
                  alt="comment profile picture"
                  className="rounded-full w-5 h-5"
                />
                <div>
                  <div>
                    <p className="text-xs">{reply.creator.name}</p>
                  </div>
                  <p className="text-xs">{reply.creator.email}</p>
                </div>
              </div>
              <p className="px-2 mt-2 text-sm">{reply.comment}</p>
            </div>
          ))}
      </section>

      {comment.isReplying && (
        <form
          onSubmit={(e) => handleReplySubmit(e, comment._id)}
          className="mt-4"
        >
          <Reply
            thought={thought}
            setThought={setThought}
            placeholder="Write your reply here..."
            height="2rem"
          />
        </form>
      )}
    </section>
  );
};

export default CommentCard;
