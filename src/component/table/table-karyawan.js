import React, { useState, useEffect } from "react";
import axios from "axios";
import ArrowBackIosSharpIcon from "@mui/icons-material/ArrowBackIosSharp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { ThreeDots } from "react-loader-spinner";
import Profile from "../../assets/Profile.png";
import { FaRegAddressCard } from "react-icons/fa6";
import "../../index.css";
import Button from "../button/Button";

export default function Tabel() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordPerPage, setRecordPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = Array.isArray(filteredData)
    ? filteredData.slice(firstIndex, lastIndex)
    : [];
  const totalRecords = Array.isArray(filteredData) ? filteredData.length : 0;
  const totalPages = Math.ceil(totalRecords / recordPerPage);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://development.verni.yt/karyawan/mitra/2"
      );
      if (response.status === 200) {
        const receivedData = response.data; // Assuming response.data contains the list of users
        setData(receivedData);
        setFilteredData(receivedData);
      }
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty array ensures fetchData is only called once on component mount

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = data.filter((item) => {
      if (item && item.username) {
        return item.username.toLowerCase().includes(searchTerm);
      }
      return false;
    });
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setRecordPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="overflow-auto">
      <div className="flex justify-between mb-3">
        <div>
          <input
            className="px-4 py-2 border border-gray-500 rounded-lg text-black focus:outline-none placeholder-gray-400"
            type="text"
            placeholder="Masukkan Username"
            onChange={handleFilter}
          />
        </div>

        <Button 
          text="Tambah Karyawan"
          txtColor="text-white font"
          txtSize="w-[12rem] h-[3rem]"
          icon={<FaRegAddressCard color="white" size={25}/>}
          bgColor="bg-gradient-to-r from-[#9b59b6] to-[#e74c3c]"
          position="flex flex-row-reverse justify-center items-center gap-3"
          size="w-[12rem] h-[3rem]"
        />
      </div>

      {loading ? (
        <div className="text-center mt-4">
          <ThreeDots type="ThreeDots" color="#555555" height={50} width={50} />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 mt-4">{error}</div>
      ) : (
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gradient-to-r from-[#9b59b6] to-[#e74c3c] text-white">
              <th className="px-4 py-2">Profile</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">No Handphone</th>
              <th className="px-4 py-2">Alamat</th>
              <th className="px-4 py-2">Posisi</th>
              <th className="px-4 py-2">Tanggal Terdaftar</th>
            </tr>
          </thead>
          <tbody>
            {records.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">
                  <img
                    src={Profile}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="px-4 py-2">{item.username}</td>
                <td className="px-4 py-2">{item.email}</td>
                <td className="px-4 py-2">{item.handphone}</td>
                <td className="px-4 py-2">{item.alamat}</td>
                <td className="px-4 py-2">{item.isOwner}</td>
                <td className="px-4 py-2">{item.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <nav className="flex justify-between items-center mt-5 mb-3">
        <div className="flex items-center">
          <select
            className="bg-gradient-to-r from-[#9b59b6] to-[#e74c3c] text-white p-2 rounded-lg cursor-pointer"
            value={recordPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <p className="ml-4">Menampilkan Data Akun Mitra</p>
        </div>
        <div className="flex">
          <button
            className="px-2"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ArrowBackIosSharpIcon />
          </button>
          {pageNumbers
            .filter(
              (number) => number >= currentPage && number < currentPage + 5
            )
            .map((number) => (
              <button
                className={`px-3 ${
                  currentPage === number
                    ? "hover:bg-gradient-to-r hover:from-[#9b59b6] hover:to-[#e74c3c] hover:text-white hover:font-semibold hover:rounded-xl"
                    : ""
                }`}
                key={number}
                onClick={() => handlePageChange(number)}
              >
                {number}
              </button>
            ))}
          <button
            className="px-2"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ArrowForwardIosSharpIcon />
          </button>
        </div>
      </nav>
    </div>
  );
}
