import React from "react";
import Pemasukan from "../../pages/pemasukan/Pemasukan";
import Sidebar from "../../component/navigation/Sidebar";

export default function pemasukanRoute() {
  return (
    <div className="flex bg-[#F6F5F5] h-full">
      <Sidebar/>
      <div className="w-full">
        <Pemasukan />
      </div>
    </div>
  );
}
