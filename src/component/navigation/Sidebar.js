import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { MdOutlineMenuBook } from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import { IoAnalytics } from "react-icons/io5";
import Logo from "../../assets/Logo.png";
import Button from "../button/Button";
import SignOut from "../../assets/Logout.gif";
import BottomNav from "./BottomNav";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Upload from "../../assets/Download.gif";
import Loading from "../../utils/Loading";

export default function Sidebar({ onToggle }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({
    gambar_toko: Upload, // Default image until fetched
    nama_toko: "Loading...", // Default text until fetched
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

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 70) ||
        currentScrollPos < 10
    );
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  const toggleSidebar = () => {
    setExpanded((prev) => !prev);
    if (onToggle) onToggle(!expanded);
  };

  const handleNavigation = (path) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 500); // Simulate a delay for loading
  };

  // Menu items for the sidebar
  const menuItems = [
    {
      to: "/data-analisis",
      text: "Data Analisis",
      icon: <IoAnalytics size={22} />,
    },
    { to: "/data-akun", text: "Data Akun", icon: <FaUser size={22} /> },
    {
      to: "/data-pemasukan",
      text: "Data Pemasukan",
      icon: <GrMoney size={22} />,
    },
    {
      to: "/data-menu",
      text: "Data Menu",
      icon: <MdOutlineMenuBook size={22} />,
    },
  ];

  return (
    <>
      {loading && <Loading />}

      {/* Popup for logout confirmation */}
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

      {/* Sidebar for desktop */}
      <div className="hidden lg:block h-screen">
        <aside
          className={`flex flex-col ${
            expanded
              ? "w-[17.9rem] h-[51.563rem] ml-[0.5rem]"
              : "w-[6rem] sm:h-[51.563rem] h-[39.2rem] ml-[2rem]"
          } mt-[1.5rem] rounded-xl shadow-2xl bg-white transition-all duration-300 ease-in-out`}
        >
          {/* Sidebar header with logo and toggle button */}
          <div
            className={`p-4 ${
              expanded
                ? "flex items-center justify-between"
                : "flex items-center justify-center"
            }`}
          >
            <div
              className={`flex items-center ${
                expanded ? "" : "justify-center"
              }`}
            >
              <img
                className={`transition-all duration-300 ease-in-out ${
                  expanded ? "" : "w-0"
                }`}
                src={Logo}
                alt="Logo"
              />
            </div>
            <button onClick={toggleSidebar}>
              {expanded ? (
                <div className="flex justify-center items-center w-[2rem] h-[2rem] bg-gradient-to-r from-[#9b59b6] to-[#e74c3c] rounded-full">
                  <FaChevronLeft color="white" size={15} />
                </div>
              ) : (
                <div className="flex justify-center items-center w-[2rem] h-[2rem] bg-gradient-to-r from-[#9b59b6] to-[#e74c3c] rounded-full">
                  <FaChevronRight color="white" size={15} />
                </div>
              )}
            </button>
          </div>

          {/* Sidebar footer with admin info and sign out button */}
          <div
            className={`flex items-center ${
              expanded ? "w-[16rem]" : "w-[4rem]"
            } h-[3.8rem] ml-[1.125rem] mt-[1rem] bg-gradient-to-r from-[#9b59b6] to-[#e74c3c] rounded-xl transition-all duration-300 ease-in-out`}
          >
            <div className="flex justify-between w-full p-4">
              {expanded && (
                <Link
                  to="/profile-restoran"
                  className="flex items-center space-x-3"
                >
                  <img
                    className="w-[3rem] h-[3rem] rounded-full"
                    src={userProfile.gambar_toko}
                    alt="Profile"
                  />

                  <h1 className="text-white font-bold">
                    {userProfile.nama_toko}
                  </h1>
                </Link>
              )}
              <button onClick={() => setShowPopup(true)}>
                <FaSignOutAlt size={25} color="white" />
              </button>
            </div>
          </div>

          {/* Sidebar menu items */}
          <div className="flex-1">
            <ul
              className={`flex flex-col justify-between mt-12 space-y-6 ${
                expanded ? "pl-4" : "pl-4"
              }`}
            >
              {menuItems.map((menuItem, index) => (
                <li key={index} className="relative group">
                  <button onClick={() => handleNavigation(menuItem.to)}>
                    <Button
                      text={expanded ? menuItem.text : ""}
                      icon={menuItem.icon}
                      size={`${
                        expanded
                          ? "w-[16rem] h-[2.688rem]"
                          : "w-[4rem] h-[2.688rem]"
                      }`}
                      txtColor={`hover:text-white flex items-center w-[16rem] h-[2.688rem] ${
                        location.pathname === menuItem.to ? "text-white" : ""
                      }`}
                      bgColor={`${
                        location.pathname === menuItem.to
                          ? "bg-gradient-to-r from-[#9b59b6] to-[#e74c3c]"
                          : "hover:bg-gradient-to-r from-[#9b59b6] to-[#e74c3c]"
                      }`}
                      position={`flex ${
                        expanded
                          ? "pl-2 gap-x-[1.2rem] font-extralight"
                          : "justify-center w-[4rem]"
                      }`}
                    />
                  </button>
                  {!expanded && (
                    <div className="absolute left-full ml-[-0.5rem] mt-[-2.6rem] hidden group-hover:block active:bg-gradient-to-r active:from-[#9b59b6] active:to-[#e74c3c] w-[10.5rem] rounded-lg bg-gradient-to-r from-[#9b59b6] text-white font-bold to-[#e74c3c] shadow-lg">
                      <p className="p-4">{menuItem.text}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        visible={visible}
        menuItems={menuItems}
        onShowPopup={() => setShowPopup(true)}
      />
    </>
  );
}
