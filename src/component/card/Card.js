import React from "react";

export default function Card(props) {
  return (
    <button className="sm:w-[17.3rem] w-[21.2rem] sm:h-[7.436rem] h-[8rem] bg-gradient-to-r from-[#9b59b6] to-[#e74c3c] hover:shadow-2xl rounded-xl">
      <div className="flex pl-[1.125rem] pt-[0.2rem] gap-6">
        {props.icon}
        <div className="flex flex-col justify-start items-start space-y-2 ">
          <h1 className="text-white text-[1rem] font-medium">{props.tag}</h1>
          <h2 className="flex text-white text-[1.5rem] font-bold">{props.data}</h2>
        </div>
      </div>
    </button>
  );
}
