import React, { useState, useEffect } from "react";
import axios from "axios";
import Edit from "./Edit";
import DeleteConfirmation from "./Delete";
import { FaRegTrashAlt } from "react-icons/fa";
import ErrorImage from '../../assets/Error.png'; // Import the error image

export default function Crud() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    console.log(jwtDecode(localStorage.getItem('authToken')).payload.mitraId)
    try {
      const response = await axios.get(
        "https://development.verni.yt/produk/mitra/2"
      );
      if (response.status === 200) {
        setData(response.data);
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
  function jwtDecode(token) {
    let decodedToken = {};
    decodedToken.raw = token;

    // Split the token into header and payload
    const [headerBase64, payloadBase64] = token.split(".");

    decodedToken.header = JSON.parse(window.atob(headerBase64));
    decodedToken.payload = JSON.parse(window.atob(payloadBase64));

    return decodedToken;
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://development.verni.yt/produk/${id}`);
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

  return (
    <div className="flex flex-row gap-x-6 sm:w-[70.75rem] sm:h-[31.25rem] w-[12rem] h-[20rem]">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div className="sm:flex sm:flex-col sm:justify-center sm:items-center sm:w-[70.75rem] w-[12rem]">
          <img className="w-[30rem] h-[50rem]" src={ErrorImage} alt="Error" />
          <p className="text-[2rem] font-bold text-red-500">{error}</p>
        </div>
      ) : data ? (
        data.map((item, index) => (
          <div key={index}>
            <div className="flex flex-col gap-x-3 sm:w-[18.75rem] sm:h-[31.25rem] w-[12rem] h-[23rem] shadow-xl rounded-lg">
              <>
                <div className="sm:w-[18.75rem] sm:h-[18rem] rounded-2xl">
                  <img
                    className="sm:w-[18.75rem] sm:h-[18rem] rounded-[1.4rem]"
                    src={`https://development.verni.yt/image/${item.gambar}`}
                    alt="Product"
                  />
                </div>
                <div className="sm:flex sm:flex-col flex flex-col sm:gap-y-[1rem] gap-y-3 sm:ml-0 ml-3">
                  <h1 className="sm:w-[14.956rem]  sm:h-[0.935] sm:flex sm:justify-start sm:pl-[0.9rem] text-[1.2rem] font-semibold">
                    {item.nama_produk}
                  </h1>
                  <h2 className="sm:w-[14.956rem] sm:h-[0.935] sm:flex sm:justify-start sm:pl-[0.9rem] text-[1rem] ">
                    {item.deskripsi_produk}
                  </h2>
                  <h2 className="sm:w-[14.956rem] sm:h-[0.935] sm:flex sm:justify-start sm:pl-[0.9rem] text-[1.2rem] font-bold">
                    Rp{item.harga}
                  </h2>
                </div>
              </>
              <div className="flex flex-row-reverse sm:flex sm:flex-row-reverse sm:justify-center justify-center items-center sm:gap-2 gap-4 sm:w-[18.75rem] w-[12rem]">
                <button
                  onClick={() => handleOpenDeleteConfirm(item.id)}
                  className="sm:w-[3.125rem] w-[2.5rem] h-[2.5rem] sm:h-[3.125rem] sm:mt-[1.2rem] mt-[2rem] bg-gradient-to-r from-[#9b59b6] to-[#e74c3c] rounded-lg"
                >
                  <div className="sm:w-[3.125rem] w-[2.5rem] h-[2.5rem] sm:h-[3.125rem] sm:flex flex sm:justify-center justify-center items-center sm:items-center">
                    <FaRegTrashAlt color="white" size={20} />
                  </div>
                </button>
                <button
                  onClick={() => setIsPopUpOpen(true)}
                  className="sm:flex sm:justify-center sm:items-center flex justify-center items-center sm:mt-[1.2rem] mt-[2rem]"
                >
                  <div className="sm:w-[12.625rem] w-[6rem] h-[2rem] sm:h-[3.125rem] bg-gradient-to-r from-[#9b59b6] to-[#e74c3c] rounded-lg">
                    <h1 className="sm:w-[12.625rem] w-[6rem] h-[2rem] flex justify-center items-center sm:h-[3.125rem] sm:flex sm:justify-center sm:items-center sm:text-[1.2rem] text-[1rem] text-white font-semibold">
                      Edit
                    </h1>
                  </div>
                </button>
                <Edit
                  isOpen={isPopUpOpen}
                  onClose={() => setIsPopUpOpen(false)}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
      <DeleteConfirmation
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
