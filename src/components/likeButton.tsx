"use client";

import useMutation from "@/libs/client/useMutation";
import { useState } from "react";
import { cls } from "../libs/client/utils";

interface ButtonProps {
  id: number;
  isLiked?: boolean;
}

export default function LikeButton({ id, isLiked: propIsLiked }: ButtonProps) {
  const [isLiked, setIsLike] = useState(propIsLiked);

  const [toggleFav] = useMutation(
    process.env.NEXT_PUBLIC_HOST_URL + `/api/products/${id}/fav`,
    { callback: () => setIsLike((prev) => !prev) }
  );

  return (
    <button
      onClick={() => toggleFav({})}
      className={cls(
        "p-3 rounded-md flex items-center justify-center",
        isLiked
          ? "text-red-600 hover:bg-red-100 hover:text-red-500"
          : "text-gray-400 hover:bg-gray-100 hover:text-gray-500"
      )}
    >
      {isLiked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clip-rule="evenodd"
          />
        </svg>
      ) : (
        <svg
          className="h-6 w-6 "
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      )}
    </button>
  );
}
