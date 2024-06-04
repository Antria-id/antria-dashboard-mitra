import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdDelete, MdDriveFolderUpload } from "react-icons/md";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "../button/Button";
import axios from "axios";

export default function Edit() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [dataItem, setDataItem] = useState({
    nama_produk: "",
    deskripsi_produk: "",
    harga: "",
    gambar: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchProductDataItem();
  }, [id]);

  const fetchProductDataItem = async () => {
    try {
      const response = await fetch(`https://development.verni.yt/produk/${id}`);
      const data = await response.json();
      setDataItem(data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const hargaInt = parseInt(dataItem.harga);
      if (isNaN(hargaInt)) {
        console.error("Invalid price value");
        return;
      }
      const response = await axios.put(
        `https://development.verni.yt/produk/${id}`,
        {
          nama_produk: dataItem.nama_produk,
          deskripsi_produk: dataItem.deskripsi_produk,
          harga: hargaInt,
          gambar: dataItem.gambar,
        },
      );
      console.log(response);
      navigate("/data-menu");
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
    setDataItem({ ...dataItem, gambar: event.target.files[0].name});
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    setDataItem({ ...dataItem, gambar: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataItem({ ...dataItem, [name]: value });
  };

  return (
    <aside className="bg-white mt-6 rounded-xl shadow-2xl z-0 transition-all mx-auto duration-300 max-w-7xl w-full sm:h-[51.563rem] px-4">
      <div className="flex flex-row items-center pl-4 pt-8 gap-4">
        <Link
          to="/data-menu"
          className="flex justify-center items-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-red-600"
        >
          <IoIosArrowBack color="white" size={22} />
        </Link>
        <h1 className="text-2xl font-semibold">Edit Product</h1>
      </div>
      {Object.keys(dataItem).length > 0 && (
        <div className="flex flex-col lg:flex-row pl-4 pt-8 gap-8 px-4">
          <div className="flex flex-col gap-6 w-full lg:w-1/2">
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold">Nama Produk</h2>
              <input
                className="w-full border-2 border-neutral-700 h-10 px-3 py-2 bg-white rounded-lg"
                name="nama_produk"
                placeholder="Masukkan Nama Produk"
                value={dataItem.nama_produk}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold">Deskripsi Produk</h2>
              <textarea
                className="w-full border-2 border-neutral-700 h-[7rem] px-3 py-2 bg-white rounded-lg"
                name="deskripsi_produk"
                placeholder="Masukkan Keterangan Produk"
                value={dataItem.deskripsi_produk}
                onChange={(e) =>
                  setDataItem({ ...dataItem, deskripsi_produk: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold">Harga</h2>
              <input
                className="w-full border-2 border-neutral-700 h-10 px-3 py-2 bg-white rounded-lg"
                name="harga"
                type="number"
                min="0"
                placeholder="Masukkan Harga Produk"
                value={dataItem.harga || ""}
                onChange={(e) =>
                  setDataItem({ ...dataItem, harga: e.target.value })
                }
              />
            </div>

            <div className="sm:w-full w-full flex flex-col gap-y-2">
              <h2 className="font-semibold">Foto Produk</h2>
              <label htmlFor="file-upload" className="cursor-pointer">
                <input
                  id="file-upload"
                  name="gambar"
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  className="w-full border-2 border-neutral-700 h-10 px-3 py-2 bg-white rounded-lg hidden"
                  onChange={handleFileChange}
                />
                {selectedImage ? (
                  <div className="relative">
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="w-full border-2 border-neutral-700 h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition"
                      onClick={handleDeleteImage}
                    >
                      <MdDelete size={24} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full sm:h-[14.4rem] h-[18rem] border-2 border-dashed border-neutral-700 bg-white rounded-lg">
                    <MdDriveFolderUpload size={48} color="black" />
                    <p>Unggah Foto</p>
                  </div>
                )}
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-row gap-x-[2rem] pt-[2.125rem]">
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <div className="sm:flex sm:flex-col sm:justify-center sm:items-center sm:w-[70.75rem] w-[12rem]">
                  <p className="text-[2rem] font-bold text-red-500">{error}</p>
                </div>
              ) : (
                <div key={dataItem.id}>
                  <div className="flex flex-col gap-x-3 sm:w-[18.75rem] sm:h-[31.25rem] w-[20rem] h-[29rem] shadow-xl rounded-lg">
                    <div className="sm:w-[18.75rem] sm:h-[18rem] rounded-2xl">
                      <img
                        className="sm:w-[18.75rem] sm:h-[18rem] rounded-[1.4rem]"
                        src={`https://development.verni.yt/image/${dataItem.gambar}`}
                        alt="Product"
                      />
                    </div>
                    <div className="sm:flex sm:flex-col flex flex-col sm:gap-y-[1rem] gap-y-3 sm:ml-0 ml-3">
                      <h1 className="sm:w-[14.956rem] sm:h-[0.935] sm:flex sm:justify-start sm:pl-[0.9rem] text-[1.2rem] font-semibold">
                        {dataItem.nama_produk}
                      </h1>
                      <h2 className="sm:w-[14.956rem] sm:h-[0.935] sm:flex sm:justify-start sm:pl-[0.9rem] text-[1rem]">
                        {dataItem.deskripsi_produk}
                      </h2>
                      <h2 className="sm:w-[14.956rem] sm:h-[0.935] sm:flex sm:justify-start sm:pl-[0.9rem] text-[1.2rem] font-bold">
                        Rp{dataItem.harga}
                      </h2>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-row gap-x-[2rem] sm:mt-[1rem] mt-3 sm:mb-[3rem] mb-[2rem] h-full  ">
              <Button
                txtColor="text-white"
                txtSize="sm:w-72 w-80 sm:h-10"
                position="flex justify-center items-center"
                text="Update"
                size=" sm:w-[18.75rem] w-[19rem] h-[2.938rem]"
                bgColor="bg-gradient-to-r from-[#9b59b6] to-[#e74c3c]"
                onClick={handleUpdate}
              />
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
