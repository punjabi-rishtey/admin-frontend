import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileDetails from "./ProfileDetails";
import ProfessionDetails from "./ProfessionDetails";
import EducationDetails from "./EducationDetails";
import FamilyDetails from "./FamilyDetails";
import AstrologyDetails from "./AstrologyDetails";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    religion: "",
    marital_status: "",
    height: "",
    caste: "",
    language: "",
    location: { city: "", pincode: "" },
    hobbies: "",
    mangalik: false,
    birth_details: { birth_time: "", birth_place: "" },
    physical_attributes: {
      skin_tone: "",
      body_type: "",
      physical_disability: false,
      disability_reason: "",
    },
    lifestyle: {
      smoke: false,
      drink: false,
      veg_nonveg: "",
      nri_status: false,
    },
    family: {
      family_value: "",
      family_size: "",
      mother: { name: "", occupation: "" },
      father: { name: "", occupation: "" },
      siblings: { brother_count: 0, sister_count: 0 },
    },
    profession: {
      occupation: "",
      designation: "",
      working_with: "",
      working_as: "",
      income: "",
      work_address: "",
    },
    education: {
      education_level: "",
      education_field: "",
      qualification_details: "",
    },
    astrology: { rashi_nakshatra: "", gotra: "", gotra_mama: "" },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://backend-nm1z.onrender.com/api/admin/auth/user/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFormData(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch user details.");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://backend-nm1z.onrender.com/api/admin/auth/users/edit/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("User updated successfully!");
      navigate("/users");
    } catch (error) {
      alert(
        "Failed to update user. " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleNestedChange = (e, parentKey, childKey) => {
    const { value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [childKey]: newValue,
      },
    }));
  };

  const handleDeepNestedChange = (
    parentKey,
    childKey,
    grandchildKey,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [childKey]: {
          ...prev[parentKey]?.[childKey],
          [grandchildKey]: value,
        },
      },
    }));
  };

  if (loading)
    return <p className="text-center text-gray-500">Loading user details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-8 my-10">
      <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">
        Edit User
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <ProfileDetails
          formData={formData}
          handleChange={handleChange}
          handleNestedChange={handleNestedChange}
        />

        <ProfessionDetails
          formData={formData}
          handleNestedChange={handleNestedChange}
        />

        <EducationDetails
          formData={formData}
          handleNestedChange={handleNestedChange}
        />

        <FamilyDetails
          formData={formData}
          handleNestedChange={handleNestedChange}
          handleDeepNestedChange={handleDeepNestedChange}
        />

        <AstrologyDetails
          formData={formData}
          handleNestedChange={handleNestedChange}
        />

        {/* Profile Pictures */}
        <div className="col-span-2">
          <h3 className="text-xl font-semibold mb-2">Profile Pictures</h3>
        </div>
        <div className="col-span-2 flex flex-wrap gap-4">
          {formData.profile_pictures?.map((pic, index) => (
            <img
              key={index}
              src={pic}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-md"
            />
          ))}
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex justify-center mt-6">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200">
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
