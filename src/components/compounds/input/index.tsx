import { HTMLProps } from "react";
import { forwardRef } from "react";

interface InputProps extends HTMLProps<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, placeholder, ...rest } = props;

  return (
    <div className="group relative z-0 w-full">
      <input
        ref={ref}
        name="pesquisar"
        id="pesquisar"
        className="peer block w-full appearance-none rounded-md border border-gray-300 bg-transparent px-0 py-1 text-sm text-gray-900 focus:border-green-400 focus:outline-none focus:ring-0 "
        placeholder=""
        {...rest}
      />
      <label
        htmlFor="pesquisar"
        className="absolute top-1 -z-10 origin-[0] -translate-y-2 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0  peer-focus:top-3 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-green-400 "
      >
        {label || placeholder}
      </label>
    </div>
  );
});
