import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
    physical_attributes: { skin_tone: "", body_type: "", physical_disability: false, disability_reason: "" },
    lifestyle: { smoke: false, drink: false, veg_nonveg: "", nri_status: false },
    family: { family_value: "", family_size: "", mother: { name: "", occupation: "" }, father: { name: "", occupation: "" }, siblings: { brother_count: 0, sister_count: 0 } },
    profession: { occupation: "", designation: "", working_with: "", working_as: "", income: "", work_address: "" },
    education: { education_level: "", education_field: "", qualification_details: "" },
    astrology: { rashi_nakshatra: "", gotra: "", gotra_mama: "" }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserDetails();
  }, [id]); // ✅ Only call API when ID changes

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
            "Content-Type": "application/json"
          }
        }
      );

      alert("User updated successfully!");
      navigate("/users");
    } catch (error) {
      alert("Failed to update user. " + (error.response?.data?.message || error.message));
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading user details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-8 my-10">
      <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">Edit User</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="col-span-2">
          <h3 className="text-xl font-semibold mb-2">Basic Information</h3>
        </div>
        <input className="border p-3 rounded-lg w-full" type="text" name="name" value={formData.name || ""} onChange={handleChange} required placeholder="Full Name" />
        <input className="border p-3 rounded-lg w-full" type="email" name="email" value={formData.email || ""} onChange={handleChange} required placeholder="Email" />
        <input className="border p-3 rounded-lg w-full" type="text" name="mobile" value={formData.mobile || ""} onChange={handleChange} required placeholder="Mobile Number" />
        <select className="border p-3 rounded-lg w-full" name="gender" value={formData.gender || ""} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input className="border p-3 rounded-lg w-full" type="date" name="dob" value={formData.dob || ""} onChange={handleChange} required />
        <input className="border p-3 rounded-lg w-full" type="text" name="religion" value={formData.religion || ""} onChange={handleChange} required placeholder="Religion" />
        <input className="border p-3 rounded-lg w-full" type="text" name="marital_status" value={formData.marital_status || ""} onChange={handleChange} required placeholder="Marital Status" />
        <input className="border p-3 rounded-lg w-full" type="text" name="height" value={formData.height || ""} onChange={handleChange} placeholder="Height" />
        <input className="border p-3 rounded-lg w-full" type="text" name="caste" value={formData.caste || ""} onChange={handleChange} placeholder="Caste" />
        <input className="border p-3 rounded-lg w-full" type="text" name="language" value={formData.language || ""} onChange={handleChange} placeholder="Language" />
        <label> Mangalik: </label>
        <input type="checkbox" name="mangalik" checked={formData.mangalik} onChange={(e) => handleChange(e)} />

        {/* Hobbies */}
        <div className="col-span-2">
          <h3 className="text-xl font-semibold mb-2">Hobbies</h3>
        </div>
        <textarea className="border p-3 rounded-lg w-full" name="hobbies" value={formData.hobbies || ""} onChange={handleChange} placeholder="Enter hobbies separated by commas"></textarea>

        {/* Location */}
        <div className="col-span-2">
          <h3 className="text-xl font-semibold mb-2">Location</h3>
        </div>
        <input className="border p-3 rounded-lg w-full" type="text" name="location.city" value={formData.location?.city || ""} onChange={(e) => handleNestedChange(e, "location", "city")} placeholder="City" />
        <input className="border p-3 rounded-lg w-full" type="text" name="location.pincode" value={formData.location?.pincode || ""} onChange={(e) => handleNestedChange(e, "location", "pincode")} placeholder="Pincode" />

        {/* Birth Details */}
        <div className="col-span-2">
          <h3 className="text-xl font-semibold mb-2">Birth Details</h3>
        </div>
        <input className="border p-3 rounded-lg w-full" type="text" placeholder="Birth Place" onChange={(e) => handleNestedChange(e, "birth_details", "birth_place")} />
        <input className="border p-3 rounded-lg w-full" type="text" placeholder="Birth Time" onChange={(e) => handleNestedChange(e, "birth_details", "birth_time")} />

        {/* Physical Attributes */}
        <div className="col-span-2">
          <h3 className="text-xl font-semibold mb-2">Physical Attributes</h3>
        </div>
        <input className="border p-3 rounded-lg w-full" type="text" placeholder="Skin Tone" onChange={(e) => handleNestedChange(e, "physical_attributes", "skin_tone")} />
        <input className="border p-3 rounded-lg w-full" type="text" placeholder="Body Type" onChange={(e) => handleNestedChange(e, "physical_attributes", "body_type")} />
        <label>Physical Disability: </label>
        <input type="checkbox" name="physical_disability" checked={formData.physical_attributes?.physical_disability} onChange={(e) => handleNestedChange(e, "physical_attributes", "physical_disability")} />
        <input className="border p-3 rounded-lg w-full" type="text" placeholder="Disability Reason" onChange={(e) => handleNestedChange(e, "physical_attributes", "disability_reason")} />

        {/* Lifestyle */}
        <div className="col-span-2">
          <h3 className="text-xl font-semibold mb-2">Lifestyle</h3>
        </div>
        <label>NRI Status:</label>
        <input type="checkbox" name="nri_status" checked={formData.lifestyle?.nri_status} onChange={(e) => handleNestedChange(e, "lifestyle", "nri_status")} />
        <label>Smoker:</label>
        <input type="checkbox" name="smoke" checked={formData.lifestyle?.smoke} onChange={(e) => handleNestedChange(e, "lifestyle", "smoke")} />
        <label>Drinker:</label>
        <input type="checkbox" name="drink" checked={formData.lifestyle?.drink} onChange={(e) => handleNestedChange(e, "lifestyle", "drink")} />
        <select className="border p-3 rounded-lg w-full" onChange={(e) => handleNestedChange(e, "lifestyle", "veg_nonveg")}>
          <option value="">Diet Preference</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
          <option value="Eggetarian">Eggetarian</option>
        </select>
        

        {/* Education Details */}
        <div className="col-span-2">
          <h3 className="text-xl font-semibold mb-2">Education</h3>
        </div>
        <input className="border p-3 rounded-lg w-full" type="text" placeholder="Highest Qualification" onChange={(e) => handleNestedChange(e, "education_details", "education_level")} />
        <input className="border p-3 rounded-lg w-full" type="text" placeholder="Field of Study" onChange={(e) => handleNestedChange(e, "education_details", "education_field")} />
        <input className="border p-3 rounded-lg w-full" type="text" placeholder="Education Level" onChange={(e) => handleNestedChange(e, "education_details", "education_level")} />

        {/* Profession Details */}
        <div className="col-span-2">
          <h3 className="text-xl font-semibold mb-2">Profession Details</h3>
        </div>
        <input className="border p-3 rounded-lg w-full" type="text" placeholder="Occupation" onChange={(e) => handleNestedChange(e, "profession_details", "occupation")} required />
        <input className="border p-3 rounded-lg w-full" type="text" placeholder="Income" onChange={(e) => handleNestedChange(e, "profession_details", "income")} required />
        <input className="border p-3 rounded-lg w-full" type="text" placeholder="Designation" onChange={(e) => handleNestedChange(e, "profession_details", "designation")} />
        <input className="border p-3 rounded-lg w-full" type="text" placeholder="Working With" onChange={(e) => handleNestedChange(e, "profession_details", "working_with")} />
        <input className="border p-3 rounded-lg w-full" type="text" placeholder="Working As" onChange={(e) => handleNestedChange(e, "profession_details", "working_as")} />
        <input className="border p-3 rounded-lg w-full" type="text" placeholder="Work Address" onChange={(e) => handleNestedChange(e, "profession_details", "work_address")} />

        {/* Family Details */}
        <div className="col-span-2">
          <h3 className="text-xl font-semibold mb-2">Family Details</h3>
        </div>
        <input className="border p-3 rounded-lg w-full" type="text" placeholder="Family Value" onChange={(e) => handleNestedChange(e, "family_details", "family_value")} />
        <input className="border p-3 rounded-lg w-full" type="number" placeholder="Family Size" onChange={(e) => handleNestedChange(e, "family_details", "family_size")} />
        <input className="border p-3 rounded-lg w-full" type="text" placeholder="Father's Name" onChange={(e) => handleNestedChange(e, "family_details", "father.name")} required />
        <input className="border p-3 rounded-lg w-full" type="text" placeholder="Father's Occupation" onChange={(e) => handleNestedChange(e, "family_details", "father.occupation")} required />
        <input className="border p-3 rounded-lg w-full" type="text" placeholder="Mother's Name" onChange={(e) => handleNestedChange(e, "family_details", "mother.name")} required />
        <input className="border p-3 rounded-lg w-full" type="text" placeholder="Mother's Occupation" onChange={(e) => handleNestedChange(e, "family_details", "mother.occupation")} required />
        <input className="border p-3 rounded-lg w-full" type="number" placeholder="Number of Brothers" onChange={(e) => handleNestedChange(e, "family_details", "siblings.brother_count")} />
        <input className="border p-3 rounded-lg w-full" type="number" placeholder="Number of Sisters" onChange={(e) => handleNestedChange(e, "family_details", "siblings.sister_count")} />
        
        {/* Astrology Details */}
        <div className="col-span-2">
          <h3 className="text-xl font-semibold mb-2">Astrology</h3>
        </div>
        <input className="border p-3 rounded-lg w-full" type="text" placeholder="Rashi & Nakshatra" onChange={(e) => handleNestedChange(e, "astrology_details", "rashi_nakshatra")} />
        <input className="border p-3 rounded-lg w-full" type="text" placeholder="Gotra" onChange={(e) => handleNestedChange(e, "astrology_details", "gotra")} />
        <input className="border p-3 rounded-lg w-full" type="text" placeholder="Gotra Mama" onChange={(e) => handleNestedChange(e, "astrology_details", "gotra_mama")} />


        {/* Profile Pictures */}
        <div className="col-span-2">
          <h3 className="text-xl font-semibold mb-2">Profile Pictures</h3>
        </div>
        {formData.profile_pictures?.map((pic, index) => (
          <img key={index} src={pic} alt="Profile" className="w-32 h-32 object-cover rounded-md" />
        ))}

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
