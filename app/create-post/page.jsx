"use client";

import Form from "@components/Form";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreatePost = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    content: "",
    tag: "",
  });
  const router = useRouter();
  const { data: session } = useSession();

  const createPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/posts/new", {
        method: "POST",
        body: JSON.stringify({
          content: post.content,
          tag: post.tag,
          id: session?.user.id,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      createPost={createPost}
      submitting={submitting}
    />
  );
};

export default CreatePost;
