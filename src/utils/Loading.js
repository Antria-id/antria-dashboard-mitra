// Loading.js
import React from "react";
import { ThreeDot } from "react-loading-indicators";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col gap-y-4">
        <ThreeDot
          variant="bob"
          color="#9b59b6"
          size="large"
        />
        <h1>Loading</h1>
      </div>
    </div>
  );
}
