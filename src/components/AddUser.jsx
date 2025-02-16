import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    gender: "",
    dob: "",
    religion: "",
    marital_status: "",
    height: "",
    caste: "",
    location: { city: "", pincode: "" },
    hobbies: "",
    mangalik: false,
    language: "",
    birth_details: { birth_time: "", birth_place: "" },
    physical_attributes: { skin_tone: "", body_type: "", physical_disability: false, disability_reason: "" },
    lifestyle: { smoke: false, drink: false, veg_nonveg: "", nri_status: false },
    family_details: { 
      family_value: "", 
      family_size: 0, 
      mother: { name: "", occupation: "" }, 
      father: { name: "", occupation: "" }, 
      siblings: { brother_count: 0, sister_count: 0 } 
    },
    profession_details: { occupation: "", designation: "", working_with: "", working_as: "", income: "", work_address: "" },
    education_details: { education_level: "", education_field: "", qualification_details: "" },
    astrology_details: { rashi_nakshatra: "", gotra: "", gotra_mama: "" }
  });

  // Handle change for simple input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle change for nested objects
  const handleNestedChange = (e, parentKey, childKey) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [childKey]: value
      }
    }));
  };

  // Handle change for boolean checkboxes
  const handleBooleanChange = (e, key) => {
    setFormData((prev) => ({ ...prev, [key]: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
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
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add New User</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        
        {/* Basic Info */}
        <input className="border p-2" type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input className="border p-2" type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input className="border p-2" type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input className="border p-2" type="text" name="mobile" placeholder="Mobile" onChange={handleChange} required />
        <select className="border p-2" name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input className="border p-2" type="date" name="dob" onChange={handleChange} required />
        <input className="border p-2" type="text" name="religion" placeholder="Religion" onChange={handleChange} required />
        <input className="border p-2" type="text" name="marital_status" placeholder="Marital Status" onChange={handleChange} required />
        <input className="border p-2" type="text" name="height" placeholder="Height" onChange={handleChange} required />
        <input className="border p-2" type="text" name="caste" placeholder="Caste" onChange={handleChange} required />

        {/* Location */}
        <input className="border p-2" type="text" placeholder="City" onChange={(e) => handleNestedChange(e, "location", "city")} required />
        <input className="border p-2" type="text" placeholder="Pincode" onChange={(e) => handleNestedChange(e, "location", "pincode")} required />

        {/* Hobbies */}
        <input className="border p-2" type="text" name="hobbies" placeholder="Hobbies (comma-separated)" onChange={handleChange} required />

        {/* Lifestyle */}
        <label className="flex items-center space-x-2">
          <input type="checkbox" onChange={(e) => handleBooleanChange(e, "mangalik")} /> Mangalik
        </label>
        <input className="border p-2" type="text" name="language" placeholder="Language" onChange={handleChange} required />

        {/* Family Details */}
        <input className="border p-2" type="text" placeholder="Father's Name" onChange={(e) => handleNestedChange(e, "family_details", "father.name")} required />
        <input className="border p-2" type="text" placeholder="Father's Occupation" onChange={(e) => handleNestedChange(e, "family_details", "father.occupation")} required />
        <input className="border p-2" type="text" placeholder="Mother's Name" onChange={(e) => handleNestedChange(e, "family_details", "mother.name")} required />
        <input className="border p-2" type="text" placeholder="Mother's Occupation" onChange={(e) => handleNestedChange(e, "family_details", "mother.occupation")} required />

        {/* Profession */}
        <input className="border p-2" type="text" placeholder="Occupation" onChange={(e) => handleNestedChange(e, "profession_details", "occupation")} required />
        <input className="border p-2" type="text" placeholder="Income" onChange={(e) => handleNestedChange(e, "profession_details", "income")} required />

        {/* Education */}
        <input className="border p-2" type="text" placeholder="Education Level" onChange={(e) => handleNestedChange(e, "education_details", "education_level")} required />
        <input className="border p-2" type="text" placeholder="Field of Study" onChange={(e) => handleNestedChange(e, "education_details", "education_field")} required />

        {/* Astrology */}
        <input className="border p-2" type="text" placeholder="Rashi Nakshatra" onChange={(e) => handleNestedChange(e, "astrology_details", "rashi_nakshatra")} required />
        <input className="border p-2" type="text" placeholder="Gotra" onChange={(e) => handleNestedChange(e, "astrology_details", "gotra")} required />

        <button className="col-span-2 bg-blue-500 text-white py-2 rounded-md" type="submit">
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
