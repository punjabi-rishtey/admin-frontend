import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Unauthorized: No token found. Please log in.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://backend-nm1z.onrender.com/api/admin/auth/users', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();

      // Ensure correct mapping of subscription status
      const updatedUsers = data.map(user => ({
        ...user,
        subscriptionActive: user.status === "Approved", // Ensure boolean value based on `status`
      }));

      setUsers(updatedUsers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSubscription = async (userId, currentStatus) => {
    setUpdating(prev => ({ ...prev, [userId]: true }));

    const endpoint = currentStatus
      ? `https://backend-nm1z.onrender.com/api/admin/auth/users/block/${userId}`
      : `https://backend-nm1z.onrender.com/api/admin/auth/users/approve/${userId}`;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to update subscription status.');

      fetchUsers();
    } catch (err) {
      console.error('Error updating subscription status:', err);
      alert('Failed to update subscription status.');
    } finally {
      setUpdating(prev => ({ ...prev, [userId]: false }));
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add User
        </button>
      </div>

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
              {users.map(user => (
                <tr key={user._id} className="bg-white border-b">
                  <td className="py-4 px-6">{user.name || 'N/A'}</td>
                  <td className="py-4 px-6">
                    {user.dob ? new Date().getFullYear() - new Date(user.dob).getFullYear() : 'N/A'}
                  </td>
                  <td className="py-4 px-6">{user.religion || 'N/A'}</td>
                  <td className="py-4 px-6">{user.caste || 'N/A'}</td>
                  <td className="py-4 px-6">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={user.subscriptionActive}
                        onChange={() => toggleSubscription(user._id, user.subscriptionActive)}
                        className="sr-only peer"
                        disabled={updating[user._id]}
                      />
                      <div className={`w-11 h-6 rounded-full transition-all ${user.subscriptionActive ? 'bg-green-500' : 'bg-gray-300'}`}>
                        <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform transform ${user.subscriptionActive ? 'translate-x-5' : ''}`}></div>
                      </div>
                    </label>
                  </td>
                  <td className="py-4 px-6">{user.mobile || 'N/A'}</td>
                  <td className="py-4 px-6">{user.marital_status || 'N/A'}</td>
                  <td className="py-4 px-6">
                    <button 
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded"
                      onClick={() => navigate(`/edit-user/${user._id}`)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
