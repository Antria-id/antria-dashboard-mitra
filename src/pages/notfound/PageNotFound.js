import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotFoundGif from "../../assets/NotFound.gif";

export default function PageNotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/Login");
    }, 5000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="bg-[#FCFCFE] w-full h-full">
      <div className="grid grid-rows-2 grid-flow-col justify-center items-center">
        <div className="w-[31.438rem] h-[28.875rem]">
          <img src={NotFoundGif} alt="Page not found" />
        </div>
        <div className="grid justify-center text-center items-center gap-4 relative bottom-[10rem]">
          <div className="ml-[54px]">
            <h1 className="mr-[60px] text-4xl font-extrabold text-gray-800">
              404
            </h1>
            <p className="relative right-7 font-semibold text-lg text-gray-600">
              Page not found
            </p>
          </div>
          <p className="w-[26.75rem] h-[4.875rem] text-center text-lg text-gray-600">
            Kami tidak dapat menemukan halaman yang anda ingin akses. Segera
            hubungi pihak pengembang web dashboard mitra antria
          </p>
        </div>
      </div>
    </div>
  );
}
