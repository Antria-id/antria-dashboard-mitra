import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Add from "../../component/form/Add";
import Crud from "../../component/form/Crud";

export default function Menu() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [expanded, setExpanded] = useState(true);
  return (
    <aside
      className={`bg-white mt-[1.5rem] rounded-xl shadow-2xl z-0 transition-all mx-auto duration-300 sm:w-[77rem] w-[24.4rem] sm:h-[51.563rem] h-[43.2rem]`}
    >
      <h1 className="text-[2rem] pl-[1.875rem] pt-[2.125rem] font-semibold">
        Data Menu
      </h1>
      <div className="sm:fixed sm:bottom-[3.5rem] sm:left-[88rem] fixed bottom-[6.5rem] left-[17rem]">
        <div className="sm:w-[5.25rem] w-[3.5rem] h-[3.5rem] sm:h-[5.25rem] sm:mt-[4.5rem] mt-[1.5rem] ml-[1.875rem] rounded-full bg-gradient-to-b from-[#9b59b6] to-[#e74c3c] shadow-xl">
          <div className="sm:w-[5.25rem] w-[3.5rem] h-[3.5rem] sm:h-[5.25rem] flex flex-row justify-center items-center gap-6">
            <button onClick={() => setIsPopUpOpen(true)}>
              <FaPlus size={30} color="white" />
            </button>
            {/* <h1 className="text-white font-bold">Tambah Menu</h1> */}
          </div>
        </div>
      </div>
      <Add isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)} />
      <div className="sm:w-[77rem] w-[24.4rem] overflow-x-auto pl-[1.875rem] pt-[2.125rem]">
        <Crud />
      </div>
    </aside>
  );
}
