import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers([
      { id: 1, name: 'John Doe', age: 30, religion: 'Christianity', caste: 'Caste1', subscriptionActive: true, mobile: '123-456-7890' },
      { id: 2, name: 'Jane Doe', age: 25, religion: 'Hinduism', caste: 'Caste2', subscriptionActive: false, mobile: '123-456-7891' },
      { id: 3, name: 'Jim Beam', age: 35, religion: 'Islam', caste: 'Caste3', subscriptionActive: true, mobile: '123-456-7892' },
      { id: 4, name: 'Jim Beam', age: 35, religion: 'Islam', caste: 'Caste3', subscriptionActive: true, mobile: '123-456-7892' },
      { id: 5, name: 'Jim Beam', age: 35, religion: 'Islam', caste: 'Caste3', subscriptionActive: true, mobile: '123-456-7892' },
      { id: 6, name: 'Jim Beam', age: 35, religion: 'Islam', caste: 'Caste3', subscriptionActive: true, mobile: '123-456-7892' },
      { id: 7, name: 'Jim Beam', age: 35, religion: 'Islam', caste: 'Caste3', subscriptionActive: true, mobile: '123-456-7892' },
      { id: 8, name: 'Jim Beam', age: 35, religion: 'Islam', caste: 'Caste3', subscriptionActive: true, mobile: '123-456-7892' },
      { id: 9, name: 'Jim Beam', age: 35, religion: 'Islam', caste: 'Caste3', subscriptionActive: true, mobile: '123-456-7892' },
      { id: 10, name: 'Jim Beam', age: 35, religion: 'Islam', caste: 'Caste3', subscriptionActive: true, mobile: '123-456-7892' },
      { id: 11, name: 'Jim Beam', age: 35, religion: 'Islam', caste: 'Caste3', subscriptionActive: true, mobile: '123-456-7892' },
      { id: 12, name: 'Jim Beam', age: 35, religion: 'Islam', caste: 'Caste3', subscriptionActive: true, mobile: '123-456-7892' },
      { id: 13, name: 'Jim Beam', age: 35, religion: 'Islam', caste: 'Caste3', subscriptionActive: true, mobile: '123-456-7892' },
      { id: 14, name: 'Jim Beam', age: 35, religion: 'Islam', caste: 'Caste3', subscriptionActive: true, mobile: '123-456-7892' },
      { id: 15, name: 'Jim Beam', age: 35, religion: 'Islam', caste: 'Caste3', subscriptionActive: true, mobile: '123-456-7892' },
      { id: 16, name: 'Jim Beam', age: 35, religion: 'Islam', caste: 'Caste3', subscriptionActive: true, mobile: '123-456-7892' },
      { id: 17, name: 'Jim Beam', age: 35, religion: 'Islam', caste: 'Caste3', subscriptionActive: true, mobile: '123-456-7892' },
      { id: 18, name: 'Jim Beam', age: 35, religion: 'Islam', caste: 'Caste3', subscriptionActive: true, mobile: '123-456-7892' },
      { id: 19, name: 'Jim Beam', age: 35, religion: 'Islam', caste: 'Caste3', subscriptionActive: true, mobile: '123-456-7892' },
      { id: 20, name: 'Jim Beam', age: 35, religion: 'Islam', caste: 'Caste3', subscriptionActive: true, mobile: '123-456-7892' },
      { id: 21, name: 'Jim Beam', age: 35, religion: 'Islam', caste: 'Caste3', subscriptionActive: true, mobile: '123-456-7892' },
      { id: 22, name: 'Jim Beam', age: 35, religion: 'Islam', caste: 'Caste3', subscriptionActive: true, mobile: '123-456-7892' },
      { id: 3, name: 'Jim Beam', age: 35, religion: 'Islam', caste: 'Caste3', subscriptionActive: true, mobile: '123-456-7892' },
      { id: 3, name: 'Jim Beam', age: 35, religion: 'Islam', caste: 'Caste3', subscriptionActive: true, mobile: '123-456-7892' },
      { id: 3, name: 'Jim Beam', age: 35, religion: 'Islam', caste: 'Caste3', subscriptionActive: true, mobile: '123-456-7892' },
      { id: 3, name: 'Jim Beam', age: 35, religion: 'Islam', caste: 'Caste3', subscriptionActive: true, mobile: '123-456-7892' },
      { id: 3, name: 'Jim Beam', age: 35, religion: 'Islam', caste: 'Caste3', subscriptionActive: true, mobile: '123-456-7892' },
      { id: 3, name: 'Jim Beam', age: 35, religion: 'Islam', caste: 'Caste3', subscriptionActive: true, mobile: '123-456-7892' },
      { id: 3, name: 'Jim Beam', age: 35, religion: 'Islam', caste: 'Caste3', subscriptionActive: true, mobile: '123-456-7892' },
    ]);
  }, []);

  const toggleSubscription = id => {
    setUsers(users.map(user => {
      if (user.id === id) {
        return { ...user, subscriptionActive: !user.subscriptionActive };
      }
      return user;
    }));
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add User
        </button>
        <select
          className="form-select block w-1/5 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          defaultValue="All"
        >
          <option>All Users</option>
          <option>Active Users</option>
          <option>Deactive Users</option>
        </select>
      </div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">Name</th>
              <th scope="col" className="py-3 px-6">Age</th>
              <th scope="col" className="py-3 px-6">Religion</th>
              <th scope="col" className="py-3 px-6">Caste</th>
              <th scope="col" className="py-3 px-6">Subscription Active</th>
              <th scope="col" className="py-3 px-6">Mobile Number</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="bg-white border-b">
                <td className="py-4 px-6">{user.name}</td>
                <td className="py-4 px-6">{user.age}</td>
                <td className="py-4 px-6">{user.religion}</td>
                <td className="py-4 px-6">{user.caste}</td>
                <td className="py-4 px-6">
                  <label className="switch">
                    <input type="checkbox" checked={user.subscriptionActive} onChange={() => toggleSubscription(user.id)} />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td className="py-4 px-6">{user.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
