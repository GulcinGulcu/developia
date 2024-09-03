import { connectToDatabase } from "@utils/database";
import Post from "@models/post";

export const POST = async (req) => {
  const { id, content, tag } = await req.json();

  try {
    await connectToDatabase();

    const newPost = new Post({
      creator: id,
      content,
      tag,
    });

    await newPost.save();

    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create the post", { status: 500 });
  }
};
