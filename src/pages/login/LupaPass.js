import React, { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../../assets/Logo.png";
import { IoPhonePortraitOutline } from "react-icons/io5";
import Button from "../../component/button/Button";
import { Link, useNavigate } from "react-router-dom";

const extractMitraIdFromToken = (token) => {
  if (!token) return null;
  const base64Payload = token.split(".")[1];
  const payload = JSON.parse(atob(base64Payload));
  return payload.mitraId || null;
};

export default function LupaPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mitraId, setMitraId] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    // Extract mitraId from token when component mounts
    const id = extractMitraIdFromToken(token);
    setMitraId(id);
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `http://antriaapi.verni.yt/auth/forgot/karyawan/${email}`,
        { email }
      );
      // Store email in localStorage
      localStorage.setItem("resetEmail", email);
      console.log(response.data);
      navigate("/kode-otp");
    } catch (error) {
      console.error("Error sending reset password email", error);
      setError("Failed to send reset password email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl">
        <img className="mx-auto mb-6" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="w-20 h-20 bg-gray-200 flex justify-center items-center rounded-lg">
              <IoPhonePortraitOutline size={44} />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-xl font-bold">
                Masukkan alamat email anda
              </h1>
              <h1 className="text-lg">
                Kami akan mengirimkan <span className="font-bold">4 digit</span> kode verifikasi
              </h1>
            </div>
          </div>
          <div>
            <input
              className="w-full h-14 py-3 px-3 rounded-xl border-2 bg-white"
              placeholder="Masukan email anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading} className="w-full h-10">
            <Button
              text="KONFIRMASI OTP"
              size="w-full h-full"
              bgColor="bg-gradient-to-r from-purple-500 to-red-500"
              txtColor="text-white"
              txtSize="w-full h-full"
              position="flex justify-center items-center"
            />
          </button>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex gap-3 my-4">
            <div className="w-full h-px bg-gray-300"></div>
          </div>
          <Link to="/login">
            <h1 className="text-center hover:text-blue-400 hover:underline">
              Kembali ke halaman Login
            </h1>
          </Link>
        </form>
      </div>
    </div>
  );
}
