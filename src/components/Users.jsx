import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Edit3, 
  Trash2, 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc, 
  Users,
  Calendar,
  Phone,
  Heart,
  Shield,
  Eye,
  EyeOff,
  Loader2
} from "lucide-react";

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
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  // Mock data for demonstration
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockUsers = [
        {
          _id: "1",
          name: "John Doe",
          dob: "1990-05-15",
          religion: "Christianity",
          caste: "General",
          mobile: "+1234567890",
          marital_status: "Single",
          status: "Approved",
          subscriptionActive: true,
          metadata: { register_date: "2024-01-15" }
        },
        {
          _id: "2",
          name: "Jane Smith",
          dob: "1985-08-20",
          religion: "Hinduism",
          caste: "OBC",
          mobile: "+1234567891",
          marital_status: "Married",
          status: "Pending",
          subscriptionActive: false,
          metadata: { register_date: "2024-02-10" }
        },
        {
          _id: "3",
          name: "Mike Johnson",
          dob: "1992-12-03",
          religion: "Islam",
          caste: "SC",
          mobile: "+1234567892",
          marital_status: "Single",
          status: "Approved",
          subscriptionActive: true,
          metadata: { register_date: "2024-03-05" }
        }
      ];
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    return new Date().getFullYear() - new Date(dob).getFullYear();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const toggleSubscription = async (userId, currentStatus) => {
    setUpdating((prev) => ({ ...prev, [userId]: true }));
    
    // Simulate API call
    setTimeout(() => {
      setUsers(prev => prev.map(user => 
        user._id === userId 
          ? { ...user, subscriptionActive: !currentStatus }
          : user
      ));
      setFilteredUsers(prev => prev.map(user => 
        user._id === userId 
          ? { ...user, subscriptionActive: !currentStatus }
          : user
      ));
      setUpdating((prev) => ({ ...prev, [userId]: false }));
    }, 500);
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setUsers(prev => prev.filter(user => user._id !== userId));
        setFilteredUsers(prev => prev.filter(user => user._id !== userId));
        setLoading(false);
      }, 500);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    applyFilters(query, subscriptionFilter, sortBy, sortOrder);
  };

  const handleSubscriptionFilterChange = (selectedFilter) => {
    setSubscriptionFilter(selectedFilter);
    applyFilters(searchQuery, selectedFilter, sortBy, sortOrder);
  };

  const handleSort = (sortType) => {
    const newSortOrder = sortBy === sortType && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(sortType);
    setSortOrder(newSortOrder);
    applyFilters(searchQuery, subscriptionFilter, sortType, newSortOrder);
  };

  const applyFilters = (query, subFilter, sortType, sortOrder) => {
    let filtered = [...users];

    if (query) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(query) ||
        user.mobile.includes(query) ||
        user.religion.toLowerCase().includes(query)
      );
    }

    if (subFilter === "Active") {
      filtered = filtered.filter((user) => user.subscriptionActive === true);
    } else if (subFilter === "Inactive") {
      filtered = filtered.filter((user) => user.subscriptionActive === false);
    }

    if (sortType === "alphabet") {
      filtered.sort((a, b) => {
        const comparison = a.name.localeCompare(b.name);
        return sortOrder === "asc" ? comparison : -comparison;
      });
    } else if (sortType === "created") {
      filtered.sort((a, b) => {
        const dateA = new Date(a.metadata.register_date);
        const dateB = new Date(b.metadata.register_date);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
    }

    setFilteredUsers(filtered);
  };

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      <span className="ml-3 text-gray-600 font-medium">Loading users...</span>
    </div>
  );

  const ErrorMessage = ({ message }) => (
    <div className="flex items-center justify-center py-12">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 font-semibold mb-2">Error</div>
        <div className="text-red-700">{message}</div>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <Users className="w-16 h-16 text-gray-300 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
      <p className="text-gray-500 text-center max-w-md">
        Try adjusting your search criteria or filters to find what you're looking for.
      </p>
    </div>
  );

  const StatusBadge = ({ active }) => (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
      active 
        ? 'bg-green-100 text-green-800 border border-green-200' 
        : 'bg-gray-100 text-gray-800 border border-gray-200'
    }`}>
      <div className={`w-2 h-2 rounded-full mr-2 ${active ? 'bg-green-500' : 'bg-gray-400'}`} />
      {active ? 'Active' : 'Inactive'}
    </div>
  );

  const ActionButton = ({ onClick, variant, children, disabled }) => {
    const baseClasses = "inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    const variants = {
      edit: "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 focus:ring-amber-500",
      delete: "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 focus:ring-red-500"
    };

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">User Management</h1>
              <p className="text-gray-600">Manage and monitor user accounts</p>
            </div>
            <button
              onClick={() => navigate("/add-user")}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <User className="w-4 h-4 mr-2" />
              Add User
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, phone, or religion..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {showFilters ? <EyeOff className="w-4 h-4 ml-2" /> : <Eye className="w-4 h-4 ml-2" />}
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-4">
                {/* Subscription Filter */}
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Status:</label>
                  <select
                    value={subscriptionFilter}
                    onChange={(e) => handleSubscriptionFilterChange(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="All">All Users</option>
                    <option value="Active">Active Only</option>
                    <option value="Inactive">Inactive Only</option>
                  </select>
                </div>

                {/* Sort Options */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSort("alphabet")}
                    className={`inline-flex items-center px-3 py-2 text-sm border rounded-lg transition-colors ${
                      sortBy === "alphabet" 
                        ? "bg-blue-50 border-blue-200 text-blue-700" 
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    Name
                    {sortBy === "alphabet" && (
                      sortOrder === "asc" ? <SortAsc className="w-4 h-4 ml-1" /> : <SortDesc className="w-4 h-4 ml-1" />
                    )}
                  </button>
                  <button
                    onClick={() => handleSort("created")}
                    className={`inline-flex items-center px-3 py-2 text-sm border rounded-lg transition-colors ${
                      sortBy === "created" 
                        ? "bg-blue-50 border-blue-200 text-blue-700" 
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    Date
                    {sortBy === "created" && (
                      sortOrder === "asc" ? <SortAsc className="w-4 h-4 ml-1" /> : <SortDesc className="w-4 h-4 ml-1" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : filteredUsers.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">User</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Details</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Registered</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-900 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {user.name?.charAt(0) || "U"}
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-semibold text-gray-900">{user.name || "N/A"}</div>
                              <div className="text-sm text-gray-500">Age: {calculateAge(user.dob)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{user.religion || "N/A"}</div>
                          <div className="text-sm text-gray-500">{user.caste || "N/A"}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-sm text-gray-900 mb-1">
                            <Phone className="w-4 h-4 mr-2 text-gray-400" />
                            {user.mobile || "N/A"}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Heart className="w-4 h-4 mr-2 text-gray-400" />
                            {user.marital_status || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-between">
                            <StatusBadge active={user.subscriptionActive} />
                            <label className="relative inline-flex items-center cursor-pointer ml-3">
                              <input
                                type="checkbox"
                                checked={user.subscriptionActive}
                                onChange={() => toggleSubscription(user._id, user.subscriptionActive)}
                                className="sr-only peer"
                                disabled={updating[user._id]}
                              />
                              <div className={`w-11 h-6 rounded-full transition-all duration-300 ${
                                user.subscriptionActive ? "bg-green-500" : "bg-gray-300"
                              } ${updating[user._id] ? "opacity-50" : ""}`}>
                                <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                                  user.subscriptionActive ? "translate-x-5" : ""
                                }`} />
                              </div>
                            </label>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-sm text-gray-900">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            {formatDate(user.metadata?.register_date)}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <ActionButton
                              onClick={() => navigate(`/edit-user/${user._id}`)}
                              variant="edit"
                            >
                              <Edit3 className="w-4 h-4 mr-1" />
                              Edit
                            </ActionButton>
                            <ActionButton
                              onClick={() => handleDelete(user._id)}
                              variant="delete"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </ActionButton>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <div key={user._id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name?.charAt(0) || "U"}
                        </div>
                        <div className="ml-3">
                          <div className="text-lg font-semibold text-gray-900">{user.name || "N/A"}</div>
                          <div className="text-sm text-gray-500">Age: {calculateAge(user.dob)}</div>
                        </div>
                      </div>
                      <StatusBadge active={user.subscriptionActive} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Religion</div>
                        <div className="text-sm text-gray-900">{user.religion || "N/A"}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Caste</div>
                        <div className="text-sm text-gray-900">{user.caste || "N/A"}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Phone</div>
                        <div className="text-sm text-gray-900">{user.mobile || "N/A"}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Marital Status</div>
                        <div className="text-sm text-gray-900">{user.marital_status || "N/A"}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(user.metadata?.register_date)}
                      </div>
                      <div className="flex gap-2">
                        <ActionButton
                          onClick={() => navigate(`/edit-user/${user._id}`)}
                          variant="edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </ActionButton>
                        <ActionButton
                          onClick={() => handleDelete(user._id)}
                          variant="delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </ActionButton>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm font-medium text-gray-700">Subscription</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={user.subscriptionActive}
                          onChange={() => toggleSubscription(user._id, user.subscriptionActive)}
                          className="sr-only peer"
                          disabled={updating[user._id]}
                        />
                        <div className={`w-11 h-6 rounded-full transition-all duration-300 ${
                          user.subscriptionActive ? "bg-green-500" : "bg-gray-300"
                        } ${updating[user._id] ? "opacity-50" : ""}`}>
                          <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                            user.subscriptionActive ? "translate-x-5" : ""
                          }`} />
                        </div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      </div>
    </div>
  );
};

export default Users;

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
