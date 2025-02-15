import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams(); // Get user ID from URL
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Unauthorized: No token found.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://backend-nm1z.onrender.com/api/admin/auth/users/${id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(`Failed to fetch user. Status: ${response.status}`);

      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const saveChanges = async () => {
    setSaving(true);
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Unauthorized: No token found.');
      setSaving(false);
      return;
    }

    try {
      const response = await fetch(`https://backend-nm1z.onrender.com/api/admin/auth/users/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error('Failed to update user.');

      navigate('/users'); // Redirect to user list
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Edit User</h2>

      {loading ? (
        <p className="text-gray-600">Loading user details...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name</label>
            <input type="text" name="name" value={userData.name} onChange={handleInputChange}
              className="w-full p-2 border rounded" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input type="email" name="email" value={userData.email} onChange={handleInputChange}
              className="w-full p-2 border rounded" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Mobile</label>
            <input type="text" name="mobile" value={userData.mobile} onChange={handleInputChange}
              className="w-full p-2 border rounded" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Gender</label>
            <select name="gender" value={userData.gender} onChange={handleInputChange}
              className="w-full p-2 border rounded">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Date of Birth</label>
            <input type="date" name="dob" value={userData.dob} onChange={handleInputChange}
              className="w-full p-2 border rounded" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Religion</label>
            <input type="text" name="religion" value={userData.religion} onChange={handleInputChange}
              className="w-full p-2 border rounded" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Marital Status</label>
            <select name="marital_status" value={userData.marital_status} onChange={handleInputChange}
              className="w-full p-2 border rounded">
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Status</label>
            <select name="status" value={userData.status} onChange={handleInputChange}
              className="w-full p-2 border rounded">
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>

          <div className="flex justify-end mt-4">
            <button onClick={() => navigate('/users')}
              className="bg-gray-500 text-white px-3 py-2 rounded mr-2">Cancel</button>
            <button onClick={saveChanges} disabled={saving}
              className="bg-blue-500 text-white px-3 py-2 rounded">
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUser;
