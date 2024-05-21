import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { MdDriveFolderUpload, MdDelete } from "react-icons/md";
import axios from "axios";

export default function Edit({ isOpen, onClose }) {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    nama_produk: "",
    deskripsi_produk: "",
    harga: "",
    gambar: "",
  });

  const handleClose = () => {
    setSelectedImage("");
    setFormData({
      nama_produk: "",
      deskripsi_produk: "",
      harga: "",
      gambar: "",
    });
    if (typeof onClose === "function") {
      onClose();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setFormData((prevFormData) => ({
        ...prevFormData,
        gambar: file,
      }));
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage("");
    document.getElementById("file-upload").value = "";
    setFormData((prevFormData) => ({
      ...prevFormData,
      gambar: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const formDataToSend = {
        nama_produk: formData.nama_produk,
        deskripsi_produk: formData.deskripsi_produk,
        harga: parseInt(formData.harga, 10),
        mitraId: 2,
      };
  
      if (formData.gambar) {
        console.warn('Image upload is not handled in this request');
      }
  
      console.log('Payload to send:', formDataToSend);
  
      const response = await axios.put(
        `https://development.verni.yt/produk/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Data submitted successfully:", response.data);
      handleClose();
    } catch (error) {
      console.error("Error submitting data:", error);
  
      if (error.response) {
        console.error("Error details:", error.response.data);
        alert(
          `Failed to submit data. Server responded with: ${
            error.response.data.message || JSON.stringify(error.response.data)
          }`
        );
      } else {
        alert(`Failed to submit data. Error: ${error.message}`);
      }
    }
  };
  
  if (!isOpen) {
    return null;
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 sm:flex flex justify-center sm:justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-gray-600 opacity-60"
        onClick={handleClose}
      />
      <div
        className="relative w-full sm:w-[30rem] max-w-md bg-gradient-to-b from-[#9b59b6] to-[#e74c3c] rounded-lg p-6 m-6 overflow-y-auto"
        style={{ maxHeight: "85vh" }}
      >
        <button
          className="absolute top-0 right-0 mt-2 mr-2"
          onClick={handleClose}
        >
          <IoMdClose size={30} color="white" />
        </button>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          encType="multipart/form-data"
          key={formData.id}
        >
          <div className="w-full">
            <h2 className="text-white font-semibold">Nama Produk</h2>
            <input
              className="w-full h-10 px-3 py-2 bg-white rounded-lg"
              name="nama_produk"
              value={formData.nama_produk}
              onChange={handleInputChange}
              placeholder="Masukkan Nama Produk"
            />
          </div>
          <div className="w-full">
            <h2 className="text-white font-semibold">Deskripsi Produk</h2>
            <textarea
              className="w-full sm:h-24 h-[7rem] px-3 py-2 bg-white rounded-lg"
              name="deskripsi_produk"
              value={formData.deskripsi_produk}
              onChange={handleInputChange}
              placeholder="Masukkan Keterangan Produk"
            />
          </div>
          <div className="w-full">
            <h2 className="text-white font-semibold">Harga</h2>
            <input
              className="w-full h-10 px-3 py-2 bg-white rounded-lg"
              name="harga"
              type="number"
              min="0"
              value={formData.harga}
              onChange={handleInputChange}
              placeholder="Masukkan Harga Produk"
            />
          </div>
          <div className="w-full">
            <h2 className="text-white font-semibold">Foto Produk</h2>
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
                    src={selectedImage}
                    alt="Selected"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    className="absolute top-0 right-0 mt-1 mr-1"
                    onClick={handleDeleteImage}
                  >
                    <MdDelete size={24} color="white" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center w-full sm:h-48 h-[14rem] bg-white rounded-lg">
                  <MdDriveFolderUpload size={48} color="black" />
                  <p>Unggah Foto</p>
                </div>
              )}
            </label>
          </div>
          <div className="w-full sm:py-0 pt-6">
            <button
              className="w-full h-10 px-3 py-2 bg-white text-black rounded-lg font-semibold"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
