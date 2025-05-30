// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]); // ✅ Holds the filtered list of users
//   const [searchQuery, setSearchQuery] = useState(""); // ✅ Stores search input value
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [updating, setUpdating] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // ✅ Fetch Users from API
//   const fetchUsers = async () => {
//     setLoading(true);
//     setError("");

//     const token = localStorage.getItem("token");
//     if (!token) {
//       setError("Unauthorized: No token found. Please log in.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch("https://backend-nm1z.onrender.com/api/admin/auth/users", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();

//       // ✅ Ensure correct mapping of subscription status
//       const updatedUsers = data.map((user) => ({
//         ...user,
//         subscriptionActive: user.status === "Approved",
//       }));

//       setUsers(updatedUsers);
//       setFilteredUsers(updatedUsers); // ✅ Initialize filteredUsers with all users
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Handle Subscription Toggle
//   const toggleSubscription = async (userId, currentStatus) => {
//     setUpdating((prev) => ({ ...prev, [userId]: true }));

//     const endpoint = currentStatus
//       ? `https://backend-nm1z.onrender.com/api/admin/auth/users/block/${userId}`
//       : `https://backend-nm1z.onrender.com/api/admin/auth/users/approve/${userId}`;

//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(endpoint, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) throw new Error("Failed to update subscription status.");

//       fetchUsers();
//     } catch (err) {
//       console.error("Error updating subscription status:", err);
//       alert("Failed to update subscription status.");
//     } finally {
//       setUpdating((prev) => ({ ...prev, [userId]: false }));
//     }
//   };

//   // ✅ Handle Search Input
//   const handleSearch = (event) => {
//     const query = event.target.value.toLowerCase();
//     setSearchQuery(query);

//     // ✅ Filter users by name
//     const filtered = users.filter((user) =>
//       user.name.toLowerCase().includes(query)
//     );

//     setFilteredUsers(filtered);
//   };

//   return (
//     <div className="p-4 bg-white shadow-md rounded-lg">
//       {/* ✅ Search Bar */}
//       <div className="flex justify-between items-center mb-4">
//         <input
//           type="text"
//           placeholder="Search user by name..."
//           value={searchQuery}
//           onChange={handleSearch}
//           className="border border-gray-300 rounded-lg px-4 py-2 w-1/3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//         />

//         <button
//           onClick={() => navigate("/add-user")}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Add User
//         </button>
//       </div>

//       {loading ? (
//         <p className="text-gray-600">Loading users...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
//           <table className="w-full text-sm text-left text-gray-500">
//             <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//               <tr>
//                 <th className="py-3 px-6">Name</th>
//                 <th className="py-3 px-6">Age</th>
//                 <th className="py-3 px-6">Religion</th>
//                 <th className="py-3 px-6">Caste</th>
//                 <th className="py-3 px-6">Subscription Active</th>
//                 <th className="py-3 px-6">Mobile Number</th>
//                 <th className="py-3 px-6">Marital Status</th>
//                 <th className="py-3 px-6">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredUsers.length > 0 ? (
//                 filteredUsers.map((user) => (
//                   <tr key={user._id} className="bg-white border-b">
//                     <td className="py-4 px-6">{user.name || "N/A"}</td>
//                     <td className="py-4 px-6">
//                       {user.dob ? new Date().getFullYear() - new Date(user.dob).getFullYear() : "N/A"}
//                     </td>
//                     <td className="py-4 px-6">{user.religion || "N/A"}</td>
//                     <td className="py-4 px-6">{user.caste || "N/A"}</td>
//                     <td className="py-4 px-6">
//                       <label className="relative inline-flex items-center cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={user.subscriptionActive}
//                           onChange={() => toggleSubscription(user._id, user.subscriptionActive)}
//                           className="sr-only peer"
//                           disabled={updating[user._id]}
//                         />
//                         <div className={`w-11 h-6 rounded-full transition-all ${user.subscriptionActive ? "bg-green-500" : "bg-gray-300"}`}>
//                           <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform transform ${user.subscriptionActive ? "translate-x-5" : ""}`}></div>
//                         </div>
//                       </label>
//                     </td>
//                     <td className="py-4 px-6">{user.mobile || "N/A"}</td>
//                     <td className="py-4 px-6">{user.marital_status || "N/A"}</td>
//                     <td className="py-4 px-6">
//                       <button
//                         className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded"
//                         onClick={() => navigate(`/edit-user/${user._id}`)}
//                       >
//                         Edit
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="8" className="text-center py-4 text-gray-500">
//                     No users found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Users;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserStatusStats from "./UserStatusStats";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // ✅ Holds the filtered list of users
  const [searchQuery, setSearchQuery] = useState(""); // ✅ Stores search input value
  const [subscriptionFilter, setSubscriptionFilter] = useState("All"); // ✅ Subscription Filter
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Fetch Users from API
  const fetchUsers = async () => {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized: No token found. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://backend-nm1z.onrender.com/api/admin/auth/users",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();

      // ✅ Ensure correct mapping of subscription status
      const updatedUsers = data.map((user) => ({
        ...user,
        subscriptionActive: user.status === "Approved",
      }));

      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers); // ✅ Initialize filteredUsers with all users
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Subscription Toggle
  const toggleSubscription = async (userId, currentStatus) => {
    setUpdating((prev) => ({ ...prev, [userId]: true }));

    let expiry;
    if (currentStatus == false) {
      expiry = prompt("Number of months:");
      const parsed = Number(expiry);

      if (!expiry || isNaN(parsed) || parsed <= 0) {
        alert("❌ Invalid input. Expiry must be a positive number.");
        // Optionally throw or handle it here
      } else {
        expiry = parsed;
      }
    }

    const endpoint = currentStatus
      ? `https://backend-nm1z.onrender.com/api/admin/auth/users/block/${userId}`
      : `https://backend-nm1z.onrender.com/api/admin/auth/users/approve/${userId}?expiry=${expiry}`;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok)
        throw new Error("Failed to update subscription status.");

      fetchUsers();
    } catch (err) {
      console.error("Error updating subscription status:", err);
      alert("Failed to update subscription status.");
    } finally {
      setUpdating((prev) => ({ ...prev, [userId]: false }));
    }
  };

  // ✅ Handle Search Input
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    applyFilters(query, subscriptionFilter);
  };

  // ✅ Handle Subscription Filter
  const handleSubscriptionFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setSubscriptionFilter(selectedFilter);
    applyFilters(searchQuery, selectedFilter);
  };

  // ✅ Apply Filters (Search + Subscription)
  const applyFilters = (query, subFilter) => {
    let filtered = users;

    if (query) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(query)
      );
    }

    if (subFilter === "Active") {
      filtered = filtered.filter((user) => user.subscriptionActive === true);
    } else if (subFilter === "Inactive") {
      filtered = filtered.filter((user) => user.subscriptionActive === false);
    }

    setFilteredUsers(filtered);
  };
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {/* ✅ Search & Subscription Filter */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search user by name..."
          value={searchQuery}
          onChange={handleSearch}
          className="border border-gray-300 rounded-lg px-4 py-2 w-1/3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {/* ✅ Sort Users Label & Subscription Filter Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-gray-700 font-bold">Sort Users:</label>
          <select
            value={subscriptionFilter}
            onChange={handleSubscriptionFilterChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <button
          onClick={() => navigate("/add-user")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add User
        </button>
      </div>

      <UserStatusStats />

      {loading ? (
        <p className="text-gray-600">Loading users...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Age</th>
                <th className="py-3 px-6">Religion</th>
                <th className="py-3 px-6">Caste</th>
                <th className="py-3 px-6">Subscription Active</th>
                <th className="py-3 px-6">Mobile Number</th>
                <th className="py-3 px-6">Marital Status</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="bg-white border-b">
                    <td className="py-4 px-6">{user.name || "N/A"}</td>
                    <td className="py-4 px-6">
                      {user.dob
                        ? new Date().getFullYear() -
                          new Date(user.dob).getFullYear()
                        : "N/A"}
                    </td>
                    <td className="py-4 px-6">{user.religion || "N/A"}</td>
                    <td className="py-4 px-6">{user.caste || "N/A"}</td>
                    <td className="py-4 px-6">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={user.subscriptionActive}
                          onChange={() =>
                            toggleSubscription(
                              user._id,
                              user.subscriptionActive
                            )
                          }
                          className="sr-only peer"
                          disabled={updating[user._id]}
                        />
                        <div
                          className={`w-11 h-6 rounded-full transition-all ${
                            user.subscriptionActive
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        >
                          <div
                            className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform transform ${
                              user.subscriptionActive ? "translate-x-5" : ""
                            }`}
                          ></div>
                        </div>
                      </label>
                    </td>
                    <td className="py-4 px-6">{user.mobile || "N/A"}</td>
                    <td className="py-4 px-6">
                      {user.marital_status || "N/A"}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded"
                        onClick={() => navigate(`/edit-user/${user._id}`)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
