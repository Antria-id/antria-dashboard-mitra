import React from "react";
import Logo from "../../assets/Logo.png";
import { IoPhonePortraitOutline } from "react-icons/io5";
import Button from "../../component/button/Button";
import { Link } from "react-router-dom";

export default function LupaPassword() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="md:w-[30.313rem] w-[22rem] h-[35.75rem] bg-white rounded-xl shadow-xl">
        <img className="ml-[1.563rem] mt-[2.2rem]" src={Logo} alt="Logo" />
        <div className="flex flex-col gap-6 md:w-[30.313rem] w-[22rem] h-[25rem] justify-center items-center">
          <div className="md:flex md:flex-row flex flex-col gap-4 w-[27rem] h-[5rem]">
            <div className="w-[4.5rem] h-[4.5rem] bg-[#E8E8E8] flex justify-center items-center rounded-lg ">
              <IoPhonePortraitOutline size={44} />
            </div>
            <div className="flex flex-col gap-1 h-[5rem] justify-center">
              <h1 className="text-[1.2rem] font-bold">
                Masukkan alamat email anda
              </h1>
              <h1 className="text-[1rem] font-normal">
                Kami akan mengirimkan <span className="font-bold">4 digit</span>{" "}
                kode verifikasi
              </h1>
            </div>
          </div>
          <div className="w-[27.125rem] h-[5rem]">
            <input
              className="md:w-[27.125rem] w-[19rem] h-[3.438rem] py-3 px-3 rounded-xl border-2 bg-white"
              placeholder="Masukan email anda"
            />
          </div>
          <Link to="/kode-otp">
            <Button
              text="KONFIRMASI OTP"
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
          <Link to="/login">
            <h1 className="hover:text-blue-400 hover:underline">
              Kembali ke halaman Login
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
}
