import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CouponsPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form states
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: 0,
    isActive: true,
  });

  // API URL
  const API_URL = 'https://backend-nm1z.onrender.com/api/coupons';

  // Get auth token - You'll need to implement how you store/retrieve your auth token
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token'); // Adjust based on your auth implementation
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // Fetch all coupons
  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, getAuthHeaders());
      setCoupons(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch coupons. Please try again.');
      console.error('Error fetching coupons:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new coupon
  const createCoupon = async () => {
    try {
      setLoading(true);
      await axios.post(API_URL, formData, getAuthHeaders());
      resetForm();
      setIsAddFormVisible(false);
      fetchCoupons();
    } catch (err) {
      setError('Failed to create coupon. Please try again.');
      console.error('Error creating coupon:', err);
      setLoading(false);
    }
  };

  // Update a coupon
  const updateCoupon = async () => {
    if (!currentCoupon) return;
    
    try {
      setLoading(true);
      await axios.put(
        `${API_URL}/${currentCoupon._id}`,
        formData,
        getAuthHeaders()
      );
      resetForm();
      setIsEditFormVisible(false);
      setCurrentCoupon(null);
      fetchCoupons();
    } catch (err) {
      setError('Failed to update coupon. Please try again.');
      console.error('Error updating coupon:', err);
      setLoading(false);
    }
  };

  // Delete a coupon
  const deleteCoupon = async (id) => {
    if (!window.confirm('Are you sure you want to delete this coupon?')) return;
    
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
      fetchCoupons();
    } catch (err) {
      setError('Failed to delete coupon. Please try again.');
      console.error('Error deleting coupon:', err);
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Prepare for editing a coupon
  const handleEdit = (coupon) => {
    setCurrentCoupon(coupon);
    setFormData({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      isActive: coupon.isActive,
    });
    setIsEditFormVisible(true);
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      code: '',
      discountType: 'percentage',
      discountValue: 0,
      isActive: true,
    });
  };

  // Load coupons on component mount
  useEffect(() => {
    fetchCoupons();
  }, []);

  // Form submission handlers
  const handleAddSubmit = (e) => {
    e.preventDefault();
    createCoupon();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateCoupon();
  };

  return (
    <div className="pl-0 pr-6 pt-6 pb-6 ml-6"> {/* Removed left padding, kept right padding */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Coupons Management</h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-md"
          onClick={() => {
            resetForm();
            setIsAddFormVisible(true);
          }}
        >
          Add New Coupon
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Add Coupon Form */}
      {isAddFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Coupon</h2>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsAddFormVisible(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="code">
                  Coupon Code
                </label>
                <input
                  className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  id="code"
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., SUMMER25"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="discountType">
                  Discount Type
                </label>
                <select
                  className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  id="discountType"
                  name="discountType"
                  value={formData.discountType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="discountValue">
                  Discount Value
                </label>
                <input
                  className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  id="discountValue"
                  type="number"
                  min="0"
                  name="discountValue"
                  value={formData.discountValue}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-gray-700 text-sm font-medium">Active</span>
                </label>
              </div>
              <div className="flex items-center justify-between mt-6">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add Coupon'}
                </button>
                <button
                  className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none"
                  type="button"
                  onClick={() => setIsAddFormVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Coupon Form */}
      {isEditFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Coupon</h2>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsEditFormVisible(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="edit-code">
                  Coupon Code
                </label>
                <input
                  className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  id="edit-code"
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="edit-discountType">
                  Discount Type
                </label>
                <select
                  className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  id="edit-discountType"
                  name="discountType"
                  value={formData.discountType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="edit-discountValue">
                  Discount Value
                </label>
                <input
                  className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  id="edit-discountValue"
                  type="number"
                  min="0"
                  name="discountValue"
                  value={formData.discountValue}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-gray-700 text-sm font-medium">Active</span>
                </label>
              </div>
              <div className="flex items-center justify-between mt-6">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Coupon'}
                </button>
                <button
                  className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none"
                  type="button"
                  onClick={() => setIsEditFormVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Coupons Table */}
      <div className="bg-white rounded-md overflow-hidden shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                CODE
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                DISCOUNT TYPE
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                DISCOUNT VALUE
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                STATUS
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && !coupons.length ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  Loading coupons...
                </td>
              </tr>
            ) : error && !coupons.length ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : !coupons.length ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  No coupons found. Add a new coupon to get started.
                </td>
              </tr>
            ) : (
              coupons.map((coupon) => (
                <tr key={coupon._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium">{coupon.code}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="capitalize">{coupon.discountType}</div>
                  </td>
                  <td className="px-6 py-4">
                    {coupon.discountType === 'percentage'
                      ? `${coupon.discountValue}%`
                      : `$${coupon.discountValue}`}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        coupon.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {coupon.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEdit(coupon)}
                      className="text-blue-600 font-medium mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCoupon(coupon._id)}
                      className="text-red-600 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CouponsPage;