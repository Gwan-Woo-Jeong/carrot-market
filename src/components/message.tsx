import Image from "next/image";
import { cls } from "../libs/client/utils";

interface MessageProps {
  message: string;
  reversed?: boolean;
  avatarUrl?: string | null;
}

export default function Message({
  message,
  avatarUrl,
  reversed,
}: MessageProps) {
  return (
    <div
      className={cls(
        "flex items-start space-x-2",
        reversed ? "flex-row-reverse space-x-reverse" : ""
      )}
    >
      {avatarUrl ? (
        <div className="relative w-8 h-8 rounded-full object-cover">
          <Image className="z-[-1]" fill alt="avatar-preview" src={avatarUrl} />
        </div>
      ) : (
        <div className="w-8 h-8 rounded-full bg-slate-400" />
      )}
      <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
        <p>{message}</p>
      </div>
    </div>
  );
}
