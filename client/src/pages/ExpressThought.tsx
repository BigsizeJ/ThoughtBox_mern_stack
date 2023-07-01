import { useEffect } from "react";
import { useStore } from "../hooks/useStore";
import { useNavigate } from "react-router-dom";
import Form from "../components/CreateForm";
const ExpressThought = () => {
  const { user } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) navigate("/");
  }, []);

  return (
    <section className="flex text-gray-200 w-full h-full justify-center items-center py-10 px-5 flex-col lg:py-12 lg:px-32">
      <h1
        className="text-xl font-bold bg-clip-text text-transparent 
          bg-gradient-to-r from-blue-200 to-blue-500 md:text-3xl py-2 mb-1"
      >
        Write your thoughts
      </h1>
      <p className="">
        Express your unique perspectives, insights, and reflections with ease.
        <br></br>
        ThoughtBox empowers you to craft compelling thoughts that resonate with
        <br></br>
        others, encouraging thought-provoking conversations and connections.
      </p>
      <Form />
    </section>
  );
};

export default ExpressThought;
