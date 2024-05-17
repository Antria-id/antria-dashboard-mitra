import React, { useState, useEffect } from "react";
import axios from "axios";
import Edit from "./Edit";

export default function Menu() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
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

  return (
    <div className="flex flex-row gap-x-6 sm:w-[18.75rem] sm:h-[31.25rem] w-[12rem] h-[27rem]">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : data ? (
        data.map((item, index) => (
          <div key={index}>
            <div className="flex flex-col gap-x-3 sm:w-[18.75rem] sm:h-[31.25rem] w-[12rem] h-[23rem] shadow-xl rounded-lg">
              <>
                <div className="sm:w-[18.75rem] sm:h-[18.304rem] rounded-2xl">
                  <img className="sm:w-[18.75rem] sm:h-[18.304rem] rounded-2xl" src={`https://development.verni.yt/image/${item.gambar}`} alt="Product" />
                </div>
                <div className="sm:flex sm:flex-col flex flex-col sm:gap-y-3 gap-y-3 sm:ml-0 ml-3">
                  <h1 className="sm:w-[14.956rem]  sm:h-[0.935] sm:flex sm:justify-start sm:pl-[0.9rem] text-[1.2rem] font-semibold ">
                    {item.nama_produk}
                  </h1>
                  <h2 className="sm:w-[14.956rem] sm:h-[0.935] sm:flex sm:justify-start sm:pl-[0.9rem] text-[1rem] ">
                    {item.deskripsi_produk}
                  </h2>
                  <h2 className="sm:w-[14.956rem] sm:h-[0.935] sm:flex sm:justify-start sm:pl-[0.9rem] text-[1rem] ">
                    {item.harga}
                  </h2>
                </div>
              </>
              <button onClick={() => setIsPopUpOpen(true)} className="flex justify-center items-center sm:mt-[1.2rem] mt-[2rem]">
                <div className="sm:w-[15.625rem] w-[9rem] h-[2rem] sm:h-[3.125rem] bg-gradient-to-r from-[#9b59b6] to-[#e74c3c] rounded-lg ">
                  <h1 className="sm:w-[15.625rem]  w-[9rem] h-[2rem] flex justify-center items-center sm:h-[3.125rem] sm:flex sm:justify-center sm:items-center sm:text-[1.2rem] text-[1rem] text-white font-semibold">
                    Edit
                  </h1>
                </div>
              </button>
              <Edit isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)}/>
            </div>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}