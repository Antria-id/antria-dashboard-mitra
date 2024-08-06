import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../../component/button/Button";
import Logo from "../../assets/Logo.png";
import { IoMail } from "react-icons/io5";
import { Link } from "react-router-dom";

const extractMitraIdFromToken = (token) => {
  if (!token) return null;
  const base64Payload = token.split(".")[1];
  const payload = JSON.parse(atob(base64Payload));
  return payload.mitraId || null;
};

export default function KodeOTP() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const [mitraId, setMitraId] = useState(null);
  const email = localStorage.getItem("resetEmail");

  useEffect(() => {
    const id = extractMitraIdFromToken(token);
    setMitraId(id);
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `http://antriaapi.verni.yt/auth/verify-otp/karyawan/${email}/${otp}`
      );
      console.log(response.data);
      localStorage.setItem("authToken", response.data.access_token);
      localStorage.setItem("userId", response.data.userId);
      navigate("/reset-password");
    } catch (error) {
      console.error("Error verifying OTP", error);
      setError("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setOtp((prev) => (prev + value).slice(0, 4));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl">
        <img className="mx-auto mb-6" src={Logo} alt="Logo" />
        <div className="flex flex-col justify-center items-center gap-6">
          <IoMail size={64} />
          <h1 className="text-center text-lg">
            Kode OTP telah di kirim pada email anda{" "}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex gap-2">
              {Array(4)
                .fill("")
                .map((_, index) => (
                  <input
                    key={index}
                    className="w-12 h-12 text-center text-xl border-2 rounded-md"
                    maxLength={1}
                    value={otp[index] || ""}
                    onChange={handleChange}
                  />
                ))}
            </div>
            <div className="flex flex-col items-center gap-1">
              <h1>
                Tidak mendapatkan kode?{" "}
                <span className="text-blue-500 cursor-pointer">Kirim kembali</span>
              </h1>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-10"
            >
              <Button
                text="Konfirmasi Ubah Password"
                size="w-full h-full"
                bgColor="bg-gradient-to-r from-purple-500 to-red-500"
                txtColor="text-white"
                txtSize="w-full h-full"
                position="flex justify-center items-center"
              />
            </button>
          </form>
          <div className="flex gap-3 my-4">
            <div className="w-full h-px bg-gray-300"></div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Link to="/lupa-password">
            <h1 className="text-center hover:text-blue-400 hover:underline">Ubah Email</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}