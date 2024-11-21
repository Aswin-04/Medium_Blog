import AppBar from "../components/AppBar";
import Avatar from "../components/Avatar";
import Spinner from "../components/Spinner";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

const BlogPage = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });

  return loading ? (
    <div className="min-h-screen flex flex-col">
      <AppBar/>
      <div className="flex-1 flex justify-center items-center">
        <Spinner/>
      </div>
    </div>
  ) : (
    <div>
      <AppBar></AppBar>
      <div className="w-full max-w-[1440px] px-8 mx-auto mt-16 flex flex-col gap-10 lg:flex-row lg:mt-32">
        <div className="lg:w-3/4">
          <div className="font-extrabold text-5xl max-md:text-3xl">{blog?.title}</div>
          <div className="text-slate-600 mt-2">{"Posted on 15th November 2024"}</div>
          <div className="mt-4 leading-7 text-justify">{blog?.content}</div>
        </div>
        <div className="lg:w-1/4 space-y-3 mb-16">
          <div className="font-medium">{"Author"}</div>
          <div className="flex gap-6">
            <div className="self-center">
              <Avatar letter={blog?.authorName?.[0] || "A"} ></Avatar>
            </div>
            <div className="space-y-2">
              <div className="text-xl md:text-2xl font-bold">{blog?.authorName || "Anonymous"}</div>
              <div className="text-slate-600">
                Master the mirth, purveyor of puns, and the funniest person in
                the kingdom
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
