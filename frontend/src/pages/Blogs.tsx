import BlogCard from "../components/BlogCard";
import AppBar from "../components/AppBar";
import { useBlogs } from "../hooks";
import BlogSkeleton from "../components/BlogSkeleton";
import { useNavigate } from "react-router-dom";
const Blogs = () => {

  const { loading, blogs, isAuthorized } = useBlogs();
  const navigate = useNavigate()
  
  if(!isAuthorized) {
    navigate("/signin", {replace: true})
    return null
  }

  return (
    <div>
      {loading ? (
        <div>
          <AppBar></AppBar>
          <div className="flex justify-center my-20 ">
            <div className="w-full max-w-xl space-y-2 p-4">
              <BlogSkeleton/>
              <BlogSkeleton/>
              <BlogSkeleton/>
              <BlogSkeleton/>
              <BlogSkeleton/>
              <BlogSkeleton/>
              <BlogSkeleton/>
              <BlogSkeleton/>
            </div>
          </div>
        </div>
      ) : (
        <div className="">
          <AppBar></AppBar>
          <div className="flex justify-center my-20 ">
            <div className="w-full max-w-xl space-y-2 p-4">
              {blogs.map((blog, index) => (
                <BlogCard
                  key={index}
                  id={blog.id}
                  title={blog.title}
                  content={blog.content}
                  authorName={blog.authorName || "Aswin"}
                  publishedDate={"15th November 2024"}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
