import React from "react";
import Navigation from "../../component/navigation/Navigation";
import Edit from "../../feature/form/Edit";

export default function EditRoute() {
  return (
    <div className="flex bg-[#F6F5F5] h-full">
      <div className="sm:flex hidden"></div>
      <Navigation />
      <div className="w-full">
        <Edit />
      </div>
    </div>
  );
}
