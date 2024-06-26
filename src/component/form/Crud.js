import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegTrashAlt } from "react-icons/fa";
import ErrorImage from "../../assets/Error.gif"; 
import DeleteConfirmation from "./Delete";
import Loading from "../../assets/Loading.gif";
import Edit from "./Edit"; 
import NoData from "../../assets/NoData.gif";

export default function Crud() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://development.verni.yt/produk/mitra/2"
      );
      if (response.status === 200) {
        setData(response.data);
        setFilteredData(response.data); // Initialize filteredData with fetched data
      }
    } catch (error) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.put(`https://development.verni.yt/produk/${id}`, {
        show_produk: false,
      });
      fetchData();
    } catch (error) {
      setError("Error deleting data");
    }
  };

  const handleOpenDeleteConfirm = (id) => {
    setSelectedItemId(id);
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    handleDelete(selectedItemId);
    setIsDeleteConfirmOpen(false);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setSelectedItem(null);
  };

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = data.filter((item) =>
      item.nama_produk.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  const rupiah = (harga) => {
    return new Intl.NumberFormat("id", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(harga);
  };

  return (
    <div className="container">
      <div className="w-full mb-2">
        <input
          className="px-4 py-2 border border-gray-500 rounded-lg text-black focus:outline-none placeholder-gray-400"
          type="text"
          placeholder="Search Products"
          onChange={handleFilter}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-6 sm:w-[72.75rem] sm:h-[35.25rem] w-full h-full p-4 overflow-x-auto overscroll-y-none">
        {loading ? (
          <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="w-[31.438rem] h-[28.875rem]">
              <img
                src={Loading}
                alt="Page not found"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col justify-center items-center w-full h-full">
            <img className="w-[31.438rem] h-[28.875rem]" src={ErrorImage} alt="Error" />
            <p className="text-2xl font-bold text-red-500">{error}</p>
          </div>
        ) : filteredData.length > 0 ? (
          filteredData.map((item, id) => (
            <div
              key={id}
              className="flex flex-col sm:w-[18.75rem] w-full sm:h-[33.25rem] h-auto shadow-xl rounded-lg mb-4"
            >
              <div className="w-full h-48 sm:w-[18.875rem] sm:h-[31.563rem] rounded-t-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={`https://development.verni.yt/image/${item.gambar}`}
                  alt="Product"
                />
              </div>
              <div className="flex flex-col p-4">
                <h1 className="text-lg font-semibold">{item.nama_produk}</h1>
                <h2 className="text-md">{item.deskripsi_produk}</h2>
                <h2 className="text-md pt-[1.8rem]">{rupiah(item.harga)}</h2>
                <h2 className="text-md">Jumlah {item.kuantitas}</h2>
              </div>
              <div className="flex flex-row-reverse justify-between p-4">
                <button
                  onClick={() => handleOpenDeleteConfirm(item.id)}
                  className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#9b59b6] to-[#e74c3c] rounded-lg"
                >
                  <FaRegTrashAlt color="white" size={20} />
                </button>
                <button
                  className="flex items-center justify-center w-[15.5rem] sm:w-[13rem] h-12 hover:bg-gradient-to-r hover:from-[#FFFF] hover:to-[#FFFF] bg-gradient-to-r from-[#9b59b6] to-[#e74c3c] rounded-lg"
                  onClick={() => handleEdit(item)}
                >
                  <h1 className="w-[15.5rem] sm:w-[13rem] text-white hover:text-[#9b59b6] font-semibold">Edit</h1>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="w-[31.438rem] h-[28.875rem]">
              <img
                src={NoData}
                alt="Page not found"
                className="w-full h-full object-cover bg-transparent"
              />
            </div>
            <h1 className="w-[24rem] text-center text-2xl font-bold text-gray-500">
              Belum ada data menu yang tersimpan
            </h1>
          </div>
        )}
        <DeleteConfirmation
          isOpen={isDeleteConfirmOpen}
          onClose={() => setIsDeleteConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
        />
        <Edit
          className="z-10"
          isOpen={isEditOpen}
          onClose={handleCloseEdit}
          item={selectedItem}
        />
      </div>
    </div>
  );
}
