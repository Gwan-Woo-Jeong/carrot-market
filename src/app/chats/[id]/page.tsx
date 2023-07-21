"use client";

import type { NextPage } from "next";
import Layout from "@/components/layout";
import Message from "@/components/message";
import useSWR from "swr";
import useMutation from "@/libs/client/useMutation";
import { useForm } from "react-hook-form";
import { ChatMessages, ChatRoom, Product } from "@prisma/client";
import useUser from "@/libs/client/useUser";
import { useRef } from "react";

interface mutationResult {
  ok: boolean;
}

interface ChatMessageForm {
  message: string;
}

interface ChatMessageWithUser extends ChatMessages {
  user: {
    id: number;
    avatar: string | null;
    name: string;
  };
}

interface ChatDetailWithUser extends ChatRoom {
  host: {
    id: number;
    avatar: string | null;
    name: string;
  };
  guest: {
    id: number;
    avatar: string | null;
    name: string;
  };
  chatMessages: ChatMessageWithUser[];
  product: Product;
}

interface ChatDetailResponse {
  ok: boolean;
  chatRoom: ChatDetailWithUser;
}

const ChatDetail: NextPage<{ params: { id: string } }> = ({
  params: { id },
}) => {
  const { user } = useUser();
  const { register, handleSubmit, reset } = useForm<ChatMessageForm>();

  const { data, mutate } = useSWR<ChatDetailResponse>(
    process.env.NEXT_PUBLIC_HOST_URL + `/api/chats/${id}`
  );

  const [sendChat] = useMutation<mutationResult>(
    process.env.NEXT_PUBLIC_HOST_URL + `/api/chats/${id}`
  );

  const [updateStatus] = useMutation<mutationResult>(
    process.env.NEXT_PUBLIC_HOST_URL +
      `/api/products/${data?.chatRoom.product.id}`,
    { method: "PATCH" }
  );

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateStatus({ status: e.target.value });
    if (!data) return;
    mutate(
      {
        ok: true,
        chatRoom: {
          ...data.chatRoom,
          product: {
            ...data.chatRoom.product,
            status: e.target.value,
          },
        },
      },
      false
    );
  };

  const onMessageValid = async (validForm: ChatMessageForm) => {
    sendChat(validForm);
    if (!data) return;
    reset();
    mutate(
      {
        ok: true,
        chatRoom: {
          ...data.chatRoom,
          chatMessages: [
            ...data.chatRoom.chatMessages,
            {
              id: Math.ceil(Math.random() * 10000),
              createdAt: new Date(),
              updatedAt: new Date(),
              userId: user!.id,
              message: validForm.message,
              chatRoomId: +id,
              user: {
                id: user!.id,
                avatar: user!.avatar,
                name: user!.name,
              },
            },
          ],
        },
      },
      false
    );
    scrollToBottom();
  };

  const getTitle = (data?: ChatDetailResponse) => {
    if (!data) return "";

    let otherName;

    if (data.chatRoom.guestId !== user?.id) {
      otherName = data.chatRoom.guest.name;
    } else {
      otherName = data.chatRoom.host.name;
    }

    return `${otherName}님과의 대화`;
  };

  return (
    <Layout
      canGoBack
      title={getTitle(data)}
      product={data?.chatRoom.product}
      handleSelect={handleSelect}
    >
      <div className="py-10 pb-16 px-4 space-y-4">
        {data?.chatRoom.chatMessages.map((chatMessage) => (
          <Message
            key={chatMessage.id}
            message={chatMessage.message}
            avatarUrl={chatMessage.user.avatar}
            reversed={user?.id !== chatMessage.user.id}
          />
        ))}
        <div ref={messagesEndRef} />
        <form
          onSubmit={handleSubmit(onMessageValid)}
          className="fixed py-2 bg-white bottom-0 inset-x-0"
        >
          <div className="flex relative max-w-md items-center w-full mx-auto">
            <input
              {...register("message", { required: true })}
              type="text"
              className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500"
            />
            <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
              <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 text-sm text-white">
                &rarr;
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ChatDetail;
