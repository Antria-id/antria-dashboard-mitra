import React from "react";
import Karyawan from "../../pages/karyawan/Karyawan";
import Sidebar from "../../component/navigation/Sidebar";

export default function KaryawanRoute() {
  return (
    <div className="flex bg-[#F6F5F5] h-full">
      <Sidebar/>
      <div className="w-full">
        <Karyawan />
      </div>
    </div>
  );
}
