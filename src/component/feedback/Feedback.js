import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import Profile from "../../assets/Profile.gif";

export default function Feedback({ onRatingChange }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const reviewIds = [1, 2, 3]; // Example review IDs

    const fetchReviews = async () => {
      try {
        const reviewPromises = reviewIds.map((id) =>
          axios.get(`https://development.verni.yt/reviews/mitra/${id}`)
        );
        const responses = await Promise.all(reviewPromises);
        const fetchedReviews = responses.map((response) => {
          const data = response.data[0]; // Assuming the first review in the array
          const scaledRating = Math.ceil(data.rating / 20); // Convert 0-100 rating to 1-5
          return {
            komentar: data.komentar,
            rating: scaledRating,
            username: data.reviewer.username,
          };
        });
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching the reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <>
      {reviews.map((review, index) => (
        <div
          key={index}
          className="sm:w-[33.375rem] w-[21.2rem] sm:h-[7.436rem] h-[8rem] bg-white border border-gray-300 shadow-xl hover:shadow-2xl rounded-xl p-4 mb-4"
        >
          <div className="flex flex-row sm:w-full w-full sm:h-full h-full gap-4">
            <div className="flex justify-center items-center">
              <img className="sm:w-[4rem] sm:h-[4rem] w-[12rem] h-[5rem]" src={Profile} />
            </div>
            <div className="flex flex-col justify-center flex-grow">
              <h1 className="text-[1.5rem] font-bold">{review.username}</h1>
              <h1 className="text-[1.2rem] font-light">{review.komentar}</h1>
            </div>
            <div className="flex justify-center items-center">
              {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                  <FaStar
                    key={i}
                    size={20}
                    className={`cursor-pointer ${
                      ratingValue <= review.rating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
