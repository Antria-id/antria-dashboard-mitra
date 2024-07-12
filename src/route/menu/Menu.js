import React from "react";
import Menu from "../../pages/menu/Menu";
import Sidebar from "../../component/navigation/Sidebar";

export default function MenuRoute() {
  return (
    <div className="flex bg-[#F6F5F5] h-full">
      <div className="sm:flex hidden"></div>
      <Sidebar />
      <div className="w-full">
        <Menu />
      </div>
    </div>
  );
}
