import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Logo from "../../assets/Logo.png";
import Forgot from "../../assets/Forgot password.png";
import Button from "../../component/button/Button";

export default function ResetPassword() {
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toggleNewPasswordVisibility = () => {
    setShowNewPass((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPass((prevState) => !prevState);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    // Add your reset password logic here
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="md:w-[30.313rem] w-[22rem] h-[35.75rem] bg-white rounded-xl shadow-xl">
        <img className="ml-[1.563rem] mt-[2.2rem]" src={Logo} alt="Logo" />
        <div className="md:w-[30.313rem] w-[22rem] flex flex-col justify-center items-center">
          <img className="w-[13rem]" src={Forgot} alt="Forgot password" />
          <form onSubmit={handleResetPassword} className="flex flex-col gap-7">
            <div className="relative">
              <h1 className="text-[0.75rem] font-bold">Password Baru</h1>
              <input
                className="md:w-[27.125rem] w-[19rem] h-[3.438rem] bg-white shadow-xl py-3 px-3 rounded-xl"
                type={showNewPass ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Masukkan password baru anda"
              />
              <button
                type="button"
                className="absolute right-[1rem] top-[62%] transform -translate-y-1/2"
                onClick={toggleNewPasswordVisibility}
              >
                {showNewPass ? (
                  <AiFillEye color="c4c4c4" size={24} />
                ) : (
                  <AiFillEyeInvisible color="c4c4c4" size={24} />
                )}
              </button>
            </div>
            <div className="relative">
              <h1 className="text-[0.75rem] font-bold">Konfirmasi Password</h1>
              <input
                className="md:w-[27.125rem] w-[19rem] h-[3.438rem] bg-white shadow-xl py-3 px-3 rounded-xl"
                type={showConfirmPass ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Masukkan kembali password baru anda"
              />
              <button
                type="button"
                className="absolute right-[1rem] top-[62%] transform -translate-y-1/2"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPass ? (
                  <AiFillEye color="c4c4c4" size={24} />
                ) : (
                  <AiFillEyeInvisible color="c4c4c4" size={24} />
                )}
              </button>
            </div>
            <Button
              text="RESET PASSWORD"
              size="sm:w-[27.125rem] w-[19rem] h-[2.938rem]"
              bgColor="bg-gradient-to-r from-[#9b59b6] to-[#e74c3c]"
              txtColor="text-white"
              txtSize="sm:w-[27.125rem] w-[19rem] h-[2.938rem]"
              position="sm:flex sm:justify-center sm:items-center flex justify-center items-center"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
