import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import ArrowBackIosSharpIcon from "@mui/icons-material/ArrowBackIosSharp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Loading from "../../assets/Loading.gif";
import "../../index.css";
import Button from "../button/Button";
import { SiMicrosoftexcel } from "react-icons/si";
import Search from "../search/Search";
import {jwtDecode} from "jwt-decode";

export default function Tabel() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordPerPage, setRecordPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("authToken");
  const mitraId = token ? jwtDecode(token).mitraId : null;

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
      if (mitraId) {
        const response = await axios.get(
          `https://development.verni.yt/pesanan/mitra/${mitraId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          const receivedData = response.data.filter(
            (item) => item.status === "SUCCESS"
          );
          const transformedData = receivedData.map((item) => {
            const menuOrder = item.oderlist
              .map((order) => order.produk.nama_produk)
              .join(", ");
            return {
              ...item,
              menuOrder,
              harga: item.oderlist.reduce(
                (acc, order) => acc + order.produk.harga * order.quantity,
                0
              ),
            };
          });
          setData(transformedData);
          setFilteredData(transformedData);
        }
      } else {
        setError("Mitra ID not found in token");
      }
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [mitraId]);

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = data.filter((item) => {
      if (item && item.invoice) {
        return item.invoice.toLowerCase().includes(searchTerm);
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

  const convertToXLS = () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
      XLSX.writeFile(workbook, "data.xlsx");
    } catch (error) {
      console.error("Error converting to XLS:", error);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const totalAmount = filteredData.reduce((acc, item) => acc + item.harga, 0);

  return (
    <div className="overflow-auto">
      <div className="sm:flex flex sm:justify-between sm:gap-0 gap-4 mb-3">
        <Search
          data={data}
          placeholder="Search Products"
          onChange={handleFilter}
        />
        <Button
          text="Download Data"
          txtColor="text-white font"
          txtSize="sm:w-[12rem] w-[12rem] sm:h-[3rem] h-[2.5rem]"
          icon={<SiMicrosoftexcel color="white" size={25} />}
          bgColor="bg-gradient-to-r from-[#9b59b6] to-[#e74c3c]"
          position="flex flex-row-reverse justify-center items-center gap-3"
          size="sm:w-[12rem] w-[12rem] sm:h-[3rem] h-[2.5rem]"
          onClick={convertToXLS}
        />
      </div>
      {loading ? (
        <div className="flex flex-col justify-center items-center">
          <div className="w-[31.438rem] h-[28.875rem]">
            <img src={Loading} alt="Page not found" />
          </div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 mt-4">{error}</div>
      ) : (
        <>
          <div className="table-container" style={{ maxHeight: "500px", overflowY: "auto" }}>
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gradient-to-r from-[#9b59b6] to-[#e74c3c] text-white">
                  <th className="px-4 py-2">ID Pesanan</th>
                  <th className="px-4 py-2">Waktu Order</th>
                  <th className="px-4 py-2">Menu Order</th>
                  <th className="px-4 py-2">Pembayaran</th>
                  <th className="px-4 py-2">Biaya</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2 font-bold">{item.invoice}</td>
                    <td className="px-4 py-2">{item.created_at}</td>
                    <td className="px-4 py-2">{item.menuOrder}</td>
                    <td className="px-4 py-2">{item.payment}</td>
                    <td className="px-4 py-2">Rp{item.harga}</td>
                    <td
                      className={`px-4 py-2 ${
                        item.status === "SUCCESS"
                          ? "text-green-500 font-bold"
                          : item.status === "PENDING"
                          ? "text-yellow-500"
                          : ""
                      }`}
                    >
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <strong>Total Pendapatan: Rp{totalAmount}</strong>
          </div>
        </>
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
          <p className="ml-4">Menampilkan Data Pemasukan</p>
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
            .filter((number) => number >= currentPage && number < currentPage + 5)
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
