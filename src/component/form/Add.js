import React, { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdDriveFolderUpload, MdDelete } from "react-icons/md";
import axios from "axios";

export default function Add({ isOpen, onClose }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileUploadRef = useRef();
  const [formData, setFormData] = useState({
    nama_produk: "",
    deskripsi_produk: "",
    harga: "",
    gambar: "",
  });

  const handleClose = () => {
    setSelectedImage(null);
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

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  };

  const uploadImageDisplay = (event) => {
    const uploadedFile = event.target.files[0];
    setSelectedImage(URL.createObjectURL(uploadedFile));
    setFormData((prevFormData) => ({
      ...prevFormData,
      gambar: uploadedFile,
    }));
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    fileUploadRef.current.value = "";
    setFormData((prevFormData) => ({
      ...prevFormData,
      gambar: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("nama_produk", formData.nama_produk);
    formDataToSend.append("deskripsi_produk", formData.deskripsi_produk);
    formDataToSend.append("harga", formData.harga);
    formDataToSend.append("gambar", formData.gambar);
    formDataToSend.append("mitraId", 2);

    try {
      const response = await axios.post(
        "https://development.verni.yt/produk",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Data submitted successfully", response.data);
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data. Please try again later.");
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
            <label>
              <input
                id="file-upload"
                name="gambar"
                type="file"
                accept=".png,.jpg,.jpeg"
                className="hidden"
                ref={fileUploadRef}
                onChange={uploadImageDisplay}
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
                    type="button"
                    onClick={handleDeleteImage}
                  >
                    <MdDelete size={24} color="white" />
                  </button>
                </div>
              ) : (
                <button
                  className="flex flex-col items-center justify-center w-full sm:h-48 h-[14rem] bg-white rounded-lg cursor-pointer"
                  onClick={handleImageUpload}
                >
                  <MdDriveFolderUpload size={48} color="black" />
                  <p>Unggah Foto</p>
                </button>
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
