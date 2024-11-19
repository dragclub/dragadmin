/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const CreatorCard = ({ creator, onStatusChange, onDelete }) => {
  const {
    name,
    userName,
    email,
    type,
    socialMedia,
    Mobile_No,
    image,
    location,
    mainPlatform,
    count,
    approved,
  } = creator;
  const token = localStorage.getItem("adminToken");
  const toggleApproval = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASEURL}v2/admin/toggle-approval/${
          creator._id
        }`,
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
      onStatusChange(data.creator); 
    } catch (error) {
      console.error("Error toggling approval status:", error.message);
    }
  };
  const deleteCreator = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASEURL}v2/admin/creator/${creator._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete creator");
      }

      const data = await response.json();
      onDelete(creator._id); 
    } catch (error) {
      console.error("Error deleting creator:", error.message);
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
      <img
        className="w-full h-48 object-cover"
        src={image}
        alt={`${name}'s profile`}
      />
      <div className="px-6 py-4">
        <h3 className="font-bold text-xl mb-2">{name}</h3>
        <p className="text-gray-700 text-base">Username: {userName}</p>
        <p className="text-gray-700 text-base">Email: {email}</p>
        <p className="text-gray-700 text-base">Type: {type}</p>
        <p className="text-gray-700 text-base">Location: {location}</p>
        <p className="text-gray-700 text-base">Mobile: {Mobile_No}</p>
        <p className="text-gray-700 text-base">
          Main Platforms: {mainPlatform.join(", ")}
        </p>
        <p className="text-gray-700 text-base">Followers Count: {count}</p>
        <p className="text-gray-700 text-base">Approval Status: {approved}</p>
        <a href={image} className="text-blue-500 text-base">
          <span className="text-gray-700">imageurl:</span> {image}
        </a>

        <div className="mt-4">
          <h4 className="font-bold">Social Media:</h4>
          {socialMedia && (
            <ul>
              {Object.entries(socialMedia).map(([platform, details]) => (
                <li key={platform}>
                  <p className="text-gray-700 text-base capitalize">
                    {platform}:{" "}
                    <a
                      href={details.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      {details.url}
                    </a>{" "}
                    ({details.count || 0} followers)
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
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
          onClick={deleteCreator}
          className="px-4 py-2 mt-2 ml-2 rounded bg-red-500 hover:bg-red-700 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CreatorCard;
