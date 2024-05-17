import React from "react";
import Navigation from "../../component/navigation/Navigation";
import Menu from "../../pages/menu/Menu";

export default function MenuRoute() {
  return (
    <div className="flex bg-[#F6F5F5] h-full">
      <div className="sm:flex hidden"></div>
      <Navigation />
      <div className="w-full">
        <Menu />
      </div>
    </div>
  );
}
