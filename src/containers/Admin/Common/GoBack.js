import React from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function GoBack({ title, onClick }) {
  return (
    <button
      className={"flex flex-row items-center text-po-graydark self-start"}
      onClick={onClick}
    >
      <IoIosArrowBack />
      <p className={"text-sm ml-1"}>{title}</p>
    </button>
  );
}
