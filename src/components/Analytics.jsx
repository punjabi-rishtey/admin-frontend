import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const Analytics = () => {
  const [data, setData] = useState({
    userStats: [
      { name: 'Active', value: 240 },
      { name: 'Inactive', value: 100 }
    ],
    registrationStats: [
      { name: 'Jan', registrations: 20 },
      { name: 'Feb', registrations: 30 },
      { name: 'Mar', registrations: 45 },
      { name: 'Apr', registrations: 60 },
      { name: 'May', registrations: 80 }
    ]
  });

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Site Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* User Activity Pie Chart */}
        <div className="p-4 bg-gray-50 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">User Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie dataKey="value" isAnimationActive={false} data={data.userStats} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                {data.userStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Monthly Registrations Bar Chart */}
        <div className="p-4 bg-gray-50 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">Monthly Registrations</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.registrationStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="registrations" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
