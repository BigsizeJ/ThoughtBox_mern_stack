import { ChangeEvent, FormEvent } from "react";
import { useState, useRef } from "react";
import axios from "axios";
import { useStore } from "../hooks/useStore";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const { user } = useStore();
  const [post, setPost] = useState<{ post: string; tag: string }>({
    post: "",
    tag: "",
  });
  const [charCount, setCharCount] = useState<number>(0);
  const [error, setError] = useState<{ notValid: boolean; message: string }>({
    notValid: false,
    message: "",
  });

  const postRef = useRef<HTMLTextAreaElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handlePostChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLTextAreaElement;
    setCharCount(value.length);
    setPost({ ...post, post: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const tag = post.tag.split(",");

    // client-side validation
    if (post.post.length < 30) {
      postRef.current?.classList.add("border-4", "border-red-500");
      return setError({
        notValid: true,
        message:
          "Thought should not be empty and/or should be 30 characters long",
      });
    } else postRef.current?.classList.remove("border-4", "border-red-500");
    if (post.tag === "" || tag.length <= 0) {
      tagRef.current?.classList.add("border-4", "border-red-500");
      return setError({
        notValid: true,
        message: "Tag should contain atleast 1 tag",
      });
    } else tagRef.current?.classList.remove("border-4", "border-red-500");
    if (tag.length > 5) {
      tagRef.current?.classList.add("border-4", "border-red-500");
      return setError({
        notValid: true,
        message: "Maximum tag is five (5) only.",
      });
    } else tagRef.current?.classList.remove("border-4", "border-red-500");

    /// validated
    setError({ notValid: false, message: "" });

    /// post to /user/create/thought

    const res = await axios.post("http://localhost:3000/user/thought/new", {
      creator: user._id,
      thought: post.post,
      tag: tag,
    });
    if (res.status === 200) navigate("/");
  };

  return (
    <>
      <form
        className="mt-10 flex gap-y-2 flex-col w-full md:items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-y-2">
          <label
            className="text-gray-300 text-sm md:text-base flex justify-between"
            htmlFor="thought"
          >
            Your thoughts: <p className="text-gray-400">{charCount}/500</p>
          </label>
          <textarea
            name="thought"
            id="thought"
            maxLength={500}
            placeholder="Write your thoughts here..."
            className="form_textarea"
            ref={postRef}
            onChange={(e) => handlePostChange(e)}
          ></textarea>
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="text-gray-300 text-sm md:text-base" htmlFor="tag">
            Tag (#opinion, #ideas, #rant)
          </label>
          <input
            className="form_tagarea"
            type="text"
            placeholder="#Tag"
            ref={tagRef}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
          />
        </div>
        <div className="w-full md:w-[50vw] mt-2">
          {error.notValid && (
            <p className="text-left text-red-500">{error.message}</p>
          )}
          <button
            className="bg-blue-500 text-gray-200 px-10 py-1 text-base md:text-lg font-bold float-right 
            hover:bg-blue-400 transition duration-200"
          >
            Share
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
