import Card from "./Card";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CardSkeleton from "./CardSkeleton";
import { useStore } from "../hooks/useStore";
import { StoreType } from "../hooks/context/StoreProvider";

const Feed = () => {
  const { thoughts, dispatch } = useStore();
  const [render, setRender] = useState<boolean>(false);

  useEffect(() => {
    console.log("useeffect render");
    (async () => {
      const res = await axios.get("http://localhost:3000/thoughts/popular");
      await new Promise((res) => {
        setTimeout(() => {
          return res("");
        }, 1500);
      });
      dispatch({ type: StoreType.GET_THOUGHTS, payload: res.data });
    })();
  }, []);

  return (
    <div className="my-5 px-2 md:px-20 md:py-10">
      <h1 className="text-base text-gray-200 md:text-base">
        Most popular thought:
      </h1>
      <div
        className="grid 
      grid-cols-1
      lg:grid-cols-3
      mt-3 gap-5"
      >
        {thoughts === null
          ? Array.from({ length: 6 }, (_, i) => ({ index: i + 1 })).map((i) => (
              <CardSkeleton key={i.index} />
            ))
          : thoughts.map((thought: any) => (
              <Card key={thought._id} thought={thought} />
            ))}
      </div>
    </div>
  );
};

export default Feed;
