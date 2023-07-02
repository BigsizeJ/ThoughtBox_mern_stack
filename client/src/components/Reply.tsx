import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

interface ReplyProps {
  thought: string;
  setThought: Dispatch<SetStateAction<string>>;
  height?: string;
  length?: number;
  placeholder?: string;
}

const Reply = ({
  thought,
  setThought,
  height,
  length = 500,
  placeholder = "Write your thought here...",
}: ReplyProps) => {
  const [countChar, setCountChar] = useState<number>(0);

  const handleTextChanging = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target as HTMLTextAreaElement;
    setThought(value);
    setCountChar(value.length);
  };

  return (
    <div
      className={`bg-gray-200 flex flex-col ${
        height ? `h-[${height}]` : "h-[10rem]"
      } `}
    >
      <textarea
        className="w-full flex-1 bg-transparent outline-none resize-none text-black p-2"
        required={true}
        value={thought}
        onChange={(e) => handleTextChanging(e)}
        placeholder={placeholder}
        maxLength={length}
      ></textarea>
      <div
        className="border-t border-1 border-gray-400 text-black
       flex justify-between items-center "
      >
        <p className="text-gray-500 px-2">
          char {countChar}/{length}
        </p>
        <button
          className="px-2 py-1  w-fit hover:bg-blue-400 hover:text-white"
          type="submit"
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default Reply;
