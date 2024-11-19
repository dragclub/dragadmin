/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import CreatorCard from "./CreatorCard";

const CreatorList = ({ status }) => {
  const [creators, setCreators] = useState([]);
    const handleStatusChange = (updatedCreator) => {
    setCreators((prevCreators) =>
      prevCreators.map((creator) =>
        creator._id === updatedCreator._id ? updatedCreator : creator
      )
    );
  };
   const handleDelete = (creatorId) => {
     setCreators((prevCreators) =>
       prevCreators.filter((creator) => creator._id !== creatorId)
     );
   };
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const fetchCreators = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_APP_BASEURL
          }v2/admin/getcreators${status}`,
            {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },}
        );
        if (!response.ok) {
          throw new Error("Failed to fetch creators");
        }
        const data = await response.json();
        setCreators(data);
      } catch (error) {
        console.error("Error fetching creators:", error.message);
      }
    };

    fetchCreators();
  }, [status]); 

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {creators.length === 0 ? (
        <div className="col-span-full text-center text-gray-500">
          No {status} creators.
        </div>
      ) : (
        creators.map((creator) => (
          <div key={creator._id}>
            {/* Render your creator card here */}
            <CreatorCard
              creator={creator}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default CreatorList;
