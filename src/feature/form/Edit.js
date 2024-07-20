import React, { useRef, useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Button from "../../component/button/Button";
import Upload from "../../assets/Download.gif";

// Function to extract the mitraId from the JWT token
const getMitraIdFromToken = (token) => {
  if (!token) return null;
  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken.mitraId;
  } catch (e) {
    console.error("Failed to decode token:", e);
    return null;
  }
};

export default function Edit({ isOpen, onClose, item }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileUploadRef = useRef();
  const [formData, setFormData] = useState({
    nama_produk: "",
    deskripsi_produk: "",
    harga: "",
    gambar: "",
  });

  const token = localStorage.getItem("authToken");
  const mitraId = getMitraIdFromToken(token);

  useEffect(() => {
    if (item) {
      setFormData({
        nama_produk: item.nama_produk,
        deskripsi_produk: item.deskripsi_produk,
        harga: parseInt(item.harga, 10), // Parse harga as an integer
        gambar: item.gambar,
      });
      setSelectedImage(`https://development.verni.yt/image/${item.gambar}`);
    }
  }, [item]);

  const handleClose = () => {
    setSelectedImage(null);
    setFormData({
      nama_produk: "",
      deskripsi_produk: "",
      harga: 0, // Reset harga as an integer
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

  const handleJSONSubmission = async () => {
    const hargaInt = parseInt(formData.harga, 10);
    if (isNaN(hargaInt)) {
      console.error("Invalid price value");
      return;
    }

    const jsonFormData = {
      nama_produk: formData.nama_produk,
      deskripsi_produk: formData.deskripsi_produk,
      harga: hargaInt,
      mitraId: mitraId, // Add mitraId to JSON submission
    };

    try {
      const response = await axios.put(
        `https://development.verni.yt/produk/${item.id}`,
        jsonFormData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("JSON data submitted successfully", response.data);
    } catch (error) {
      console.error("Error submitting JSON data:", error);
      alert("Failed to submit JSON data. Please try again later.");
    }
  };

  const handleImageSubmission = async () => {
    if (!formData.gambar) {
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("gambar", formData.gambar);

    try {
      const response = await axios.put(
        `https://development.verni.yt/produk/${item.id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Image uploaded successfully", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again later.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleJSONSubmission();
    await handleImageSubmission();
    handleClose();
    window.location.reload();
  };

  if (!isOpen) {
    return null;
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "harga" ? parseInt(value, 10) : value,
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
                id="file-update"
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
                  <img className="w-[5rem] h-[5rem]" src={Upload} alt="Upload" />
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
              text="Update"
              size=" sm:w-full w-[19rem] h-[2.938rem]"
              bgColor="bg-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
