import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserStatusStats from "./UserStatusStats";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [subscriptionFilter, setSubscriptionFilter] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [modalMonths, setModalMonths] = useState("");
  const [modalStartDate, setModalStartDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

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
      const updatedUsers = data.map((user) => ({
        ...user,
        subscriptionActive: user.status === "Approved",
      }));
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (userId) => {
    setSelectedUserId(userId);
    setModalMonths("");
    setModalStartDate("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUserId(null);
    setModalMonths("");
    setModalStartDate("");
  };

  const handleModalSubmit = async () => {
    if (!modalMonths || isNaN(Number(modalMonths)) || Number(modalMonths) <= 0) {
      alert("❌ Invalid input. Months must be a positive number.");
      return;
    }
    if (!modalStartDate) {
      alert("❌ Please select a start date.");
      return;
    }
    setUpdating((prev) => ({ ...prev, [selectedUserId]: true }));
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://backend-nm1z.onrender.com/api/admin/auth/users/approve/${selectedUserId}?expiry=${modalMonths}&startDate=${modalStartDate}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to update subscription.");
      fetchUsers();
      closeModal();
    } catch (err) {
      alert("Failed to update subscription: " + err.message);
    } finally {
      setUpdating((prev) => ({ ...prev, [selectedUserId]: false }));
    }
  };

  const toggleSubscription = async (userId, currentStatus) => {
    if (currentStatus) {
      setUpdating((prev) => ({ ...prev, [userId]: true }));
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://backend-nm1z.onrender.com/api/admin/auth/users/block/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to update subscription.");
        fetchUsers();
      } catch (err) {
        alert("Failed to update subscription.");
      } finally {
        setUpdating((prev) => ({ ...prev, [userId]: false }));
      }
    } else {
      openModal(userId);
    }
  };

  const handleDelete = async (userId) => {
    if (!userId) return setError("Invalid user ID");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://backend-nm1z.onrender.com/api/admin/auth/deleteuser/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      fetchUsers();
    } catch (err) {
      setError("Error deleting user: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    applyFilters(query, subscriptionFilter, sortBy, sortOrder);
  };

  const handleSubscriptionFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setSubscriptionFilter(selectedFilter);
    applyFilters(searchQuery, selectedFilter, sortBy, sortOrder);
  };

  const handleSort = (type) => {
    const newOrder = sortBy === type && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(type);
    setSortOrder(newOrder);
    applyFilters(searchQuery, subscriptionFilter, type, newOrder);
  };

  const applyFilters = (query, subFilter, type, order) => {
    let filtered = [...users];
    if (query)
      filtered = filtered.filter((u) => u.name.toLowerCase().includes(query));
    if (subFilter === "Active")
      filtered = filtered.filter((u) => u.subscriptionActive);
    else if (subFilter === "Inactive")
      filtered = filtered.filter((u) => !u.subscriptionActive);
    if (type === "alphabet")
      filtered.sort((a, b) =>
        order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    else if (type === "created")
      filtered.sort((a, b) =>
        order === "asc"
          ? new Date(a.metadata.register_date) -
            new Date(b.metadata.register_date)
          : new Date(b.metadata.register_date) -
            new Date(a.metadata.register_date)
      );
    setFilteredUsers(filtered);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
  };

  return (
    <div className="p-6 bg-gradient-to-br from-white to-[#f9fafb] shadow-xl rounded-2xl space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-sky-300"
        />

        <div className="flex flex-wrap gap-2 items-center">
          <select
            value={subscriptionFilter}
            onChange={handleSubscriptionFilterChange}
            className="px-3 py-2 border rounded-md shadow-sm"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button
            onClick={() => handleSort("alphabet")}
            className={`px-3 py-2 border rounded-md ${
              sortBy === "alphabet" ? "bg-sky-100" : ""
            }`}
          >
            Name {sortBy === "alphabet" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
          <button
            onClick={() => handleSort("created")}
            className={`px-3 py-2 border rounded-md ${
              sortBy === "created" ? "bg-sky-100" : ""
            }`}
          >
            Date {sortBy === "created" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
        </div>

        <button
          onClick={() => navigate("/add-user")}
          className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-lg shadow"
        >
          + Add User
        </button>
      </div>

      <UserStatusStats />

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Activate Subscription</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Number of Months
                </label>
                <input
                  type="number"
                  value={modalMonths}
                  onChange={(e) => setModalMonths(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-sky-300"
                  placeholder="Enter months"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  value={modalStartDate}
                  onChange={(e) => setModalStartDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-sky-300"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSubmit}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-gray-500 text-center">Loading users...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-sky-50 text-sky-700">
              <tr>
                {[
                  "Name",
                  "Age",
                  "Religion",
                  "Caste",
                  "Status",
                  "Mobile",
                  "Marital",
                  "Registered",
                  "Actions",
                ].map((h, i) => (
                  <th key={i} className="px-4 py-3 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-[#f4f6f8]"
                    } hover:bg-sky-50`}
                  >
                    <td className="px-4 py-2">{user.name || "N/A"}</td>
                    <td className="px-4 py-2">
                      {user.dob
                        ? new Date().getFullYear() -
                          new Date(user.dob).getFullYear()
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2">{user.religion || "N/A"}</td>
                    <td className="px-4 py-2">{user.caste || "N/A"}</td>
                    <td className="px-4 py-2">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={user.subscriptionActive}
                          onChange={() =>
                            toggleSubscription(
                              user._id,
                              user.subscriptionActive
                            )
                          }
                          disabled={updating[user._id]}
                        />
                        <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-green-400 relative transition-colors">
                          <div className="absolute left-1 top-0.5 w-4 h-4 bg-white rounded-full shadow transform transition-transform peer-checked:translate-x-5" />
                        </div>
                      </label>
                    </td>
                    <td className="px-4 py-2">{user.mobile || "N/A"}</td>
                    <td className="px-4 py-2">
                      {user.marital_status || "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      {user.metadata?.register_date
                        ? formatDate(user.metadata.register_date)
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2 flex flex-wrap gap-2">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded w-full"
                        onClick={() => navigate(`/edit-user/${user._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-500">
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

//

// v3
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import UserStatusStats from "./UserStatusStats";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [subscriptionFilter, setSubscriptionFilter] = useState("All");
//   const [sortBy, setSortBy] = useState("");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [updating, setUpdating] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchUsers();
//   }, []);

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
//       const response = await fetch(
//         "https://backend-nm1z.onrender.com/api/admin/auth/users",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (!response.ok)
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       const data = await response.json();
//       const updatedUsers = data.map((user) => ({
//         ...user,
//         subscriptionActive: user.status === "Approved",
//       }));
//       setUsers(updatedUsers);
//       setFilteredUsers(updatedUsers);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleSubscription = async (userId, currentStatus) => {
//     setUpdating((prev) => ({ ...prev, [userId]: true }));
//     let expiry;
//     if (!currentStatus) {
//       expiry = prompt("Number of months:");
//       const parsed = Number(expiry);
//       if (!expiry || isNaN(parsed) || parsed <= 0) {
//         alert("❌ Invalid input. Expiry must be a positive number.");
//         return;
//       } else expiry = parsed;
//     }
//     const endpoint = currentStatus
//       ? `https://backend-nm1z.onrender.com/api/admin/auth/users/block/${userId}`
//       : `https://backend-nm1z.onrender.com/api/admin/auth/users/approve/${userId}?expiry=${expiry}`;
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(endpoint, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (!response.ok) throw new Error("Failed to update subscription.");
//       fetchUsers();
//     } catch (err) {
//       alert("Failed to update subscription.");
//     } finally {
//       setUpdating((prev) => ({ ...prev, [userId]: false }));
//     }
//   };

//   const handleDelete = async (userId) => {
//     if (!userId) return setError("Invalid user ID");
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://backend-nm1z.onrender.com/api/admin/auth/deleteuser/${userId}`,
//         { method: "DELETE", headers: { "Content-Type": "application/json" } }
//       );
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message);
//       fetchUsers();
//     } catch (err) {
//       setError("Error deleting user: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
//     applyFilters(query, subscriptionFilter, sortBy, sortOrder);
//   };

//   const handleSubscriptionFilterChange = (e) => {
//     const selectedFilter = e.target.value;
//     setSubscriptionFilter(selectedFilter);
//     applyFilters(searchQuery, selectedFilter, sortBy, sortOrder);
//   };

//   const handleSort = (type) => {
//     const newOrder = sortBy === type && sortOrder === "asc" ? "desc" : "asc";
//     setSortBy(type);
//     setSortOrder(newOrder);
//     applyFilters(searchQuery, subscriptionFilter, type, newOrder);
//   };

//   const applyFilters = (query, subFilter, type, order) => {
//     let filtered = [...users];
//     if (query)
//       filtered = filtered.filter((u) => u.name.toLowerCase().includes(query));
//     if (subFilter === "Active")
//       filtered = filtered.filter((u) => u.subscriptionActive);
//     else if (subFilter === "Inactive")
//       filtered = filtered.filter((u) => !u.subscriptionActive);
//     if (type === "alphabet")
//       filtered.sort((a, b) =>
//         order === "asc"
//           ? a.name.localeCompare(b.name)
//           : b.name.localeCompare(a.name)
//       );
//     else if (type === "created")
//       filtered.sort((a, b) =>
//         order === "asc"
//           ? new Date(a.metadata.register_date) -
//             new Date(b.metadata.register_date)
//           : new Date(b.metadata.register_date) -
//             new Date(a.metadata.register_date)
//       );
//     setFilteredUsers(filtered);
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return `${String(date.getDate()).padStart(2, "0")}/${String(
//       date.getMonth() + 1
//     ).padStart(2, "0")}/${date.getFullYear()}`;
//   };

//   return (
//     <div className="p-6 bg-gradient-to-br from-white to-[#f9fafb] shadow-xl rounded-2xl space-y-6">
//       <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//         <input
//           type="text"
//           placeholder="Search by name..."
//           value={searchQuery}
//           onChange={handleSearch}
//           className="w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-sky-300"
//         />

//         <div className="flex flex-wrap gap-2 items-center">
//           <select
//             value={subscriptionFilter}
//             onChange={handleSubscriptionFilterChange}
//             className="px-3 py-2 border rounded-md shadow-sm"
//           >
//             <option value="All">All</option>
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>
//           <button
//             onClick={() => handleSort("alphabet")}
//             className={`px-3 py-2 border rounded-md ${
//               sortBy === "alphabet" ? "bg-sky-100" : ""
//             }`}
//           >
//             Name {sortBy === "alphabet" && (sortOrder === "asc" ? "↑" : "↓")}
//           </button>
//           <button
//             onClick={() => handleSort("created")}
//             className={`px-3 py-2 border rounded-md ${
//               sortBy === "created" ? "bg-sky-100" : ""
//             }`}
//           >
//             Date {sortBy === "created" && (sortOrder === "asc" ? "↑" : "↓")}
//           </button>
//         </div>

//         <button
//           onClick={() => navigate("/add-user")}
//           className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-lg shadow"
//         >
//           + Add User
//         </button>
//       </div>

//       <UserStatusStats />

//       {loading ? (
//         <p className="text-gray-500 text-center">Loading users...</p>
//       ) : error ? (
//         <p className="text-red-500 text-center">{error}</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm text-left">
//             <thead className="bg-sky-50 text-sky-700">
//               <tr>
//                 {[
//                   "Name",
//                   "Age",
//                   "Religion",
//                   "Caste",
//                   "Status",
//                   "Mobile",
//                   "Marital",
//                   "Registered",
//                   "Actions",
//                 ].map((h, i) => (
//                   <th key={i} className="px-4 py-3 whitespace-nowrap">
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {filteredUsers.length > 0 ? (
//                 filteredUsers.map((user, index) => (
//                   <tr
//                     key={user._id}
//                     className={`${
//                       index % 2 === 0 ? "bg-white" : "bg-[#f4f6f8]"
//                     } hover:bg-sky-50`}
//                   >
//                     <td className="px-4 py-2">{user.name || "N/A"}</td>
//                     <td className="px-4 py-2">
//                       {user.dob
//                         ? new Date().getFullYear() -
//                           new Date(user.dob).getFullYear()
//                         : "N/A"}
//                     </td>
//                     <td className="px-4 py-2">{user.religion || "N/A"}</td>
//                     <td className="px-4 py-2">{user.caste || "N/A"}</td>
//                     <td className="px-4 py-2">
//                       <label className="inline-flex items-center cursor-pointer">
//                         <input
//                           type="checkbox"
//                           className="sr-only peer"
//                           checked={user.subscriptionActive}
//                           onChange={() =>
//                             toggleSubscription(
//                               user._id,
//                               user.subscriptionActive
//                             )
//                           }
//                           disabled={updating[user._id]}
//                         />
//                         <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-green-400 relative transition-colors">
//                           <div className="absolute left-1 top-0.5 w-4 h-4 bg-white rounded-full shadow transform transition-transform peer-checked:translate-x-5" />
//                         </div>
//                       </label>
//                     </td>
//                     <td className="px-4 py-2">{user.mobile || "N/A"}</td>
//                     <td className="px-4 py-2">
//                       {user.marital_status || "N/A"}
//                     </td>
//                     <td className="px-4 py-2">
//                       {user.metadata?.register_date
//                         ? formatDate(user.metadata.register_date)
//                         : "N/A"}
//                     </td>
//                     <td className="px-4 py-2 flex flex-wrap gap-2">
//                       <button
//                         className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded w-full"
//                         onClick={() => navigate(`/edit-user/${user._id}`)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//                         onClick={() => handleDelete(user._id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="9" className="text-center py-6 text-gray-500">
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

//

// v2
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import UserStatusStats from "./UserStatusStats";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [subscriptionFilter, setSubscriptionFilter] = useState("All");
//   const [sortBy, setSortBy] = useState(""); // Added for sorting
//   const [sortOrder, setSortOrder] = useState("asc"); // Added for sort order
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [updating, setUpdating] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchUsers();
//   }, []);

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
//       const response = await fetch(
//         "https://backend-nm1z.onrender.com/api/admin/auth/users",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok)
//         throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();

//       const updatedUsers = data.map((user) => ({
//         ...user,
//         subscriptionActive: user.status === "Approved",
//       }));

//       setUsers(updatedUsers);
//       setFilteredUsers(updatedUsers);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleSubscription = async (userId, currentStatus) => {
//     setUpdating((prev) => ({ ...prev, [userId]: true }));

//     let expiry;
//     if (currentStatus == false) {
//       expiry = prompt("Number of months:");
//       const parsed = Number(expiry);

//       if (!expiry || isNaN(parsed) || parsed <= 0) {
//         alert("❌ Invalid input. Expiry must be a positive number.");
//       } else {
//         expiry = parsed;
//       }
//     }

//     const endpoint = currentStatus
//       ? `https://backend-nm1z.onrender.com/api/admin/auth/users/block/${userId}`
//       : `https://backend-nm1z.onrender.com/api/admin/auth/users/approve/${userId}?expiry=${expiry}`;

//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(endpoint, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok)
//         throw new Error("Failed to update subscription status.");

//       fetchUsers();
//     } catch (err) {
//       console.error("Error updating subscription status:", err);
//       alert("Failed to update subscription status.");
//     } finally {
//       setUpdating((prev) => ({ ...prev, [userId]: false }));
//     }
//   };

//   const handleDelete = async (userId) => {
//     if (!userId) {
//       setError("Please enter a valid user ID");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch(
//         `https://backend-nm1z.onrender.com/api/admin/auth/deleteuser/${userId}`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         fetchUsers();        
//         window.location.reload();
//       } else {
//         setError(data.message || "Failed to delete user");
//       }
//     } catch (err) {
//       setError("Network error: Unable to delete user");
//       console.error("Error deleting user:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (event) => {
//     const query = event.target.value.toLowerCase();
//     setSearchQuery(query);
//     applyFilters(query, subscriptionFilter, sortBy, sortOrder);
//   };

//   const handleSubscriptionFilterChange = (event) => {
//     const selectedFilter = event.target.value;
//     setSubscriptionFilter(selectedFilter);
//     applyFilters(searchQuery, selectedFilter, sortBy, sortOrder);
//   };

//   const handleSort = (sortType) => {
//     const newSortOrder =
//       sortBy === sortType && sortOrder === "asc" ? "desc" : "asc";
//     setSortBy(sortType);
//     setSortOrder(newSortOrder);
//     applyFilters(searchQuery, subscriptionFilter, sortType, newSortOrder);
//   };

//   const applyFilters = (query, subFilter, sortType, sortOrder) => {
//     let filtered = [...users];

//     if (query) {
//       filtered = filtered.filter((user) =>
//         user.name.toLowerCase().includes(query)
//       );
//     }

//     if (subFilter === "Active") {
//       filtered = filtered.filter((user) => user.subscriptionActive === true);
//     } else if (subFilter === "Inactive") {
//       filtered = filtered.filter((user) => user.subscriptionActive === false);
//     }

//     if (sortType === "alphabet") {
//       filtered.sort((a, b) => {
//         const comparison = a.name.localeCompare(b.name);
//         return sortOrder === "asc" ? comparison : -comparison;
//       });
//     } else if (sortType === "created") {
//       filtered.sort((a, b) => {
//         const dateA = new Date(a.metadata.register_date);
//         const dateB = new Date(b.metadata.register_date);
//         return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
//       });
//     }

//     setFilteredUsers(filtered);
//   };

//   return (
//     <div className="p-4 bg-white shadow-md rounded-lg">
//       <div className="flex justify-between items-center mb-4">
//         <input
//           type="text"
//           placeholder="Search user by name..."
//           value={searchQuery}
//           onChange={handleSearch}
//           className="border border-gray-300 rounded-lg px-4 py-2 w-1/3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//         />

//         <div className="flex items-center gap-2">
//           <label className="text-gray-700 font-bold">Filter & Sort:</label>
//           <select
//             value={subscriptionFilter}
//             onChange={handleSubscriptionFilterChange}
//             className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           >
//             <option value="All">All</option>
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>
//           <button
//             onClick={() => handleSort("alphabet")}
//             className={`border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
//               sortBy === "alphabet" ? "bg-blue-100" : ""
//             }`}
//           >
//             Sort by Name{" "}
//             {sortBy === "alphabet" && (sortOrder === "asc" ? "↑" : "↓")}
//           </button>
//           <button
//             onClick={() => handleSort("created")}
//             className={`border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
//               sortBy === "created" ? "bg-blue-100" : ""
//             }`}
//           >
//             Sort by Created{" "}
//             {sortBy === "created" && (sortOrder === "asc" ? "↑" : "↓")}
//           </button>
//         </div>

//         <button
//           onClick={() => navigate("/add-user")}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Add User
//         </button>
//       </div>

//       <UserStatusStats />

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
//                 <th className="py-3 px-6">Registered At</th>
//                 <th className="py-3 px-6">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredUsers.length > 0 ? (
//                 filteredUsers.map((user) => (
//                   <tr key={user._id} className="bg-white border-b">
//                     <td className="py-4 px-6">{user.name || "N/A"}</td>
//                     <td className="py-4 px-6">
//                       {user.dob
//                         ? new Date().getFullYear() -
//                           new Date(user.dob).getFullYear()
//                         : "N/A"}
//                     </td>
//                     <td className="py-4 px-6">{user.religion || "N/A"}</td>
//                     <td className="py-4 px-6">{user.caste || "N/A"}</td>
//                     <td className="py-4 px-6">
//                       <label className="relative inline-flex items-center cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={user.subscriptionActive}
//                           onChange={() =>
//                             toggleSubscription(
//                               user._id,
//                               user.subscriptionActive
//                             )
//                           }
//                           className="sr-only peer"
//                           disabled={updating[user._id]}
//                         />
//                         <div
//                           className={`w-11 h-6 rounded-full transition-all ${
//                             user.subscriptionActive
//                               ? "bg-green-500"
//                               : "bg-gray-300"
//                           }`}
//                         >
//                           <div
//                             className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform transform ${
//                               user.subscriptionActive ? "translate-x-5" : ""
//                             }`}
//                           ></div>
//                         </div>
//                       </label>
//                     </td>
//                     <td className="py-4 px-6">{user.mobile || "N/A"}</td>
//                     <td className="py-4 px-6">
//                       {user.marital_status || "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                         {/* Inline date conversion logic */}
//                         {user.metadata.register_date ?
//                             (() => {
//                                 const date = new Date(user.metadata.register_date);
//                                 if (isNaN(date.getTime())) {
//                                     return "Invalid Date";
//                                 }
//                                 const day = String(date.getUTCDate()).padStart(2, '0');
//                                 const month = String(date.getUTCMonth() + 1).padStart(2, '0');
//                                 const year = date.getUTCFullYear();
//                                 return `${day}/${month}/${year}`;
//                             })()
//                             : "N/A"
//                         }
//                     </td>
//                     <td className="py-4 px-6 flex gap-3">
//                       <button
//                         className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded"
//                         onClick={() => {
//                           console.log("user id: Users.js ", user._id);
//                           navigate(`/edit-user/${user._id}`);
//                         }}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
//                         onClick={() => handleDelete(user._id)}
//                       >
//                         Delete
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

// =========================

//v1
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

//=================

// v2
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import UserStatusStats from "./UserStatusStats";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]); // ✅ Holds the filtered list of users
//   const [searchQuery, setSearchQuery] = useState(""); // ✅ Stores search input value
//   const [subscriptionFilter, setSubscriptionFilter] = useState("All"); // ✅ Subscription Filter
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
//       const response = await fetch(
//         "https://backend-nm1z.onrender.com/api/admin/auth/users",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok)
//         throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();

//       // ✅ Ensure correct mapping of subscription status
//       const updatedUsers = data.map((user) => ({
//         ...user,
//         subscriptionActive: user.status === "Approved",
//       }));

//       setUsers(updatedUsers);
//       console.log("> users: ", updatedUsers);
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

//     let expiry;
//     if (currentStatus == false) {
//       expiry = prompt("Number of months:");
//       const parsed = Number(expiry);

//       if (!expiry || isNaN(parsed) || parsed <= 0) {
//         alert("❌ Invalid input. Expiry must be a positive number.");
//         // Optionally throw or handle it here
//       } else {
//         expiry = parsed;
//       }
//     }

//     const endpoint = currentStatus
//       ? `https://backend-nm1z.onrender.com/api/admin/auth/users/block/${userId}`
//       : `https://backend-nm1z.onrender.com/api/admin/auth/users/approve/${userId}?expiry=${expiry}`;

//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(endpoint, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok)
//         throw new Error("Failed to update subscription status.");

//       fetchUsers();
//     } catch (err) {
//       console.error("Error updating subscription status:", err);
//       alert("Failed to update subscription status.");
//     } finally {
//       setUpdating((prev) => ({ ...prev, [userId]: false }));
//     }
//   };

//   const handleDelete = async (userId) => {
//     if (!userId) {
//       setError("Please enter a valid user ID");
//       return;
//     }

//     setLoading(true);
//     setMessage("");
//     setError("");

//     try {
//       const response = await fetch(
//         `https://backend-nm1z.onrender.com/api/users/${userId}`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         setMessage(data.message || "User deleted successfully");
//       } else {
//         setError(data.message || "Failed to delete user");
//       }
//     } catch (err) {
//       setError("Network error: Unable to delete user");
//       console.error("Error deleting user:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Handle Search Input
//   const handleSearch = (event) => {
//     const query = event.target.value.toLowerCase();
//     setSearchQuery(query);
//     applyFilters(query, subscriptionFilter);
//   };

//   // ✅ Handle Subscription Filter
//   const handleSubscriptionFilterChange = (event) => {
//     const selectedFilter = event.target.value;
//     setSubscriptionFilter(selectedFilter);
//     applyFilters(searchQuery, selectedFilter);
//   };

//   // ✅ Apply Filters (Search + Subscription)
//   const applyFilters = (query, subFilter) => {
//     let filtered = users;

//     if (query) {
//       filtered = filtered.filter((user) =>
//         user.name.toLowerCase().includes(query)
//       );
//     }

//     if (subFilter === "Active") {
//       filtered = filtered.filter((user) => user.subscriptionActive === true);
//     } else if (subFilter === "Inactive") {
//       filtered = filtered.filter((user) => user.subscriptionActive === false);
//     }

//     setFilteredUsers(filtered);
//   };
//   return (
//     <div className="p-4 bg-white shadow-md rounded-lg">
//       {/* ✅ Search & Subscription Filter */}
//       <div className="flex justify-between items-center mb-4">
//         <input
//           type="text"
//           placeholder="Search user by name..."
//           value={searchQuery}
//           onChange={handleSearch}
//           className="border border-gray-300 rounded-lg px-4 py-2 w-1/3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//         />

//         {/* ✅ Sort Users Label & Subscription Filter Dropdown */}
//         <div className="flex items-center gap-2">
//           <label className="text-gray-700 font-bold">Sort Users:</label>
//           <select
//             value={subscriptionFilter}
//             onChange={handleSubscriptionFilterChange}
//             className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           >
//             <option value="All">All</option>
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>
//         </div>

//         <button
//           onClick={() => navigate("/add-user")}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Add User
//         </button>
//       </div>

//       <UserStatusStats />

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
//                       {user.dob
//                         ? new Date().getFullYear() -
//                           new Date(user.dob).getFullYear()
//                         : "N/A"}
//                     </td>
//                     <td className="py-4 px-6">{user.religion || "N/A"}</td>
//                     <td className="py-4 px-6">{user.caste || "N/A"}</td>
//                     <td className="py-4 px-6">
//                       <label className="relative inline-flex items-center cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={user.subscriptionActive}
//                           onChange={() =>
//                             toggleSubscription(
//                               user._id,
//                               user.subscriptionActive
//                             )
//                           }
//                           className="sr-only peer"
//                           disabled={updating[user._id]}
//                         />
//                         <div
//                           className={`w-11 h-6 rounded-full transition-all ${
//                             user.subscriptionActive
//                               ? "bg-green-500"
//                               : "bg-gray-300"
//                           }`}
//                         >
//                           <div
//                             className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform transform ${
//                               user.subscriptionActive ? "translate-x-5" : ""
//                             }`}
//                           ></div>
//                         </div>
//                       </label>
//                     </td>
//                     <td className="py-4 px-6">{user.mobile || "N/A"}</td>
//                     <td className="py-4 px-6">
//                       {user.marital_status || "N/A"}
//                     </td>
//                     <td className="py-4 px-6 flex gap-3">
//                       <button
//                         className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded"
//                         onClick={() => navigate(`/edit-user/${user._id}`)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
//                         onClick={() => handleDelete(user._id)}
//                       >
//                         Delete
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
