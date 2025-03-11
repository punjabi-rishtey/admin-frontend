import React from "react";

const ProfileDetails = ({ formData, handleChange, handleNestedChange }) => {
  return (
    <>
      {/* Basic Information */}
      <div className="col-span-2">
        <h3 className="text-xl font-semibold mb-2">Basic Information</h3>
      </div>
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        name="name"
        value={formData.name || ""}
        onChange={handleChange}
        placeholder="Full Name"
      />
      <input
        className="border p-3 rounded-lg w-full"
        type="email"
        name="email"
        value={formData.email || ""}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        name="mobile"
        value={formData.mobile || ""}
        onChange={handleChange}
        placeholder="Mobile Number"
      />
      <select
        className="border p-3 rounded-lg w-full"
        name="gender"
        value={formData.gender || ""}
        onChange={handleChange}
        required
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input
        className="border p-3 rounded-lg w-full"
        type="date"
        name="dob"
        value={formData.dob || ""}
        onChange={handleChange}
      />
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        name="religion"
        value={formData.religion || ""}
        onChange={handleChange}
        placeholder="Religion"
      />
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        name="marital_status"
        value={formData.marital_status || ""}
        onChange={handleChange}
        placeholder="Marital Status"
      />
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        name="height"
        value={formData.height || ""}
        onChange={handleChange}
        placeholder="Height"
      />
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        name="caste"
        value={formData.caste || ""}
        onChange={handleChange}
        placeholder="Caste"
      />
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        name="language"
        value={formData.language || ""}
        onChange={handleChange}
        placeholder="Language"
      />
      <div>
        <label className="mr-2">Mangalik:</label>
        <input
          type="checkbox"
          name="mangalik"
          checked={formData.mangalik || false}
          onChange={handleChange}
        />
      </div>

      {/* Hobbies */}
      <div className="col-span-2">
        <h3 className="text-xl font-semibold mb-2">Hobbies</h3>
      </div>
      <textarea
        className="border p-3 rounded-lg w-full col-span-2"
        name="hobbies"
        value={formData.hobbies || ""}
        onChange={handleChange}
        placeholder="Enter hobbies separated by commas"
      ></textarea>

      {/* Location */}
      <div className="col-span-2">
        <h3 className="text-xl font-semibold mb-2">Location</h3>
      </div>
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        value={formData.location?.city || ""}
        onChange={(e) => handleNestedChange(e, "location", "city")}
        placeholder="City"
      />
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        value={formData.location?.pincode || ""}
        onChange={(e) => handleNestedChange(e, "location", "pincode")}
        placeholder="Pincode"
      />

      {/* Birth Details */}
      <div className="col-span-2">
        <h3 className="text-xl font-semibold mb-2">Birth Details</h3>
      </div>
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        value={formData.birth_details?.birth_place || ""}
        onChange={(e) => handleNestedChange(e, "birth_details", "birth_place")}
        placeholder="Birth Place"
      />
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        value={formData.birth_details?.birth_time || ""}
        onChange={(e) => handleNestedChange(e, "birth_details", "birth_time")}
        placeholder="Birth Time"
      />

      {/* Physical Attributes */}
      <div className="col-span-2">
        <h3 className="text-xl font-semibold mb-2">Physical Attributes</h3>
      </div>
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        value={formData.physical_attributes?.skin_tone || ""}
        onChange={(e) =>
          handleNestedChange(e, "physical_attributes", "skin_tone")
        }
        placeholder="Skin Tone"
      />
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        value={formData.physical_attributes?.body_type || ""}
        onChange={(e) =>
          handleNestedChange(e, "physical_attributes", "body_type")
        }
        placeholder="Body Type"
      />
      <div>
        <label className="mr-2">Physical Disability:</label>
        <input
          type="checkbox"
          checked={formData.physical_attributes?.physical_disability || false}
          onChange={(e) =>
            handleNestedChange(e, "physical_attributes", "physical_disability")
          }
        />
      </div>
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        value={formData.physical_attributes?.disability_reason || ""}
        onChange={(e) =>
          handleNestedChange(e, "physical_attributes", "disability_reason")
        }
        placeholder="Disability Reason"
      />

      {/* Lifestyle */}
      <div className="col-span-2">
        <h3 className="text-xl font-semibold mb-2">Lifestyle</h3>
      </div>
      <div>
        <label className="mr-2">NRI Status:</label>
        <input
          type="checkbox"
          checked={formData.lifestyle?.nri_status || false}
          onChange={(e) => handleNestedChange(e, "lifestyle", "nri_status")}
        />
      </div>
      <div>
        <label className="mr-2">Smoker:</label>
        <input
          type="checkbox"
          checked={formData.lifestyle?.smoke || false}
          onChange={(e) => handleNestedChange(e, "lifestyle", "smoke")}
        />
      </div>
      <div>
        <label className="mr-2">Drinker:</label>
        <input
          type="checkbox"
          checked={formData.lifestyle?.drink || false}
          onChange={(e) => handleNestedChange(e, "lifestyle", "drink")}
        />
      </div>
      <select
        className="border p-3 rounded-lg w-full"
        value={formData.lifestyle?.veg_nonveg || ""}
        onChange={(e) => handleNestedChange(e, "lifestyle", "veg_nonveg")}
      >
        <option value="">Diet Preference</option>
        <option value="Vegetarian">Vegetarian</option>
        <option value="Non-Vegetarian">Non-Vegetarian</option>
        <option value="Eggetarian">Eggetarian</option>
      </select>
    </>
  );
};

export default ProfileDetails;
