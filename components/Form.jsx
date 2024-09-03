import Link from "next/link";

const Form = ({ type, submitting, createPost, post, setPost }) => {
  return (
    <section>
      <h1>{type} Post</h1>
      <form onSubmit={createPost} className="flex flex-col">
        <label className="flex flex-col">
          <span>Content: </span>
          <textarea
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            placeholder="Describe yourself and your skills here..."
            required
          />
        </label>
        <label className="flex flex-col">
          <span>
            Tag: <span className="text-gray-500">(#react, #html, #css)</span>{" "}
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
          />
        </label>
        <div className="flex gap-4">
          <Link href="/">Cancel</Link>
          <button>{submitting ? `submitting` : `${type} Post`}</button>
        </div>
      </form>
    </section>
  );
};

export default Form;
