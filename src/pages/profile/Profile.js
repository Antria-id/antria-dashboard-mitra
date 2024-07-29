import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import Button from "../../component/button/Button";
import Upload from "../../assets/Download.gif";
import Map from "../../assets/Map.png";
import {jwtDecode} from "jwt-decode"; 

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nama_toko: "",
    deskripsi_toko: "",
    jam_buka: "",
    jam_tutup: "",
    gambar_toko: null,
    hari_buka: "", // Changed to string
    linkGmaps: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const fileUploadRef = useRef();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const token = localStorage.getItem("authToken");
  const mitraId = token ? jwtDecode(token).mitraId : null;

  useEffect(() => {
    if (mitraId) {
      fetchProfileData();
    }
  }, [mitraId]);

  const fetchProfileData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://antriaapi.verni.yt/mitra/${mitraId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;
        setProfile(data);
        setFormData({
          nama_toko: data.nama_toko,
          deskripsi_toko: data.deskripsi_toko,
          jam_buka: data.jam_buka,
          jam_tutup: data.jam_tutup,
          gambar_toko: null,
          hari_buka: data.hari_buka || "",
          linkGmaps: data.linkGmaps || "",
        });
        setSelectedImage(
          `http://antriaapi.verni.yt/image/${data.gambar_toko}`
        );
      } else {
        setError("Failed to fetch profile data");
      }
    } catch (error) {
      setError("Error fetching profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setSelectedImage(URL.createObjectURL(uploadedFile));
    setFormData((prevFormData) => ({
      ...prevFormData,
      gambar_toko: uploadedFile,
    }));
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    fileUploadRef.current.value = "";
    setFormData((prevFormData) => ({
      ...prevFormData,
      gambar_toko: null,
    }));
  };

  const handleDayChange = (day) => {
    setFormData((prevData) => {
      const daysArray = prevData.hari_buka ? prevData.hari_buka.split(",") : [];
      const isDaySelected = daysArray.includes(day);
      const updatedHariBuka = isDaySelected
        ? daysArray.filter((d) => d !== day)
        : [...daysArray, day];

      return {
        ...prevData,
        hari_buka: updatedHariBuka.join(","),
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("nama_toko", formData.nama_toko);
    formDataToSend.append("deskripsi_toko", formData.deskripsi_toko);
    formDataToSend.append("jam_buka", formData.jam_buka);
    formDataToSend.append("jam_tutup", formData.jam_tutup);
    if (formData.gambar_toko) {
      formDataToSend.append("gambar_toko", formData.gambar_toko);
    }
    formDataToSend.append("hari_buka", formData.hari_buka);
    formDataToSend.append("linkGmaps", formData.linkGmaps);

    try {
      const response = await axios.put(
        `https://antriaapi.verni.yt/mitra/${mitraId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Profile updated successfully", response.data);
      fetchProfileData(); // Refresh profile data after update
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again later.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!profile && !formData) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">No profile data available</p>
      </div>
    );
  }

  return (
    <aside className="bg-white sm:w-[77rem] w-full sm:h-[51.563rem] h-auto mt-[1.5rem] rounded-xl shadow-2xl z-0 transition-all mx-auto duration-300 sm:overflow-y-hidden overflow-y-auto">
      <h1 className="text-2xl pl-6 pt-[2rem] pb-4 font-semibold">Informasi Mitra</h1>
      <div className="flex flex-col sm:flex-row gap-x-[1rem]">
        <div className="flex flex-col">
          {/* Card Profile */}
          <div className="w-[22rem] sm:w-[38.5rem] sm:h-[10rem] h-[25rem] ml-6 mt-[2rem] rounded-lg bg-gradient-to-r from-[#9b59b6] to-[#e74c3c]">
            <div className="w-full sm:w-[38.5rem] h-[10rem] flex flex-col sm:flex-row gap-x-4 ml-[1rem] pt-[1rem]">
              <img
                className="w-[8rem] h-[8rem] rounded-full"
                src={
                  selectedImage ||
                  `https://antriaapi.verni.yt/image/${formData.gambar_toko}`
                }
                alt="Profile"
              />
              <div className="flex flex-col gap-y-2 mt-2 sm:mt-0">
                <h1 className="text-2xl text-white font-semibold">
                  {formData.nama_toko}
                </h1>
                <p className="w-[18.5rem] sm:w-[27rem] text-justify text-[1rem] text-white font-normal ">
                  {formData.deskripsi_toko}
                </p>
                <div className="flex flex-col sm:flex-row gap-[1rem] sm:gap-[10rem]">
                  <h1 className="text-[1rem] text-white font-bold">
                    Jam Buka : {formData.jam_buka}
                  </h1>
                  <h1 className="text-[1rem] text-white font-bold">
                    Jam Tutup : {formData.jam_tutup}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-2xl pl-6 pt-[2rem] font-semibold">
            Lokasi Restoran
          </h1>
          <div className="w-full sm:w-[38.5rem] h-auto sm:h-[28.4rem] ml-6 mt-[0.5rem] rounded-lg bg-gradient-to-r from-[#9b59b6] to-[#e74c3c]">
            <div className="w-full sm:w-[38.5rem] h-auto sm:h-[31rem] flex flex-col ">
              <div className="w-full sm:w-[38.5rem] flex justify-center items-center mt-[0.6rem]">
                <a
                  href={
                    formData.linkGmaps ||
                    "https://maps.app.goo.gl/1whSdu9ySgy5zs5t8"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="flex justify-center w-full sm:w-[37rem] h-auto sm:h-[27rem] rounded-lg cursor-pointer"
                    src={Map}
                    alt="Map"
                  />
                </a>
              </div>
              
            </div>
          </div>
        </div>
        {/* Form Profile */}
        <div className="w-full sm:w-[33.5rem] h-auto sm:h-[43rem] mt-[2rem] flex flex-col bg-gradient-to-r from-[#9b59b6] to-[#e74c3c] rounded-lg overflow-y-auto">
          <h1 className="text-[1.5rem] mt-[1rem] ml-[1.5rem] text-white font-bold">
            Edit Informasi Mitra
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 ml-[1.5rem]"
            encType="multipart/form-data"
          >
            <div className="w-full">
              <h2 className="text-white font-semibold">Nama Toko</h2>
              <input
                className="w-full sm:w-[30rem] h-10 px-3 py-2 bg-white rounded-lg"
                name="nama_toko"
                value={formData.nama_toko}
                onChange={handleInputChange}
                placeholder="Masukkan Nama Toko"
              />
            </div>
            <div className="w-full">
              <h2 className="text-white font-semibold">Deskripsi Toko</h2>
              <textarea
                className="w-full sm:w-[30rem] h-[7rem] sm:h-24 px-3 py-2 bg-white rounded-lg"
                name="deskripsi_toko"
                value={formData.deskripsi_toko}
                onChange={handleInputChange}
                placeholder="Masukkan Deskripsi Toko"
              />
            </div>
            <div className="w-full">
              <h2 className="text-white font-semibold">Hari Buka</h2>
              <button
                type="button"
                className="w-full sm:w-[30rem] bg-white rounded-lg p-2 flex justify-between items-center"
                onClick={() => setIsAccordionOpen(!isAccordionOpen)}
              >
                <h1 className="text-[1rem] text-black">Pilih hari</h1>
                <span>
                  {isAccordionOpen ? (
                    <HiChevronUp color="black" size={20} />
                  ) : (
                    <HiChevronDown color="black" size={20} />
                  )}
                </span>
              </button>
              {isAccordionOpen && (
                <div className="bg-white w-full sm:w-[30rem] p-4 rounded-lg mt-2">
                  {[
                    "Senin",
                    "Selasa",
                    "Rabu",
                    "Kamis",
                    "Jumat",
                    "Sabtu",
                    "Minggu",
                  ].map((day) => (
                    <div key={day} className="flex items-center">
                      <input
                        type="checkbox"
                        id={day}
                        checked={formData.hari_buka.split(",").includes(day)}
                        onChange={() => handleDayChange(day)}
                      />
                      <label htmlFor={day} className="ml-2 text-black">
                        {day}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="w-full">
              <input
                className="w-full sm:w-[30rem] h-10 px-3 py-2 bg-white rounded-lg"
                name="linkGmaps"
                value={formData.linkGmaps}
                onChange={handleInputChange}
                placeholder="Masukkan Link Google Map"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-x-0 sm:gap-x-5">
              <div className="w-full">
                <h2 className="text-white font-semibold">Jam Buka</h2>
                <input
                  type="time"
                  className="w-full sm:w-[14rem] h-10 px-3 py-2 bg-white rounded-lg"
                  name="jam_buka"
                  value={formData.jam_buka}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full">
                <h2 className="text-white font-semibold">Jam Tutup</h2>
                <input
                  type="time"
                  className="w-full sm:w-[14rem] h-10 px-3 py-2 bg-white rounded-lg"
                  name="jam_tutup"
                  value={formData.jam_tutup}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="w-full sm:w-[30rem]">
              <h2 className="text-white font-semibold">Foto Toko</h2>
              <label>
                <input
                  id="file-upload"
                  name="gambar_toko"
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  className="hidden"
                  ref={fileUploadRef}
                  onChange={handleImageUpload}
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
                    onClick={() => fileUploadRef.current.click()}
                  >
                    <img
                      className="w-[5rem] h-[5rem]"
                      src={Upload}
                      alt="Upload"
                    />
                    <p>Unggah Foto</p>
                  </button>
                )}
              </label>
            </div>
            <div className="w-full mt-6 mb-6">
              <Button
                txtColor="text-black font-bold"
                txtSize="w-full sm:w-[30rem] sm:h-10"
                position="flex justify-center items-center"
                text="Update"
                size="w-full sm:w-[30rem] h-[2.938rem]"
                bgColor="bg-white"
              />
            </div>
          </form>
        </div>
      </div>
    </aside>
  );
}
