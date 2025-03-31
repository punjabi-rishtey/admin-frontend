import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('https://backend-nm1z.onrender.com/api/admin/auth/subscriptions', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        setPayments(response.data.subscriptions);
      } else {
        setError('Failed to fetch payment data');
      }
    } catch (err) {
      setError('Error connecting to the server. Please try again.');
      console.error('Error fetching payments:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const viewDetails = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPayment(null);
  };

  return (
    <div className="pl-0 pr-6 pt-6 pb-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payment Requests</h1>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-2">Loading payment data...</p>
        </div>
      ) : (
        <div className="bg-white rounded-md overflow-hidden shadow">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  USER NAME
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  PHONE NUMBER
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  COUPON CODE
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  DISCOUNT
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  CREATED AT
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  EXPIRES AT
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    No payment requests found.
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium">{payment.fullName}</div>
                      <div className="text-sm text-gray-500">{payment.user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      {payment.phoneNumber}
                    </td>
                    <td className="px-6 py-4">
                      {payment.couponCode || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {payment.discountAmount > 0 ? `₹${payment.discountAmount}` : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {formatDate(payment.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      {formatDate(payment.expiresAt)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => viewDetails(payment)}
                        className="text-blue-600 font-medium hover:text-blue-800"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Payment Details Modal */}
      {isModalOpen && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Payment Details</h2>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">User Information</h3>
                <p><span className="font-medium">Name:</span> {selectedPayment.fullName}</p>
                <p><span className="font-medium">Email:</span> {selectedPayment.user.email}</p>
                <p><span className="font-medium">Phone:</span> {selectedPayment.phoneNumber}</p>
                <p><span className="font-medium">User Account:</span> {selectedPayment.user.name}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Payment Information</h3>
                <p><span className="font-medium">Created:</span> {formatDate(selectedPayment.createdAt)}</p>
                <p><span className="font-medium">Expires:</span> {formatDate(selectedPayment.expiresAt)}</p>
                <p><span className="font-medium">Coupon:</span> {selectedPayment.couponCode || "None used"}</p>
                <p><span className="font-medium">Discount:</span> {selectedPayment.discountAmount > 0 ? `₹${selectedPayment.discountAmount}` : "No discount"}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Payment Screenshot</h3>
              <div className="flex justify-center border rounded-lg p-2">
                <img 
                  src={selectedPayment.screenshotUrl} 
                  alt="Payment Screenshot" 
                  className="max-h-96 object-contain"
                />
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;