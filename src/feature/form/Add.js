import React, { useRef, useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Button from "../../component/button/Button";
import Upload from "../../assets/Download.gif";

const extractMitraIdFromToken = (token) => {
  if (!token) return null;
  const base64Payload = token.split(".")[1];
  const payload = JSON.parse(atob(base64Payload));
  return payload.mitraId || null;
};

export default function Add({ isOpen, onClose }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileUploadRef = useRef();
  const [formData, setFormData] = useState({
    nama_produk: "",
    deskripsi_produk: "",
    harga: "",
    gambar: "",
  });
  const [mitraId, setMitraId] = useState(null);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    // Extract `mitraId` from token when component mounts
    const id = extractMitraIdFromToken(token);
    setMitraId(id);
  }, [token]);

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
    const hargaInt = parseInt(formData.harga);
    if (isNaN(hargaInt)) {
      console.error("Invalid price value");
      return;
    }
    if (!mitraId) {
      console.error("Mitra ID is not available");
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append("nama_produk", formData.nama_produk);
    formDataToSend.append("deskripsi_produk", formData.deskripsi_produk);
    formDataToSend.append("harga", hargaInt);
    formDataToSend.append("gambar", formData.gambar);
    formDataToSend.append("mitraId", mitraId);
    try {
      const response = await axios.post(
        `http://antriaapi.verni.yt/produk`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
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
      [name]: name === "nama_produk" ? value.toUpperCase() : value,
    }));
  };

  return (
    <div className="z-10 fixed inset-0 sm:flex flex justify-center sm:justify-center sm:items-center">
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
                  <img className="w-[5rem] h-[5rem]" src={Upload} />
                  <p>Unggah Foto</p>
                </button>
              )}
            </label>
          </div>
          <div className="w-full sm:py-0 pt-6">
            <Button
              txtColor="text-black font-bold"
              txtSize="sm:w-full w-80 sm:h-10"
              position="flex justify-center items-center"
              text="Add"
              size=" sm:w-full w-[19rem] h-[2.938rem]"
              bgColor="bg-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
