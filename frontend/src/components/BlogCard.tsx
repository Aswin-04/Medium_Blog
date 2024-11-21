import { Link } from "react-router-dom";
import Avatar from "./Avatar";

interface blogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

const BlogCard = ({
  id,
  title,
  content,
  authorName,
  publishedDate,
}: blogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="space-y-2 border-slate-100 border-b-2 p-4 cursor-pointer">
        <div className="flex gap-2 items-center">
          <Avatar letter={authorName[0]} />
          <div className="">{authorName}</div>
          <div className="size-1 rounded-full bg-slate-400 flex justify-center items-center"></div>
          <div className=" text-slate-600">{publishedDate}</div>
        </div>

        <div className="font-bold text-xl">{title}</div>

        <div className="line-clamp-3">{content}</div>

        <div>{`${Math.ceil(content.split(" ").length / 10)} min read`}</div>
      </div>
    </Link>
  );
};

export default BlogCard;
