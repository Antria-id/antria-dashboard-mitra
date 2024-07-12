import React from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import Button from "../button/Button";

export default function BottomNav({ visible, menuItems, onShowPopup }) {
  return (
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
        <button className="group" onClick={onShowPopup}>
          <FaSignOutAlt
            size={22}
            color="white"
            className="group-hover:text-[#9b59b6] transition-all duration-300 ease-in-out"
          />
        </button>
      </nav>
    </div>
  );
}
