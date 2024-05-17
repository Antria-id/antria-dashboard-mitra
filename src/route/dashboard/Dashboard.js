import React from "react";
import Dashboard from "../../pages/dashboard/Dashboard";
import Navigation from "../../component/navigation/Navigation";

export default function DashboardRoute() {
  return (
    <div className="flex bg-[#F6F5F5] h-full ">
      <Navigation/>
      <div className="w-screen">
        <Dashboard />
      </div>
    </div>
  );
}
