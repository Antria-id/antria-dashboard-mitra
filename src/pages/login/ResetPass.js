import React, { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../../assets/Logo.png";
import Forgot from "../../assets/Forgot password.png"
import Button from "../../component/button/Button";
import { Link, useNavigate } from "react-router-dom";

const extractMitraIdFromToken = (token) => {
  if (!token) return null;
  const base64Payload = token.split(".")[1];
  const payload = JSON.parse(atob(base64Payload));
  return payload.mitraId || null;
};

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");
  const token = localStorage.getItem("authToken");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

  useEffect(() => {
    if (!userId) {
      const id = extractMitraIdFromToken(token);
      setUserId(id);
    }
  }, [token, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put(
        `http://antriaapi.verni.yt/karyawan/${userId}`,
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error resetting password", error);
      setError("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="md:w-[30.313rem] w-[22rem] h-[35.75rem] bg-white rounded-xl shadow-xl">
        <img className="ml-[1.563rem] mt-[2.2rem]" src={Logo} alt="Logo" />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 md:w-[30.313rem] w-[22rem] h-[25rem] mt-4 justify-center items-center"
        >
          <div className="md:w-[30.313rem] w-[22rem] flex flex-col justify-center items-center">
            <img className="w-[13rem]" src={Forgot} alt="Forgot password" />
          </div>
          <div className="w-[27.125rem] h-[5rem]">
            <input
              type="password"
              className="md:w-[27.125rem] w-[19rem] h-[3.438rem] py-3 px-3 rounded-xl border-2 bg-white"
              placeholder="Masukan password baru"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-[27.125rem] h-[5rem]">
            <input
              type="password"
              className="md:w-[27.125rem] w-[19rem] h-[3.438rem] py-3 px-3 rounded-xl border-2 bg-white"
              placeholder="Konfirmasi password baru"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="sm:w-[27.125rem] w-[19rem] h-[2.938rem]"
          >
            <Button
              text="UBAH PASSWORD"
              size="sm:w-[27.125rem] w-[19rem] h-[2.938rem]"
              bgColor="bg-gradient-to-r from-[#9b59b6] to-[#e74c3c]"
              txtColor="text-white"
              txtSize="sm:w-[27.125rem] w-[19rem] h-[2.938rem]"
              position="sm:flex sm:justify-center sm:items-center flex justify-center items-center"
            />
          </button>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex flex-row gap-3">
            <div className="w-[10rem] h-[0.2rem] bg-[#e8e8e8]" />
            <div className="w-[10rem] h-[0.2rem] bg-[#e8e8e8]" />
          </div>
          <Link to="/login">
            <h1 className="hover:text-blue-400 hover:underline relative bottom-4">
              Kembali ke halaman Login
            </h1>
          </Link>
        </form>
      </div>
    </div>
  );
}
