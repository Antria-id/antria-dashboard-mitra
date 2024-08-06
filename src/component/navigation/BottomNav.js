import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Button from "../button/Button";
import SignOut from "../../assets/Logout.gif";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function ProfileDropdown({ onLogout }) {
  return (
    <div className="absolute bottom-full mb-3 mr-4 w-48 bg-gradient-to-r from-[#9b59b6] to-[#e74c3c] rounded-md shadow-lg z-50">
      <Link to="/profile-restoran" className="block px-4 py-2 text-white hover:bg-[#c47ddf]">Profile</Link>
      <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-white hover:bg-[#c47ddf]">Logout</button>
    </div>
  );
}

export default function BottomNav({ visible, menuItems, onLogout }) {
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [userProfile, setUserProfile] = useState({
    gambar_toko: '', // Default image until fetched
    nama_toko: 'Loading...', // Default text until fetched
  });

  const token = localStorage.getItem("authToken");
  const mitraId = token ? jwtDecode(token).mitraId : null;

  useEffect(() => {
    const fetchProfileData = async () => {
      if (mitraId) {
        try {
          const response = await axios.get(
            `http://antriaapi.verni.yt/mitra/${mitraId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            const data = response.data;
            setUserProfile({
              gambar_toko: `http://antriaapi.verni.yt/image/${data.gambar_toko}`,
              nama_toko: data.nama_toko,
            });
          } else {
            console.error("Failed to fetch profile data");
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
    };

    fetchProfileData();
  }, [mitraId, token]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/Login";
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownVisible(!profileDropdownVisible);
  };

  return (
    <div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="w-[31.438rem] h-[28.875rem]">
              <img
                src={SignOut}
                alt="Walking"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-lg font-bold mb-4">
              Apakah kamu yakin ingin keluar?
            </h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-[#9b59b6] to-[#e74c3c] text-white font-bold py-2 px-4 rounded"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className={`block lg:hidden fixed left-1/2 transform -translate-x-1/2 bottom-2 rounded-xl w-[22.75rem] h-[3.875rem] bg-gradient-to-r from-[#9b59b6] to-[#e74c3c] shadow-lg z-50 ${
          visible ? "" : "invisible"
        }`}
      >
        <nav className="flex justify-evenly items-center h-full">
          {menuItems.map((menuItem, index) => (
            <Link key={index} to={menuItem.to} className="relative group">
              <Button
                icon={menuItem.icon}
                size="w-full"
                position="flex flex-col justify-center items-center"
                bgColor="group-hover:bg-white text-white group-hover:text-[#9b59b6] transition-all duration-300 ease-in-out"
              />
            </Link>
          ))}
          <div className="relative group">
            <button className="group" onClick={toggleProfileDropdown}>
              <FaUserCircle
                size={22}
                color="white"
                className="group-hover:text-[#9b59b6] transition-all duration-300 ease-in-out"
              />
            </button>
            {profileDropdownVisible && <ProfileDropdown onLogout={() => setShowPopup(true)} />}
          </div>
        </nav>
      </div>
    </div>
  );
}
