import React, { useState, useEffect } from "react";
import Modal from "./Modal"; // Ensure the correct path

const Creatives = () => {
  const [themeColor, setThemeColor] = useState("#0056b3");
  const [banner, setBanner] = useState("");
  const [font, setFont] = useState("Sans-serif");
  const [layout, setLayout] = useState("Standard");
  const [testimonials, setTestimonials] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = () => {
    fetch("https://backend-nm1z.onrender.com/api/testimonials/all")
      .then((response) => response.json())
      .then((data) => setTestimonials(data))
      .catch((error) => console.log("Error fetching testimonials:", error));
  };

  const handleThemeColorChange = (e) => {
    setThemeColor(e.target.value);
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (r) => {
      setBanner(r.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Creative settings updated!");
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this testimonial?");
    if (confirmDelete) {
      fetch(`https://backend-nm1z.onrender.com/api/testimonials/delete/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => {
          alert("Testimonial deleted successfully!");
          fetchTestimonials(); // Refresh testimonials after deletion
        })
        .catch((error) => console.log("Error deleting testimonial:", error));
    }
  };

  const handleAddNew = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    fetchTestimonials(); // Refresh testimonials list after adding a new one
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Creative Settings</h1>
      

      <button onClick={handleAddNew} className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Add New
      </button>

      {showModal && <Modal title="Add New Testimonial" onClose={handleCloseModal} />}

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Testimonials</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="border px-8 py-4">User Name</th>
              <th className="border px-8 py-4">Message</th>
              <th className="border px-8 py-4">Image</th>
              <th className="border px-8 py-4">Date</th>
              <th className="border px-8 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((testimonial, index) => (
              <tr key={index}>
                <td className="border px-8 py-4">{testimonial.user_name}</td>
                <td className="border px-8 py-4">{testimonial.message}</td>
                <td className="border px-8 py-4">
                  <img
                    src={testimonial.image_url || `https://backend-nm1z.onrender.com${testimonial.image}`}
                    alt="Testimonial"
                    className="h-20 w-20 object-cover rounded-full"
                  />
                </td>
                <td className="border px-8 py-4">{new Date(testimonial.created_at).toLocaleDateString()}</td>
                <td className="border px-8 py-4 flex justify-center">
                  <button
                    onClick={() => handleDelete(testimonial._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Delete
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

export default Creatives;
