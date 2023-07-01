import Thought from "@/models/Thoughts";
import { connectToDB } from "@/utils/database";

export const POST = async (request: any) => {
  const { id, thought, tag } = await request.json();
  const splitTag = tag.split(",");
  try {
    await connectToDB();
    const newThought = await Thought.create({
      creator: id,
      thought: thought,
      tag: splitTag,
    });
    return new Response(JSON.stringify(newThought), { status: 201 });
  } catch (err) {
    return new Response("Failed to share your thought", { status: 500 });
  }
};
