import React from "react";
import Sidebar from "../../component/navigation/Sidebar";
import Profile from "../../pages/profile/Profile";

export default function profileRoute() {
  return (
    <div className="flex bg-[#F6F5F5] h-full">
      <Sidebar/>
      <div className="w-full">
        <Profile />
      </div>
    </div>
  );
}
