const BlogSkeleton = () => {
  return (
      <div role="status" className="animate-pulse">
        <div className="space-y-2 border-slate-100 border-b-2 p-4 cursor-pointer">
          <div className="flex gap-2 items-center">
            <div className="h-8 w-8 bg-gray-200 rounded-full  mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full  w-[50px]"></div>
            <div className="size-1 rounded-full bg-gray-200 flex justify-center items-center"></div>
            <div className="h-2 bg-gray-200 rounded-full  w-[100px]"></div>
          </div>

          <div className="h-2.5 bg-gray-200 rounded-full  max-w-[330px] mb-4"></div>

          <div className="h-2.5 bg-gray-200 rounded-full  max-w-[330px] mb-4"></div>
        </div>
      </div>
  );
};

export default BlogSkeleton;
