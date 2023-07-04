"use client";

import type { NextPage } from "next";
import Button from "@/components/button";
import Input from "@/components/input";
import Layout from "@/components/layout";
import useUser from "@/libs/client/useUser";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useMutation from "@/libs/client/useMutation";
import { useRouter } from "next/navigation";
import Image from "next/image";

// #13.6 Edit Profile

interface EditProfileForm {
  email?: string;
  phone?: string;
  name?: string;
  avatar?: FileList;
  formErrors?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

// #15.4 Direct Upload URL

const EditProfile: NextPage = () => {
  const { user } = useUser();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm<EditProfileForm>();

  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponse>(`/api/users/me`);

  const router = useRouter();

  useEffect(() => {
    if (user?.name) setValue("name", user.name);
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
  }, [user, setValue]);

  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError("formErrors", { message: data.error });
    }
  }, [data, setError]);

  useEffect(() => {
    if (data?.ok === true) {
      router.push(`/profile`);
    }
  }, [data, router]);

  const onValid = async ({ email, phone, name, avatar }: EditProfileForm) => {
    if (loading) return;
    if (email === "" && phone === "" && name === "") {
      return setError("formErrors", {
        message: "Email or Phone number, or Name is required",
      });
    }

    if (avatar && avatar.length > 0) {
      // CF URL 요청
      const cloudflareRequest = await (await fetch(`/api/files`)).json();
      // CF URL로 파일 업로드
      editProfile({
        email,
        phone,
        name,
        // avatarURL : CF URL
      });
    } else {
      editProfile({ email, phone, name });
    }
  };

  const [avatarPreview, setAvatarPreview] = useState("");
  const avatar = watch("avatar");

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0]; // 브라우저의 메모리에 있는 파일 (URL로 접근 불가능)
      setAvatarPreview(URL.createObjectURL(file)); // URL 접근 가능
    }
  }, [avatar]);

  /*
  #15.1 Image Preview

  URL.createObjectURL(object)
  - object : 객체 URL을 생성할 File, Blob, MediaSource 객체
  - 리턴값 : 지정한 object의 참조 URL을 담은 DOMString

  - 주어진 객체를 가리키는 URL을 DOMString으로 반환
  - 같은 객체를 사용하더라도, 매번 호출할 때마다 새로운 객체 URL을 생성
  - 각각의 URL을 더는 쓰지 않을 땐 URL.revokeObjectURL()을 사용해 하나씩 해제해줘야 함
   */

  return (
    <Layout canGoBack title="Edit Profile">
      <form onSubmit={handleSubmit(onValid)} className="py-10 px-4 space-y-4">
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <Image
              width={14}
              height={14}
              alt="avatar-preview"
              src={avatarPreview}
              className="w-14 h-14 rounded-full bg-slate-500"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-slate-500" />
          )}
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            Change
            <input
              {...register("avatar")}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register("name")}
          required={false}
          label="Name"
          name="name"
          type="text"
        />
        <Input
          register={register("email")}
          required={false}
          label="Email address"
          name="email"
          type="email"
        />
        <Input
          register={register("phone")}
          required={false}
          label="Phone number"
          name="phone"
          type="number"
          kind="phone"
        />
        {errors.formErrors?.message ? (
          <span className="my-2 text-red-500 font-medium text-center block">
            {errors.formErrors.message}
          </span>
        ) : null}
        <Button text={loading ? "Loading..." : "Update profile"} />
      </form>
    </Layout>
  );
};

export default EditProfile;
