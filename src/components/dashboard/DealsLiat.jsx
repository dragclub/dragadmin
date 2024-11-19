/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import DealCard from "./DealsCard";


const DealList = ({ status }) => {
  const [deals, setDeals] = useState([]);


  const handleStatusChange = (updatedDeal) => {
    setDeals((prevDeals) =>
      prevDeals.map((deal) =>
        deal._id === updatedDeal._id ? updatedDeal : deal
      )
    );
    
  };

  
  const handleDelete = (dealId) => {
    setDeals((prevDeals) => prevDeals.filter((deal) => deal._id !== dealId));
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    const fetchDeals = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_BASEURL}v2/admin/getdeals${status}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch deals");
        }

        const data = await response.json();
       
        setDeals(data || []);
      } catch (error) {
        console.error("Error fetching deals:", error.message);
      }
    };

    fetchDeals();
  }, [status]); 

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {deals.length === 0 ? (
        <div className="col-span-full text-center text-gray-500">
          No {status} deals.
        </div>
      ) : (
        deals.map((deal) => (
          <div key={deal._id}>
            <DealCard
              deal={deal}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default DealList;
