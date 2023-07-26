"use client";

import type { NextPage } from "next";
import Layout from "@/components/layout";
import Message from "@/components/message";
import useSWR from "swr";
import useMutation from "@/libs/client/useMutation";
import { useForm } from "react-hook-form";
import { ChatMessages, ChatRoom, Product } from "@prisma/client";
import useUser from "@/libs/client/useUser";
import React, { useRef, useState } from "react";
import Modal from "@/components/modal";
import { cls, getCurrentTime } from "@/libs/client/utils";
import Button from "@/components/button";
import TextArea from "@/components/textarea";

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

interface ReviewForm {
  review: string;
}

interface ReviewResponse {
  ok: boolean;
}

type ModalState = {
  reserve: boolean;
  sold: boolean;
  review: boolean;
};

const ChatDetail: NextPage<{ params: { id: string } }> = ({
  params: { id },
}) => {
  const [currentDate] = getCurrentTime().split(" ");
  const [hourLaterDate, hourLaterTime] = getCurrentTime(60).split(" ");

  const { user } = useUser();
  const { register, handleSubmit, reset } = useForm<ChatMessageForm>();
  const { register: reviewRegister, handleSubmit: handleReviewSubmit } =
    useForm<ReviewForm>();

  const [isModalVisible, setIsModalVisible] = useState({
    reserve: false,
    sold: false,
    review: false,
  });

  const [reserveDate, setReserveDate] = useState(hourLaterDate);
  const [reserveTime, setReserveTime] = useState(hourLaterTime);
  const [error, setError] = useState("");
  const [score, setScore] = useState({ hover: 3, click: 3 });

  const { data, mutate } = useSWR<ChatDetailResponse>(
    typeof window === "undefined" ? `/api/chats/${id}` : null
  );

  const [sendChat] = useMutation<mutationResult>(`/api/chats/${id}`);

  const [updateStatus, { loading }] = useMutation<mutationResult>(
    `/api/products/${data?.chatRoom.product.id}`,
    { method: "PATCH" }
  );

  const [postReview, { loading: reviewLoading }] = useMutation<ReviewResponse>(
    `/api/reviews/${
      data?.chatRoom.hostId === user?.id
        ? data?.chatRoom.guestId
        : data?.chatRoom.hostId
    }?productId=${data?.chatRoom.productId}`
  );

  const onValid = ({ review }: ReviewForm) => {
    if (reviewLoading) return;
    postReview({ review, score: score.click });
    mutateStatus("sold", undefined, true);
    handleModal("review", false);
  };

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const mutateStatus = (
    status?: string,
    reservedAt?: string,
    isReview?: boolean
  ) => {
    if (!data) return;
    mutate(
      {
        ok: true,
        chatRoom: {
          ...data.chatRoom,
          product: {
            ...data.chatRoom.product,
            status: status || data.chatRoom.product.status,
            reservedAt: (reservedAt as any) || null,
            ...(isReview && { reviewId: Math.ceil(Math.random() * 10000) }),
          },
        },
      },
      false
    );
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "reserve") {
      handleModal("reserve", true);
    } else if (e.target.value === "sold") {
      handleModal("sold", true);
    } else {
      if (loading) return;
      updateStatus({ status: e.target.value });
      mutateStatus(e.target.value);
    }
  };

  const handleModal = (key: keyof ModalState, value: boolean) =>
    setIsModalVisible((prev) => ({ ...prev, [key]: value }));

  const onClickReserve = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading) return;
    e.preventDefault();

    const inputTime = new Date(`${reserveDate} ${reserveTime}`);
    const currentTime = new Date(getCurrentTime());

    if (inputTime.getTime() <= currentTime.getTime()) {
      return setError("지난 시간으로 예약할 수 없습니다.");
    }

    const tzoffset = new Date().getTimezoneOffset() * 60000;
    const reservedAt = new Date(inputTime.getTime() - tzoffset).toISOString();

    updateStatus({ status: "reserve", reservedAt });
    mutateStatus("reserve", reservedAt);
    handleModal("reserve", false);
  };

  const onClickSold = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading) return;
    e.preventDefault();

    updateStatus({
      status: "sold",
      buyerId: data?.chatRoom.hostId,
    });
    mutateStatus("sold");
    handleModal("sold", false);
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

  const onChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) setError("");
    setReserveDate(e.target.value);
  };

  const onChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) setError("");
    setReserveTime(e.target.value);
  };

  return (
    <Layout
      canGoBack
      title={getTitle(data)}
      product={data?.chatRoom.product}
      handleSelect={handleSelect}
      onClickWriteReview={() => handleModal("review", true)}
      isSeller={user?.id === data?.chatRoom.guestId}
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
      <Modal
        isVisible={isModalVisible.reserve}
        onClose={() => handleModal("reserve", false)}
      >
        <div className="space-y-2">
          <div className="text-center text-lg font-bold">
            예약 시간을 설정해주세요
          </div>
          <div className="flex justify-center items-center">
            <input
              className="border-none focus:ring-0"
              type="date"
              min={currentDate}
              value={reserveDate}
              onChange={onChangeDate}
              required
            />
            <input
              className="border-none focus:ring-0"
              type="time"
              value={reserveTime}
              onChange={onChangeTime}
              required
            />
          </div>
          {error ? (
            <div className="text-red-500 text-center">
              예약 시간이 이미 지난 상태입니다.
            </div>
          ) : null}
          <div className="text-center">
            <Button onClick={onClickReserve} medium text="예약하기" />
          </div>
        </div>
      </Modal>
      <Modal
        isVisible={isModalVisible.review}
        onClose={() => handleModal("review", false)}
      >
        <div className="text-center text-xl font-bold">리뷰 작성</div>
        <form className="p-4 space-y-4" onSubmit={handleReviewSubmit(onValid)}>
          <div className="flex justify-center items-center space-x-1">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <svg
                  key={i}
                  data-darkreader-inline-stroke=""
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className={cls(
                    "w-10 h-10 stroke-yellow-400",
                    score.hover > i ? "fill-yellow-400" : ""
                  )}
                  onMouseOver={() =>
                    setScore((prev) => ({ ...prev, hover: i + 1 }))
                  }
                  onMouseOut={() =>
                    setScore((prev) => ({ ...prev, hover: prev.click }))
                  }
                  onClick={() =>
                    setScore((prev) => ({ ...prev, click: i + 1 }))
                  }
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  ></path>
                </svg>
              ))}
          </div>
          <TextArea
            required
            placeholder="리뷰는 수정이 불가하니 신중하게 작성해주세요."
            register={reviewRegister("review", {
              required: true,
              minLength: 5,
            })}
          />
          <Button large text={loading ? "Loading..." : "Submit"} />
        </form>
      </Modal>
      <Modal
        isVisible={isModalVisible.sold}
        onClose={() => handleModal("sold", false)}
      >
        <div className="text-center">
          <p className="text-lg">해당 상품은 판매 완료 처리하시겠습니까?</p>
          <p className="text-red-500 mb-8">이 작업은 되돌릴 수 없습니다.</p>
          <Button
            onClick={onClickSold}
            medium
            text={loading ? "Loading..." : "확인"}
          />
        </div>
      </Modal>
    </Layout>
  );
};

export default ChatDetail;
