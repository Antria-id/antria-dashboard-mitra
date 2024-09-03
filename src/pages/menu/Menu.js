import React, { useState, useRef, useEffect } from "react";
import { FaPlus, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Add from "../../feature/form/Add";
import Crud from "../../feature/form/Crud";

export default function Menu() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hasData, setHasData] = useState(false);
  const scrollableDivRef = useRef(null);

  const handleScroll = () => {
    const scrollLeft = scrollableDivRef.current.scrollLeft;
    const maxScrollLeft =
      scrollableDivRef.current.scrollWidth -
      scrollableDivRef.current.clientWidth;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < maxScrollLeft);
  };

  const handleScrollLeft = () => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollLeft -= 100;
      handleScroll();
    }
  };

  const handleScrollRight = () => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollLeft += 100;
      handleScroll();
    }
  };

  useEffect(() => {
    handleScroll();
    const scrollableDiv = scrollableDivRef.current;
    if (scrollableDiv) {
      scrollableDiv.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollableDiv) {
        scrollableDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <aside className="bg-[#FCFCFF] mt-6 rounded-xl shadow-2xl z-0 transition-all mx-auto duration-300 w-full sm:w-[77rem] h-auto sm:h-[51.563rem]">
      <h1 className="text-2xl pl-6 pt-8 font-semibold">
        Data Menu
      </h1>
      <div className="fixed bottom-[5rem] sm:bottom-14 right-[1rem] z-0 sm:z-0">
        <button
          onClick={() => setIsPopUpOpen(true)}
          className="w-14 h-14 sm:w-20 sm:h-20 mt-6 sm:mt-14 rounded-full bg-gradient-to-b from-[#9b59b6] to-[#e74c3c] shadow-xl flex justify-center items-center"
        >
          <FaPlus size={30} color="white" />
        </button>
      </div>
      <div className="z-20 sm:z-20">
        <Add isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)} />
      </div>
      <div className="flex justify-between items-center mx-4 sm:mx-2">
        {hasData && canScrollLeft && (
          <button
            className="flex justify-center items-center w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-b from-[#9b59b6] to-[#e74c3c] rounded-full"
            onClick={handleScrollLeft}
          >
            <FaChevronLeft color="white" size={24} />
          </button>
        )}
        <div
          className="flex justify-between w-full overflow-x-scroll pt-8 pb-4"
          ref={scrollableDivRef}
        >
          <Crud setHasData={setHasData} />
        </div>
        {hasData && canScrollRight && (
          <button
            className="flex justify-center items-center w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-b from-[#9b59b6] to-[#e74c3c] rounded-full"
            onClick={handleScrollRight}
          >
            <FaChevronRight color="white" size={24} />
          </button>
        )}
      </div>
    </aside>
  );
}
