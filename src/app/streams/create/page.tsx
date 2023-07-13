"use client";

import type { NextPage } from "next";
import Button from "@/components/button";
import Input from "@/components/input";
import Layout from "@/components/layout";
import TextArea from "@/components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@/libs/client/useMutation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Stream } from "@prisma/client";

/*
  #14.1 Detail Page
  
  valueAsNumber: boolean
  - 입력한 input을 숫자로 반환
  - 문제가 발생하면 NaN이 반환
  -  valueAs 프로세스는 유효성 검사 후 발생합니다.

  valueAsDate: boolean
  - 입력한 input을 날짜로 반환
  - 문제가 발생하면 null이 반환
 */

interface CreateForm {
  name: string;
  price: string;
  description: string;
}

interface CreateResponse {
  ok: boolean;
  stream: Stream;
}

const Create: NextPage = () => {
  const [createStream, { loading, data }] = useMutation<CreateResponse>(
    process.env.NEXT_PUBLIC_HOST_URL + `/api/streams`
  );
  const { register, handleSubmit } = useForm<CreateForm>();
  const router = useRouter();

  const onValid = (form: CreateForm) => {
    if (loading) return;
    createStream(form);
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/streams/${data.stream.id}`);
    }
  }, [data, router]);

  return (
    <Layout canGoBack title="Go Live">
      <form onClick={handleSubmit(onValid)} className=" space-y-4 py-10 px-4">
        <Input
          register={register("name", { required: true })}
          required
          label="Name"
          name="name"
          type="text"
        />
        <Input
          register={register("price", { required: true, valueAsNumber: true })}
          required
          label="Price"
          name="price"
          type="text"
          kind="price"
        />
        <TextArea
          register={register("description", { required: true })}
          name="description"
          label="Description"
        />
        <Button text={loading ? "Loading..." : "Go live"} />
      </form>
    </Layout>
  );
};

export default Create;
