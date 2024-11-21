import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
  id: string;
  title: string;
  content: string;
  authorName: string;
  publishedDate?: string;
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setBlogs(res.data.blogs);
        setLoading(false);
        setIsAuthorized(true)
      })
      .catch(() => {
        setLoading(false)
        setIsAuthorized(false)
      })
  }, []);

  return {
    loading,
    blogs,
    isAuthorized,
  };
};

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setBlog(res.data.blog);
        setLoading(false);
        setIsAuthorized(true)
      })
      .catch(() => {
        setLoading(false)
        setIsAuthorized(false)
      })

  }, [id]);

  return {
    loading,
    blog,
    isAuthorized
  };
};

export const usePostBlogs = () => {
  const postBlogs = useCallback(
    async ({ title, content }: { title: string; content: string })  =>  {
      try {
        const res = await axios.post(
          `${BACKEND_URL}/api/v1/blog`,          
          { title, content },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        return res.data.id
      } catch (error) {
        console.error("Error posting blog:", error);
        return null
      }
    },
    []
  );

  return {
    postBlogs,
  };
};
