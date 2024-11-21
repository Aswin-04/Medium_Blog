import { useState } from "react";
import AppBar from "../components/AppBar";
import { usePostBlogs } from "../hooks";
import { useNavigate } from "react-router-dom";

const Publish = () => {

  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const { postBlogs } = usePostBlogs()
  const navigate = useNavigate()

  return (
    <div>
      <AppBar></AppBar>

      <div className="my-20 max-w-[1440px] mx-auto space-y-6 px-6">
        <div>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
            placeholder="Enter you title here"
          ></input>
        </div>

        <div>
            <textarea
              id="editor"
              rows={8}
              onChange={(e) => setContent(e.target.value)}
              className="block w-full p-2.5 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none"
              placeholder="Write an article..."
              required
            ></textarea>
        </div>

        <button
          type="submit"
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg "
          onClick={async() => {
            const id = await postBlogs({title, content})
            id && navigate(`/blog/${id}`)
            }}
        >
          Publish post
        </button>

      </div>
    </div>
  );
};

export default Publish;
