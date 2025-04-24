// components/UserStats.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const STATUSES = ["Total", "Approved", "Pending", "Expired", "Canceled"];

const UserStatusStats = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized: No token found. Please log in.");
        setLoading(false);
        return;
      }
      try {
        const results = await Promise.all(
          STATUSES.map(async (status) => {
            const res = await axios.get(
              `https://backend-nm1z.onrender.com/api/admin/auth/users/${status}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            return { status, count: res.data.length };
          })
        );

        const formattedStats = results.reduce((acc, curr) => {
          acc[curr.status] = curr.count;
          return acc;
        }, {});

        setStats(formattedStats);
        setLoading(false);
      } catch (err) {
        setError("Failed to load user stats");
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="text-center p-4">Loading Stats...</div>;
  if (error) return <div className="text-center text-red-600 p-4">{error}</div>;

  return (
    <div className="  bg-white rounded-lg p-2 my-6">
      <h2 className="text-lg font-semibold mb-4 ">User Statistics</h2>
      <div className="space-y2 flex gap-4 flex-wrap">
        {STATUSES.map((status) => (
          <div
            key={status}
            className="flex gap-4 justify-between border-b py-1 text-gray-700 bg-gray-50 shadow-md p-2"
          >
            <span>{status}:</span>
            <span>{stats[status] || 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStatusStats;
