import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Support = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const token = localStorage.getItem('token'); // Adjust based on storage method
        const response = await axios.get('https://backend-nm1z.onrender.com/api/admin/auth/inquiries/all', {
          headers: {
            Authorization: `Bearer ${token}` // Ensure your API expects "Bearer" format
          }
        });
        setQueries(response.data); // Assuming response.data is an array
      } catch (error) {
        setError('Failed to load inquiries.');
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  const handleResolve = (id) => {
    setQueries(queries.filter(query => query._id !== id));
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Customer Support</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading inquiries...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Phone</th>
                <th className="py-3 px-6">Subject</th>
                <th className="py-3 px-6">Message</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {queries.map((query) => (
                <tr key={query._id} className="bg-white border-b">
                  <td className="py-4 px-6">{query.name}</td>
                  <td className="py-4 px-6">{query.email}</td>
                  <td className="py-4 px-6">{query.phone}</td>
                  <td className="py-4 px-6">{query.subject}</td>
                  <td className="py-4 px-6">{query.message}</td>
                  <td className="py-4 px-6">{new Date(query.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 px-6">
                    <button onClick={() => handleResolve(query._id)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                      Resolve
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

export default Support;
