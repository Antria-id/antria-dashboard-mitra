import React from "react";
import Button from "../../component/button/Button";
import Logo from "../../assets/Logo.png";
import { TbMessageCode } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function KodeOTP() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="md:w-[30.313rem] w-[22rem] h-[35.75rem] bg-white rounded-xl shadow-xl">
        <img className="ml-[1.563rem] mt-[2.2rem]" src={Logo} alt="Logo" />
        <div className="flex flex-col justify-center h-[25rem] items-center gap-6">
          <TbMessageCode size={64} />
          <h1 className="text-[1rem]">
            Kode OTP telah di kirim pada email anda{" "}
          </h1>
          <div className="flex gap-2">
            <input
              className="w-[3rem] h-[3rem] text-center text-[1.5rem] border-2 rounded-md"
              maxLength={1}
            />
            <input
              className="w-[3rem] h-[3rem] text-center text-[1.5rem] border-2 rounded-md"
              maxLength={1}
            />
            <input
              className="w-[3rem] h-[3rem] text-center text-[1.5rem] border-2 rounded-md"
              maxLength={1}
            />
            <input
              className="w-[3rem] h-[3rem] text-center text-[1.5rem] border-2 rounded-md"
              maxLength={1}
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <h1>
              Tidak mendapatkan kode?{" "}
              <span className="text-blue-500">Kirim kembali</span>
            </h1>
          </div>
          <Link to="/reset-password">
            <Button
              text="Konfirmasi Ubah Password"
              size="sm:w-[27.125rem] w-[19rem] h-[2.938rem]"
              bgColor="bg-gradient-to-r from-[#9b59b6] to-[#e74c3c]"
              txtColor="text-white"
              txtSize="sm:w-[27.125rem] w-[19rem] h-[2.938rem]"
              position="sm:flex sm:justify-center sm:items-center flex justify-center items-center"
            />
          </Link>
          <div className="flex flex-row gap-3">
            <div className="w-[10rem] h-[0.2rem] bg-[#e8e8e8]" />
            <div className="w-[10rem] h-[0.2rem] bg-[#e8e8e8]" />
          </div>
          <Link to="/lupa-password">
            <h1 className="hover:text-blue-400 hover:underline">Kembali?</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}
