"use client";
import Tippy from "@tippyjs/react";
import { TfiImport } from "react-icons/tfi";

import ImportarDadosInput from "./input";

export default function ImportarDados() {
  return (
    <Tippy
      content={<ImportarDadosInput />}
      allowHTML
      interactive
      duration={0}
      animation="perspective-subtle"
      trigger="click"
      placement="bottom-end"
    >
      <button
        type="button"
        className="group rounded-lg  border border-gray-100 bg-gray-100  p-2.5 hover:bg-gray-300"
      >
        <TfiImport
          className=" fill-gray-600 group-hover:fill-gray-900"
          size={18}
        />
      </button>
    </Tippy>
  );
}
