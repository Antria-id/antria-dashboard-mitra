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
    kuantitas: "",
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
      const response = await axios.get(
        `https://development.verni.yt/produk/${id}`
      );
      setDataItem(response.data);
      if (response.data.gambar) {
        setSelectedImage(
          `https://development.verni.yt/image/${response.data.gambar}`
        );
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      setError("Failed to fetch product data.");
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("nama_produk", dataItem.nama_produk);
    formData.append("deskripsi_produk", dataItem.deskripsi_produk);
    formData.append("harga", dataItem.harga);
    formData.append("kuantitas", dataItem.kuantitas);
    if (selectedImage && typeof selectedImage === "object") {
      formData.append("gambar", selectedImage);
    }

    try {
      await axios.put(`https://development.verni.yt/produk/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/data-menu");
    } catch (error) {
      console.error("Error updating product", error);
      setError("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setDataItem({ ...dataItem, gambar: file.name });
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
          <IoIosArrowBack color="white" size={20} />
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
                className="w-full border-2 border-neutral-700 h-24 px-3 py-2 bg-white rounded-lg"
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
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold">Kuantitas</h2>
              <input
                className="w-full border-2 border-neutral-700 h-10 px-3 py-2 bg-white rounded-lg"
                name="kuantitas"
                type="number"
                min="0"
                placeholder="Masukkan Kuantitas Produk"
                value={dataItem.kuantitas || ""}
                onChange={(e) =>
                  setDataItem({ ...dataItem, kuantitas: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold">Foto Produk</h2>
              <label htmlFor="file-upload" className="cursor-pointer">
                <input
                  id="file-upload"
                  name="gambar"
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {selectedImage ? (
                  <div className="relative">
                    <img
                      src={
                        typeof selectedImage === "string"
                          ? selectedImage
                          : URL.createObjectURL(selectedImage)
                      }
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
                  <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-neutral-700 bg-white rounded-lg">
                    <MdDriveFolderUpload size={48} color="black" />
                    <p>Unggah Foto</p>
                  </div>
                )}
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-6 w-full lg:w-1/2">
            <div className="flex justify-center">
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-500">{error}</p>
                </div>
              ) : (
                <div
                  key={dataItem.id}
                  className="flex flex-col items-center gap-6"
                >
                  <div className="w-full max-w-md shadow-xl rounded-lg">
                    <div className="w-full h-48 rounded-2xl overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={`https://development.verni.yt/image/${dataItem.gambar}`}
                        alt="Product"
                      />
                    </div>
                    <div className="flex flex-col gap-3 p-4">
                      <h1 className="text-lg font-semibold">
                        {dataItem.nama_produk}
                      </h1>
                      <h2 className="text-base">{dataItem.deskripsi_produk}</h2>
                      <h2 className="text-xl font-bold">Rp{dataItem.harga}</h2>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-center">
              <Button
                txtColor="text-white"
                txtSize="sm:w-72 w-80 h-10"
                position="flex justify-center items-center"
                text="Update"
                size="sm:w-72 w-80 h-10"
                bgColor="bg-gradient-to-r from-purple-600 to-red-600"
                onClick={handleUpdate}
              />
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
