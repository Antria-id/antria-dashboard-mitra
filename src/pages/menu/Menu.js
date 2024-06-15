import React, { useState, useRef, useEffect } from "react";
import { FaPlus, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Add from "../../component/form/Add";
import Crud from "../../component/form/Crud";

export default function Menu() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
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
    handleScroll(); // Initial check
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
    <aside
      className={`bg-white mt-[1.5rem] rounded-xl shadow-2xl z-0 transition-all mx-auto duration-300 sm:w-[77rem] w-[24.4rem] sm:h-[51.563rem] h-[43.2rem]`}
    >
      <h1 className="text-[2rem] pl-[1.875rem] pt-[2.125rem] font-semibold">
        Data Menu
      </h1>
      <div className="fixed sm:bottom-[3.5rem] sm:left-[88rem] bottom-[6.5rem] left-[17rem] z-30">
        <button
          onClick={() => setIsPopUpOpen(true)}
          className="sm:w-[5.25rem] w-[3.5rem] h-[3.5rem] sm:h-[5.25rem] sm:mt-[4.5rem] mt-[1.5rem] ml-[1.875rem] rounded-full bg-gradient-to-b from-[#9b59b6] to-[#e74c3c] shadow-xl"
        >
          <div className="sm:w-[5.25rem] w-[3.5rem] h-[3.5rem] sm:h-[5.25rem] flex flex-row justify-center items-center gap-6">
            <FaPlus size={30} color="white" />
          </div>
        </button>
      </div>
      <div className="z-0">
        <Add isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)} />
      </div>
      <div className="sm:flex flex sm:justify-between justify-between items-center lg:mx-[1rem] mx-[0.3rem]">
        {canScrollLeft && (
          <button
            className="sm:z-0 z-0 sm:relative relative sm:left-2 left-3 sm:flex flex sm:justify-center justify-center items-center sm:w-[3.25rem] w-[4rem] h-[4rem] sm:h-[2.5rem] bg-gradient-to-b from-[#9b59b6] to-[#e74c3c] rounded-full"
            onClick={handleScrollLeft}
          >
            <FaChevronLeft color="white" size={24} />
          </button>
        )}
        <div
          className="sm:flex flex justify-between sm:w-[75rem] w-[28.4rem] overflow-x-scroll ml-2 pt-[2.125rem] pb-[1.125rem]"
          ref={scrollableDivRef}
        >
          <Crud />
        </div>
        {canScrollRight && (
          <button
            className=" sm:z-0 z-0 sm:relative relative sm:right-4 right-4 sm:flex flex sm:justify-center justify-center items-center sm:w-[3.25rem] w-[4rem] h-[4rem] sm:h-[2.5rem] bg-gradient-to-b from-[#9b59b6] to-[#e74c3c] rounded-full"
            onClick={handleScrollRight}
          >
            <FaChevronRight color="white" size={24} />
          </button>
        )}
      </div>
    </aside>
  );
}
