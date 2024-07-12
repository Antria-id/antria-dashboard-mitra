import React from "react";
import Edit from "../../feature/form/Edit";
import Sidebar from "../../component/navigation/Sidebar";

export default function EditRoute() {
  return (
    <div className="flex bg-[#F6F5F5] h-full">
      <div className="sm:flex hidden"></div>
      <Sidebar />
      <div className="w-full">
        <Edit />
      </div>
    </div>
  );
}
