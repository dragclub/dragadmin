// import { useState } from "react";
// import CreatorList from "../components/dashboard/CreatorList";

// const AdminDashboard = () => {
//   // State to track the selected list (pending or approved)
//   const [selectedTab, setSelectedTab] = useState("pending");

//   // Function to change the selected tab
//   const handleTabChange = (tab) => {
//     setSelectedTab(tab);
//   };

//   return (
//     <div>
//       {/* Top Navbar */}
//       <div className="flex justify-center space-x-4 bg-gray-800 p-4">
//         <button
//           className={`px-4 py-2 text-white ${
//             selectedTab === "pending" ? "bg-blue-500" : "bg-gray-600"
//           } rounded`}
//           onClick={() => handleTabChange("pending")}
//         >
//           Pending
//         </button>
//         <button
//           className={`px-4 py-2 text-white ${
//             selectedTab === "approved" ? "bg-blue-500" : "bg-gray-600"
//           } rounded`}
//           onClick={() => handleTabChange("approved")}
//         >
//           Approved
//         </button>
//       </div>

//       {/* Show Creator List based on selected tab */}
//       <div className="mt-4">
//         <CreatorList status={selectedTab} />
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
import { useState } from "react";
import CreatorList from "../components/dashboard/CreatorList";
import DealList from "../components/dashboard/DealsLiat";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  // State to track the selected tab
  const [selectedTab, setSelectedTab] = useState("pendingCreators");
  const navigate = useNavigate();
  const logoutHandler=()=>{
    localStorage.removeItem("adminToken");
    navigate('/');
  }
  // Define tab options
  const tabs = [
    { key: "pendingCreators", label: "Pending Creators" },
    { key: "approvedCreators", label: "Approved Creators" },
    { key: "pendingDeals", label: "Pending Deals" },
    { key: "approvedDeals", label: "Approved Deals" },
  ];

  // Function to render the content based on selected tab
  const renderContent = () => {
    switch (selectedTab) {
      case "pendingCreators":
        return <CreatorList status="pending" />;
      case "approvedCreators":
        return <CreatorList status="approved" />;
      case "pendingDeals":
        return <DealList status="pending" />;
      case "approvedDeals":
        return <DealList status="approved" />;
      default:
        return <div className="text-center text-gray-500">Invalid Tab</div>;
    }
  };

  return (
    <div>
      {/* Top Navbar with Tabs */}
      <div className="flex justify-center space-x-4 bg-gray-800 p-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`px-4 py-2 text-white ${
              selectedTab === tab.key ? "bg-blue-500" : "bg-gray-600"
            } rounded`}
            onClick={() => setSelectedTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded"
          onClick={logoutHandler}
        >
          logout
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
