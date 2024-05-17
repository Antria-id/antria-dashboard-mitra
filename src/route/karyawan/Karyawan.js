import React from "react";
import Navigation from "../../component/navigation/Navigation";
import Karyawan from "../../pages/karyawan/Karyawan";

export default function KaryawanRoute() {
  return (
    <div className="flex bg-[#F6F5F5] h-full">
      <Navigation/>
      <div className="w-full">
        <Karyawan />
      </div>
    </div>
  );
}
