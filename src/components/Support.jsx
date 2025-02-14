import React, { useState } from 'react';

const Support = () => {
  const [queries, setQueries] = useState([
    { id: 1, name: 'John Doe', mobile: '123-456-7890', query: 'How do I update my profile?' },
    { id: 2, name: 'Jane Smith', mobile: '123-456-7891', query: 'Payment issue with the subscription renewal.' },
    { id: 3, name: 'Emily Doe', mobile: '123-456-7892', query: 'Need help with account settings.' }
  ]);

  const handleResolve = (id) => {
    setQueries(queries.filter(query => query.id !== id));
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Customer Support</h1>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">Name</th>
              <th scope="col" className="py-3 px-6">Mobile Number</th>
              <th scope="col" className="py-3 px-6">Query</th>
              <th scope="col" className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((query) => (
              <tr key={query.id} className="bg-white border-b">
                <td className="py-4 px-6">{query.name}</td>
                <td className="py-4 px-6">{query.mobile}</td>
                <td className="py-4 px-6">{query.query}</td>
                <td className="py-4 px-6">
                  <button onClick={() => handleResolve(query.id)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Resolve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Support;
