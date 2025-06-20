import React, { useState, useEffect } from "react";
import axios from "axios";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    user_name: "",
    message: "",
    ratings: "",
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const backendUrl = "https://backend-nm1z.onrender.com/api/review";

  // Fetch all reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${backendUrl}/all`);
      setReviews(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch reviews");
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.user_name || !formData.message || !formData.ratings) {
      setError("All fields are required");
      return;
    }

    try {
      if (editId) {
        // Update review
        const response = await axios.put(
          `${backendUrl}/edit/${editId}`,
          formData
        );
        setSuccess("Review updated successfully");
        setEditId(null);
      } else {
        // Add new review
        const response = await axios.post(`${backendUrl}/add`, formData);
        setSuccess("Review added successfully");
      }
      setFormData({ user_name: "", message: "", ratings: "" });
      fetchReviews();
    } catch (err) {
      setError(err.response?.data?.error || "Server error");
      console.error(err);
    }
  };

  const handleEdit = (review) => {
    setFormData({
      user_name: review.user_name,
      message: review.message,
      ratings: review.ratings,
    });
    setEditId(review._id);
    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(`${backendUrl}/${id}`);
      setSuccess("Review deleted successfully");
      fetchReviews();
    } catch (err) {
      setError(err.response?.data?.error || "Server error");
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Admin Review Management
      </h1>

      {/* Form for Adding/Editing Review */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Edit Review" : "Add New Review"}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              User Name
            </label>
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter user name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter review message"
              rows="4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ratings (1-5)
            </label>
            <input
              type="number"
              name="ratings"
              value={formData.ratings}
              onChange={handleInputChange}
              min="1"
              max="5"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter rating"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            {editId ? "Update Review" : "Add Review"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setFormData({ user_name: "", message: "", ratings: "" });
              }}
              className="w-full bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition mt-2"
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      {/* Review List */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">All Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews available</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="border border-gray-200 rounded-lg p-4 flex justify-between items-start"
              >
                <div>
                  <h3 className="text-lg font-medium">{review.user_name}</h3>
                  <p className="text-gray-600">{review.message}</p>
                  <p className="text-sm text-gray-500">
                    Rating: {review.ratings}/5
                  </p>
                  <p className="text-sm text-gray-500">
                    Created: {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(review)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
