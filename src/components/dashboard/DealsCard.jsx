/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const DealCard = ({ deal, onStatusChange, onDelete }) => {
  const {
    _id,
    companyName,
    dealDescription,
    creatorType,
    followers,
    dealType,
    email,
    mobile,
    socialMedia,
    approved,
  } = deal;

  const token = localStorage.getItem("adminToken");


  const toggleApproval = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASEURL}v2/admin/toggle-approval-deal/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update approval status");
      }

      const data = await response.json();
   
      onStatusChange(data.Deals); 
    } catch (error) {
      console.error("Error toggling approval status:", error.message);
    }
  };

 
  const deleteDeal = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASEURL}v2/admin/deal/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete deal");
      }

      onDelete(_id);
    } catch (error) {
      console.error("Error deleting deal:", error.message);
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
      <div className="px-6 py-4">
        <h3 className="font-bold text-xl mb-2">{companyName}</h3>
        <p className="text-gray-700 text-base">
          <strong>Description:</strong> {dealDescription}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Creator Type:</strong> {creatorType}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Minimum Followers:</strong> {followers}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Deal Types:</strong> {dealType.join(", ")}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Email:</strong> {email || "Not provided"}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Mobile:</strong> {mobile}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Social Media:</strong> <a href={socialMedia} className="text-blue-500">{socialMedia}</a>
        </p>
        <p className="text-gray-700 text-base">
          <strong>Status:</strong> {approved}
        </p>
      </div>

      <div className="px-6 py-4">
        <button
          onClick={toggleApproval}
          className={`px-4 py-2 rounded ${
            approved === "pending"
              ? "bg-green-500 hover:bg-green-700"
              : "bg-yellow-500 hover:bg-yellow-700"
          } text-white`}
        >
          {approved === "pending" ? "Approve" : "Set to Pending"}
        </button>

        <button
          onClick={deleteDeal}
          className="px-4 py-2 mt-2 ml-2 rounded bg-red-500 hover:bg-red-700 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DealCard;
