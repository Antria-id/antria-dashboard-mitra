import React from "react";
import Navigation from "../../component/navigation/Navigation";
import Pemasukan from "../../pages/pemasukan/Pemasukan";

export default function pemasukanRoute() {
  return (
    <div className="flex bg-[#F6F5F5] h-full">
      <Navigation/>
      <div className="w-full">
        <Pemasukan />
      </div>
    </div>
  );
}
