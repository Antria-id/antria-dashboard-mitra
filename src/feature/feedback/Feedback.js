import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import Profile from '../../assets/Profile.gif';
import Rate from '../../assets/Rating.gif';

// Axios instance with token handling
const axiosInstance = axios.create({
  baseURL: 'http://antriaapi.verni.yt',
});
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default function Feedback({ mitraId }) { // Accept mitraId as a prop
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(`/reviews/mitra/${mitraId}`);
        const data = response.data;

        const fetchedReviews = data.map((review) => {
          const scaledRating = Math.ceil(review.rating / 20); // Convert 0-100 rating to 1-5
          return {
            komentar: review.komentar,
            rating: scaledRating,
            username: review.reviewer.username,
          };
        });
        setReviews(fetchedReviews);
      } catch (error) {
        console.error('Error fetching the reviews:', error);
      }
    };

    if (mitraId) {
      fetchReviews();
    }
  }, [mitraId]);

  return (
    <div className="flex flex-col items-center">
      {reviews.length === 0 ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="w-[31.438rem] h-[28.875rem]">
              <img
                src={Rate}
                alt="No Data"
                className="w-full h-full object-cover bg-transparent"
              />
            </div>
            <h1 className="w-[24rem] text-center text-2xl font-bold text-gray-500">
              Belum ada rating dari pelanggan
            </h1>
          </div>
      ) : (
        reviews.map((review, index) => (
          <div
            key={index}
            className="w-[32rem] mr-[2rem] max-w-md sm:max-w-lg lg:max-w-xl bg-white border border-gray-300 shadow-xl hover:shadow-2xl rounded-xl p-4 mt-4"
          >
            <div className="flex flex-row w-full h-full gap-4">
              <div className="flex-shrink-0">
                <img className="w-12 h-12 sm:w-16 sm:h-16" src={Profile} alt="Profile" />
              </div>
              <div className="flex flex-col justify-center flex-grow">
                <h1 className="text-lg sm:text-xl font-bold">{review.username}</h1>
                <h1 className="text-base text-justify sm:text-lg font-light">{review.komentar}</h1>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => {
                  const ratingValue = i + 1;
                  return (
                    <FaStar
                      key={i}
                      size={20}
                      className={`cursor-pointer ${
                        ratingValue <= review.rating
                          ? 'text-yellow-500'
                          : 'text-gray-300'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
