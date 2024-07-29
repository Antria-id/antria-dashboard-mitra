import React, { useRef, useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Import jwt-decode for decoding JWT tokens
import Button from "../../component/button/Button";

export default function AddUser({ isOpen, onClose }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileUploadRef = useRef();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    profile_picture: "",
    nama: "",
    handphone: "",
    alamat: "",
    isOwner: false,
    mitraId: 2, // Default mitraId; will be updated based on JWT
  });

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const mitraId = decodedToken.mitraId || 2; // Fallback to default if mitraId is not available
        setFormData((prevFormData) => ({
          ...prevFormData,
          mitraId: mitraId,
        }));
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  const handleClose = () => {
    setSelectedImage(null);
    setFormData({
      username: "",
      password: "",
      email: "",
      profile_picture: "",
      nama: "",
      handphone: "",
      alamat: "",
      isOwner: false,
      mitraId: 2,
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
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setFormData((prevFormData) => ({
        ...prevFormData,
        profile_picture: reader.result,
      }));
    };
    reader.readAsDataURL(uploadedFile);
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    fileUploadRef.current.value = "";
    setFormData((prevFormData) => ({
      ...prevFormData,
      profile_picture: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
      profile_picture: formData.profile_picture,
      nama: formData.nama,
      handphone: formData.handphone,
      alamat: formData.alamat,
      isOwner: formData.isOwner,
      mitra: {
        connect: {
          id: formData.mitraId,
        },
      },
    };
    try {
      const response = await axios.post(
        "http://antriaapi.verni.yt/karyawan",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="w-full">
            <h2 className="text-white font-semibold">Username</h2>
            <input
              className="w-full h-10 px-3 py-2 bg-white rounded-lg"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Masukkan Username"
            />
          </div>
          <div className="w-full">
            <h2 className="text-white font-semibold">Password</h2>
            <input
              type="password"
              className="w-full px-3 py-2 bg-white rounded-lg"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Masukkan Password"
            />
          </div>
          <div className="w-full">
            <h2 className="text-white font-semibold">Email</h2>
            <input
              className="w-full px-3 py-2 bg-white rounded-lg"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Masukkan Email"
            />
          </div>
          <div className="w-full">
            <h2 className="text-white font-semibold">Nama</h2>
            <input
              className="w-full px-3 py-2 bg-white rounded-lg"
              name="nama"
              value={formData.nama}
              onChange={handleInputChange}
              placeholder="Masukkan Nama"
            />
          </div>
          <div className="w-full">
            <h2 className="text-white font-semibold">Handphone</h2>
            <input
              className="w-full px-3 py-2 bg-white rounded-lg"
              name="handphone"
              value={formData.handphone}
              onChange={handleInputChange}
              placeholder="Masukkan Handphone"
            />
          </div>
          <div className="w-full">
            <h2 className="text-white font-semibold">Alamat</h2>
            <input
              className="w-full px-3 py-2 bg-white rounded-lg"
              name="alamat"
              value={formData.alamat}
              onChange={handleInputChange}
              placeholder="Masukkan Alamat"
            />
          </div>
          <div className="w-full sm:py-0 pt-6">
            <Button
              txtColor="text-black font-bold"
              txtSize="sm:w-full w-80 sm:h-10"
              position="flex justify-center items-center"
              text="Tambah Akun"
              size=" sm:w-full w-[19rem] h-[2.938rem]"
              bgColor="bg-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
