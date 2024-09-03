import { connectToDatabase } from "@utils/database";
import Post from "@models/post";

export const GET = async (req) => {
  try {
    await connectToDatabase();

    const promts = Post.find({}).populate("creator");

    return new Response(JSON.stringify(promts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all posts", { status: 500 });
  }
};
