import React from "react";

export default function Search(props) {
  return (
    <div className="w-full mb-2">
      <input
        className={`px-4 py-2 border border-gray-500 rounded-lg text-black focus:outline-none placeholder-gray-400 ${props.className}`}
        type="text"
        placeholder={props.placeholder || "Search Products"}
        onChange={props.onChange}
      />
    </div>
  );
}
