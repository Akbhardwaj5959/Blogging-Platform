import { getEnv } from "@/halpers/getenv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { FaRegComment } from "react-icons/fa";
// import { FaRegHeart } from "react-icons/fa";

const CommentCount = ({ props }) => {
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/comment/get-count/${props.blogid}`,
    {
      method: "get",
      credentials: "include",
    }
  );

  return (
    <button
      type="button"
      className="flex justify-between items-center gap-2 text-gray-500 hover:text-gray-800 transition-all duration-300"
    >
      <FaRegComment />
      {data && data?.commentCount}
    </button>
  );
};

export default CommentCount;
