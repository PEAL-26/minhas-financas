import { ElementType, HTMLProps } from "react";
import { IconBaseProps } from "react-icons";
import { twMerge } from "tailwind-merge";

interface ButtonDefaultProps extends HTMLProps<HTMLButtonElement> {
  title?: string;
  icon?: ElementType<IconBaseProps>;
  type?: "button" | "submit" | "reset";
}

export function ButtonDefault(props: ButtonDefaultProps) {
  const { title, children, icon: Icon, className, type, ...rest } = props;
  return (
    <button
      type={type}
      className={twMerge(
        "inline-flex group items-center justify-between gap-2 rounded-full bg-white px-5 py-2.5 text-center text-sm font-medium text-green-500 shadow hover:bg-green-600  hover:text-white",
        className
      )}
      {...rest}
    >
      {Icon && <Icon size={20} />}
      {title || children}
    </button>
  );
}