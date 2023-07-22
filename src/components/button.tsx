import { cls } from "../libs/client/utils";

interface ButtonProps {
  large?: boolean;
  small?: boolean;
  text: string;
  disabled?: boolean;
  [key: string]: any;
}

export default function Button({
  large = false,
  medium = false,
  small = false,
  disabled,
  text,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={cls(
        " text-white  px-4 border border-transparent rounded-md shadow-sm font-medium",
        large
          ? "py-3 text-base w-full"
          : medium
          ? "py-2 text-sm w-32"
          : small
          ? "py-1 text-xs w-24"
          : "py-2 text-sm w-full",
        disabled
          ? "bg-gray-300"
          : "bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none"
      )}
    >
      {text}
    </button>
  );
}
