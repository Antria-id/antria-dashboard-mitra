import React from "react";
import Dashboard from "../../pages/dashboard/Dashboard";
import Sidebar from "../../component/navigation/Sidebar";

export default function DashboardRoute() {
  return (
    <div className="flex bg-[#F6F5F5] h-full ">
      <Sidebar/>
      <div className="w-screen">
        <Dashboard />
      </div>
    </div>
  );
}
