"use client";

import useMutation from "@/libs/client/useMutation";
import useUser from "@/libs/client/useUser";
import { ChatRoom } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "./button";
import LikeButton from "./likeButton";

interface ChatRoomResponse {
  ok: boolean;
  chatRoom: ChatRoom;
}

const ButtonTab = ({
  productId,
  sellerId,
  isLiked,
}: {
  productId?: number;
  sellerId?: number;
  isLiked?: boolean;
}) => {
  const { user } = useUser();
  const router = useRouter();

  const [createChatRoom, { loading }] = useMutation<ChatRoomResponse>(
    process.env.NEXT_PUBLIC_HOST_URL + `/api/chats`,
    {
      onSuccess: (data) => router.push(`/chats/${data.chatRoom.id}`),
    }
  );

  const onClickChatRoom = () => {
    if (loading) return;
    createChatRoom({ productId, guestId: sellerId });
  };

  return productId && user?.id !== sellerId ? (
    <div className="flex items-center justify-between space-x-2">
      <Button
        large
        text={loading ? "loading..." : "Talk to seller"}
        onClick={onClickChatRoom}
      />
      <LikeButton id={productId} isLiked={isLiked} />
    </div>
  ) : null;
};

export default ButtonTab;
