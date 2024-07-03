import React from "react";

export default function DeleteConfirmation({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-6">Apakah kamu yakin untuk menghapus menu ini?</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};