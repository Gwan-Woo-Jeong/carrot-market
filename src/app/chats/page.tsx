"use client";

import type { NextPage } from "next";
import Layout from "@/components/layout";
import Link from "next/link";
import useSWR from "swr";
import { ChatRoom } from "@prisma/client";
import useUser from "@/libs/client/useUser";
import Image from "next/image";

/*
    #5.8 Chats

    Divide Width
    요소 사이의 border width를 제어.
    자동적으로 구분선을 생성하되 첫 요소의 윗 부분과 마지막 요소의 아래 부분의 구분선은 생성하지 않는다. 

    divide-x = border-right-width: 1px; border-left-width: 0px;
    divide-x-2 = border-right-width: 2px; border-left-width: 0px;

    divide-y = border-top-width: 0px; border-bottom-width: 1px;
    divide-y-2 = border-top-width: 0px; border-bottom-width: 2px;

    (+) divide-y-[1px]로 쓰거나 [1px]을 생략하고 divide-y로 쓸 수도 있음
 */

interface ChatRoomWithUser extends ChatRoom {
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
  chatMessages: {
    id: number;
    message: string;
  }[];
}

interface ChatRoomResponse {
  ok: boolean;
  chatRooms: ChatRoomWithUser[];
}

const Chats: NextPage = () => {
  const { data } = useSWR<ChatRoomResponse>(
    process.env.NEXT_PUBLIC_HOST_URL + "/api/chats"
  );

  const { user } = useUser();

  const ChatRoomItem = ({ chatRoom }: { chatRoom: ChatRoomWithUser }) => {
    let other;

    if (user?.id !== chatRoom.hostId) {
      other = chatRoom.host;
    } else {
      other = chatRoom.guest;
    }

    const recentMessage =
      chatRoom.chatMessages.length > 0
        ? chatRoom.chatMessages[chatRoom.chatMessages.length - 1].message
        : "";

    return (
      <Link
        className="flex px-4 cursor-pointer py-3 items-center space-x-3"
        href={`/chats/${chatRoom.id}`}
        key={chatRoom.id}
      >
        {other.avatar ? (
          <div className="relative w-12 h-12 rounded-full object-cover">
            <Image fill alt="avatar-preview" src={other.avatar} />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-slate-300" />
        )}
        <div>
          <p className="text-gray-700">{other.name}</p>
          <p className="text-sm  text-gray-500">{recentMessage}</p>
        </div>
      </Link>
    );
  };

  return (
    <Layout hasTabBar title="채팅">
      <div className="divide-y-[1px] ">
        {data?.chatRooms.map((chatRoom, i) => (
          <ChatRoomItem key={i} chatRoom={chatRoom} />
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
