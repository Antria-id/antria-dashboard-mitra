import React, { useState, useEffect } from "react";
import axios from "axios";
import ArrowBackIosSharpIcon from "@mui/icons-material/ArrowBackIosSharp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Loading from "../../assets/Loading.gif";
import { TiUserDelete } from "react-icons/ti";
import { FaRegAddressCard } from "react-icons/fa";
import "../../index.css";
import Button from "../button/Button";
import AddUser from "../../feature/form/AddUser";
import UserProfile from "../../assets/Profile.png";
import Search from "../search/Search";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode library

export default function Tabel() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordPerPage, setRecordPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token); // Decode the token
  const mitraId = decodedToken.mitraId; // Extract mitraId from the decoded token

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
        `http://antriaapi.verni.yt/karyawan/mitra/${mitraId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
  }, []);

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

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://antriaapi.verni.yt/karyawan/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const updatedData = data.filter((item) => item.id !== id);
        const updatedFilteredData = filteredData.filter(
          (item) => item.id !== id
        );
        setData(updatedData);
        setFilteredData(updatedFilteredData);
      } else {
        alert("Failed to delete the user");
      }
    } catch (err) {
      alert("Failed to delete the user");
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="overflow-auto">
      <div className="sm:flex flex justify-between sm:justify-between sm:mb-3 mb-[1rem] sm:gap-0 gap-5">
        <Search
          data={data}
          placeholder="Search Account"
          onChange={handleFilter}
        />
        <Button
          text={
            <>
              <span className="hidden sm:block">Tambah Karyawan</span>
            </>
          }
          txtColor="text-white font"
          txtSize="sm:w-[12rem] w-[6rem] sm:h-[3rem] h-[2.5rem]"
          icon={<FaRegAddressCard color="white" size={25} />}
          bgColor="bg-gradient-to-r from-[#9b59b6] to-[#e74c3c]"
          position="flex flex-row-reverse justify-center items-center gap-x-2"
          size="sm:w-[12rem] w-[6rem] sm:h-[3rem] h-[2.5rem]"
          onClick={() => setIsPopUpOpen(true)}
        />
        <AddUser isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)} />
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center">
          <div className="w-[31.438rem] h-[28.875rem]">
            <img src={Loading} alt="Loading..." />
          </div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 mt-4">{error}</div>
      ) : (
        <div
          className="table-container"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-gradient-to-r from-[#9b59b6] to-[#e74c3c] text-white">
                <th className="px-4 py-2">Profile</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">No Handphone</th>
                <th className="px-4 py-2">Alamat</th>
                <th className="px-4 py-2">Tanggal Terdaftar</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">
                    <img
                      src={
                        item.profile_picture
                          ? `http://antriaapi.verni.yt/image/${item.profile_picture}`
                          : UserProfile
                      }
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="px-4 py-2">{item.username}</td>
                  <td className="px-4 py-2">{item.email}</td>
                  <td className="px-4 py-2">{item.handphone}</td>
                  <td className="px-4 py-2">{item.alamat}</td>
                  <td className="px-4 py-2">{item.created_at}</td>
                  <td className="px-4 py-2">
                    {!item.isOwner && ( // Check if the user is not the owner
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleDelete(item.id)}
                      >
                        <div className="flex flex-row gap-2 items-center">
                          <TiUserDelete size={25} />
                          <span>Non Aktif</span>
                        </div>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
          <p className="ml-4">Menampilkan Data Karyawan</p>
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
