import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddUser = () => {
  const navigate = useNavigate();
  
  // ✅ Updated form structure
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    gender: "",
    dob: "",
    religion: "",
    marital_status: "",
    preferences: {
      preference1: "",
      preference2: "",
      preference3: "",
    }
  });

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle preference selection
  const handlePreferenceChange = (e, key) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value,
      }
    }));
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Ensure admin is logged in
      await axios.post("https://backend-nm1z.onrender.com/api/admin/auth/users/add", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });

      alert("User added successfully!");
      navigate("/users");
    } catch (error) {
      alert("Failed to add user. " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 my-10">
      <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Add User</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* ✅ Basic Information */}
        <input className="border p-3 rounded-lg w-full" type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name" />
        <input className="border p-3 rounded-lg w-full" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" />
        <input className="border p-3 rounded-lg w-full" type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Password" />
        <input className="border p-3 rounded-lg w-full" type="text" name="mobile" value={formData.mobile} onChange={handleChange} required placeholder="Mobile Number" />
        
        <select className="border p-3 rounded-lg w-full" name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input className="border p-3 rounded-lg w-full" type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        <input className="border p-3 rounded-lg w-full" type="text" name="religion" value={formData.religion} onChange={handleChange} required placeholder="Religion" />
        <input className="border p-3 rounded-lg w-full" type="text" name="marital_status" value={formData.marital_status} onChange={handleChange} required placeholder="Marital Status" />

        {/* ✅ Preferences Section */}
        <div className="col-span-2 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Preferences</h3>

          <label className="block mb-2">Preference 1</label>
          <select className="border p-3 rounded-lg w-full mb-3" value={formData.preferences.preference1} onChange={(e) => handlePreferenceChange(e, "preference1")}>
            <option value="">Select Preference</option>
            <option value="Educated">Educated</option>
            <option value="Same Religion">Same Religion</option>
            <option value="Same Caste">Same Caste</option>
          </select>

          <label className="block mb-2">Preference 2</label>
          <select className="border p-3 rounded-lg w-full mb-3" value={formData.preferences.preference2} onChange={(e) => handlePreferenceChange(e, "preference2")}>
            <option value="">Select Preference</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Smoker">Non-Smoker</option>
            <option value="Working Professional">Working Professional</option>
          </select>

          <label className="block mb-2">Preference 3</label>
          <select className="border p-3 rounded-lg w-full" value={formData.preferences.preference3} onChange={(e) => handlePreferenceChange(e, "preference3")}>
            <option value="">Select Preference</option>
            <option value="Same City">Same City</option>
            <option value="Family-Oriented">Family-Oriented</option>
            <option value="Similar Age">Similar Age</option>
          </select>
        </div>

        {/* ✅ Submit Button */}
        <div className="col-span-2 flex justify-center mt-6">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200">
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
