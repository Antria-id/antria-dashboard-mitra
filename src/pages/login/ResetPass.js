import React, { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../../assets/Logo.png";
import Forgot from "../../assets/Forgot password.png";
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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl">
        <img className="flex justify-start items-start mx-auto mb-6" src={Logo} alt="Logo" />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          <div className="flex justify-center items-center">
            <img className="w-52" src={Forgot} alt="Forgot password" />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <input
              type="password"
              className="w-full h-14 p-3 rounded-xl border-2 bg-white"
              placeholder="Masukan password baru"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="w-full h-14 p-3 rounded-xl border-2 bg-white"
              placeholder="Konfirmasi password baru"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 mt-4"
          >
            <Button
              text="UBAH PASSWORD"
              size="w-full h-full"
              bgColor="bg-gradient-to-r from-purple-500 to-red-500"
              txtColor="text-white"
              txtSize="w-full h-full"
              position="flex justify-center items-center"
            />
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
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
