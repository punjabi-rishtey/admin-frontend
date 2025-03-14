


import React from "react";

const ProfileDetails = ({
  formData,
  handleChange,
  handleNestedChange,
  handleSubmitSection,
}) => {
  const saveProfile = (e) => {
    e.preventDefault();
    handleSubmitSection("profile");
  };

  return (
    <>
      {/* Basic Information */}
      <div className="col-span-2">
        <h3 className="text-xl font-semibold mb-2">Basic Information</h3>
      </div>

      {/* Full Name */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 mb-1">
          Full Name
        </label>
        <input
          id="name"
          className="border p-3 rounded-lg w-full"
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          className="border p-3 rounded-lg w-full"
          type="email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
        />
      </div>

      {/* Mobile Number */}
      <div className="mb-4">
        <label htmlFor="mobile" className="block text-gray-700 mb-1">
          Mobile Number
        </label>
        <input
          id="mobile"
          className="border p-3 rounded-lg w-full"
          type="text"
          name="mobile"
          value={formData.mobile || ""}
          onChange={handleChange}
        />
      </div>




      {/* Gender (Dropdown) */}
      <div className="mb-4">
        <label htmlFor="gender" className="block text-gray-700 mb-1">
          Gender
        </label>
        <select
  id="gender"
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
      </div>






      {/* Date of Birth */}
      <div className="mb-4">
        <label htmlFor="dob" className="block text-gray-700 mb-1">
          Date of Birth
        </label>
        <input
          id="dob"
          className="border p-3 rounded-lg w-full"
          type="date"
          name="dob"
          value={formData.dob || ""}
          onChange={handleChange}
        />
      </div>

      {/* Religion (Dropdown) */}
      <div className="mb-4">
        <label htmlFor="religion" className="block text-gray-700 mb-1">
          Religion
        </label>
        <select
          id="religion"
          className="border p-3 rounded-lg w-full"
          name="religion"
          value={formData.religion || ""}
          onChange={handleChange}
        >
          <option value="">Select Religion</option>
          <option value="hindu">Hindu</option>
          <option value="sikh">Sikh</option>
          <option value="jain">Jain</option>
          <option value="buddhist">Buddhist</option>
        </select>
      </div>

      {/* Marital Status (Dropdown) */}
      <div className="mb-4">
        <label htmlFor="marital_status" className="block text-gray-700 mb-1">
          Marital Status
        </label>
        <select
          id="marital_status"
          className="border p-3 rounded-lg w-full"
          name="marital_status"
          value={formData.marital_status || ""}
          onChange={handleChange}
        >
          <option value="">Select Marital Status</option>
          <option value="never_married">Never Married</option>
          <option value="divorced">Divorced</option>
          <option value="widow_widower">Widow/Widower</option>
          <option value="awaiting_divorce">Awaiting Divorce</option>
        </select>
      </div>

      {/* Personal Details Section */}
      <div className="col-span-2 mt-6">
        <h3 className="text-xl font-semibold mb-2">Personal Details</h3>
      </div>

      {/* Height (Feet) */}
      <div className="mb-4">
        <label htmlFor="height_feet" className="block text-gray-700 mb-1">
          Height (Feet)
        </label>
        <input
          id="height_feet"
          className="border p-3 rounded-lg w-full"
          type="text"
          name="height.feet"
          value={formData.height?.feet || ""}
          onChange={(e) => handleNestedChange(e, "height", "feet")}
        />
      </div>

      {/* Height (Inches) */}
      <div className="mb-4">
        <label htmlFor="height_inches" className="block text-gray-700 mb-1">
          Height (Inches)
        </label>
        <input
          id="height_inches"
          className="border p-3 rounded-lg w-full"
          type="text"
          name="height.inches"
          value={formData.height?.inches || ""}
          onChange={(e) => handleNestedChange(e, "height", "inches")}
        />
      </div>

      {/* Caste (Dropdown) */}
      <div className="mb-4">
        <label htmlFor="caste" className="block text-gray-700 mb-1">
          Caste
        </label>
        <select
          id="caste"
          className="border p-3 rounded-lg w-full"
          name="caste"
          value={formData.caste || ""}
          onChange={handleChange}
        >
          <option value="">Select Caste</option>
          <option value="khatri">Khatri</option>
          <option value="arora">Arora</option>
          <option value="brahmin">Brahmin</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Language */}
      <div className="mb-4">
        <label htmlFor="language" className="block text-gray-700 mb-1">
          Language
        </label>
        <input
          id="language"
          className="border p-3 rounded-lg w-full"
          type="text"
          name="language"
          value={formData.language || ""}
          onChange={handleChange}
        />
      </div>


      {/* Mangalik Status (Dropdown) */}
      <div className="mb-4">
        <label htmlFor="mangalik" className="block text-gray-700 mb-1">
          Mangalik Status
        </label>
        <select
          id="mangalik"
          className="border p-3 rounded-lg w-full"
          name="mangalik"
          value={formData.mangalik || ""}
          onChange={handleChange}
        >
          <option value="">Select Mangalik Status</option>
          <option value="manglik">Manglik</option>
          <option value="partial_manglik">Partial Manglik</option>
          <option value="non_manglik">Non Manglik</option>
        </select>
      </div>

      {/* Birth Details */}
      <div className="col-span-2 mt-6">
        <h3 className="text-xl font-semibold mb-2">Birth Details</h3>
      </div>

      {/* Birth Place */}
      <div className="mb-4">
        <label htmlFor="birth_place" className="block text-gray-700 mb-1">
          Birth Place
        </label>
        <input
          id="birth_place"
          className="border p-3 rounded-lg w-full"
          type="text"
          name="birth_details.birth_place"
          value={formData.birth_details?.birth_place || ""}
          onChange={(e) => handleNestedChange(e, "birth_details", "birth_place")}
        />
      </div>

      {/* Birth Time */}
      <div className="mb-4">
        <label htmlFor="birth_time" className="block text-gray-700 mb-1">
          Birth Time
        </label>
        <input
          id="birth_time"
          className="border p-3 rounded-lg w-full"
          type="time"
          name="birth_details.birth_time"
          value={formData.birth_details?.birth_time || ""}
          onChange={(e) => handleNestedChange(e, "birth_details", "birth_time")}
        />
      </div>

      {/* Physical Attributes Section */}
      <div className="col-span-2 mt-6">
        <h3 className="text-xl font-semibold mb-2">Physical Attributes</h3>
      </div>

      {/* Skin Tone (Dropdown) */}
      <div className="mb-4">
        <label htmlFor="skin_tone" className="block text-gray-700 mb-1">
          Skin Tone
        </label>
        <select
          id="skin_tone"
          className="border p-3 rounded-lg w-full"
          name="physical_attributes.skin_tone"
          value={formData.physical_attributes?.skin_tone || ""}
          onChange={(e) =>
            handleNestedChange(e, "physical_attributes", "skin_tone")
          }
        >
          <option value="">Select Skin Tone</option>
          <option value="fair">Fair</option>
          <option value="wheatish">Wheatish</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      {/* Body Type (Dropdown) */}
      <div className="mb-4">
        <label htmlFor="body_type" className="block text-gray-700 mb-1">
          Body Type
        </label>
        <select
          id="body_type"
          className="border p-3 rounded-lg w-full"
          name="physical_attributes.body_type"
          value={formData.physical_attributes?.body_type || ""}
          onChange={(e) =>
            handleNestedChange(e, "physical_attributes", "body_type")
          }
        >
          <option value="">Select Body Type</option>
          <option value="slim">Slim</option>
          <option value="athletic">Athletic</option>
          <option value="average">Average</option>
        </select>
      </div>

      {/* Physical Disability (Dropdown) */}
      <div className="mb-4">
        <label htmlFor="physical_disability" className="block text-gray-700 mb-1">
          Physical Disability
        </label>
        <select
          id="physical_disability"
          className="border p-3 rounded-lg w-full"
          name="physical_attributes.physical_disability"
          value={formData.physical_attributes?.physical_disability || ""}
          onChange={(e) =>
            handleNestedChange(e, "physical_attributes", "physical_disability")
          }
        >
          <option value="">Select Option</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      {/* Disability Details */}
      <div className="mb-4">
        <label htmlFor="disability_reason" className="block text-gray-700 mb-1">
          Disability Reason
        </label>
        <input
          id="disability_reason"
          className="border p-3 rounded-lg w-full"
          type="text"
          name="physical_attributes.disability_reason"
          value={formData.physical_attributes?.disability_reason || ""}
          onChange={(e) =>
            handleNestedChange(e, "physical_attributes", "disability_reason")
          }
        />
      </div>

      {/* Lifestyle Section */}
      <div className="col-span-2 mt-6">
        <h3 className="text-xl font-semibold mb-2">Lifestyle</h3>
      </div>

      {/* Diet Preference (Dropdown) */}
      <div className="mb-4">
        <label htmlFor="veg_nonveg" className="block text-gray-700 mb-1">
          Diet Preference
        </label>
        <select
          id="veg_nonveg"
          className="border p-3 rounded-lg w-full"
          name="lifestyle.veg_nonveg"
          value={formData.lifestyle?.veg_nonveg || ""}
          onChange={(e) =>
            handleNestedChange(e, "lifestyle", "veg_nonveg")
          }
        >
          <option value="">Select Diet Preference</option>
          <option value="veg">Vegetarian</option>
          <option value="nonveg">Non-Vegetarian</option>
          <option value="occasionally_nonveg">
            Occasionally Non-Vegetarian
          </option>
        </select>
      </div>

      {/* NRI Status (Dropdown) */}
      <div className="mb-4">
        <label htmlFor="nri_status" className="block text-gray-700 mb-1">
          NRI Status
        </label>
        <select
          id="nri_status"
          className="border p-3 rounded-lg w-full"
          name="lifestyle.nri_status"
          value={formData.lifestyle?.nri_status || ""}
          onChange={(e) =>
            handleNestedChange(e, "lifestyle", "nri_status")
          }
        >
          <option value="">Select Option</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      {/* Smoking (Dropdown) */}
      <div className="mb-4">
        <label htmlFor="smoke" className="block text-gray-700 mb-1">
          Smoking
        </label>
        <select
          id="smoke"
          className="border p-3 rounded-lg w-full"
          name="lifestyle.smoke"
          value={formData.lifestyle?.smoke || ""}
          onChange={(e) =>
            handleNestedChange(e, "lifestyle", "smoke")
          }
        >
          <option value="">Select Option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="occasionally">Occasionally</option>
        </select>
      </div>

      {/* Drinking (Dropdown) */}
      <div className="mb-4">
        <label htmlFor="drink" className="block text-gray-700 mb-1">
          Drinking
        </label>
        <select
          id="drink"
          className="border p-3 rounded-lg w-full"
          name="lifestyle.drink"
          value={formData.lifestyle?.drink || ""}
          onChange={(e) =>
            handleNestedChange(e, "lifestyle", "drink")
          }
        >
          <option value="">Select Option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="occasionally">Occasionally</option>
        </select>
      </div>

      {/* Save Button */}
      <div className="col-span-2 mt-4">
        <button
          type="button"
          onClick={saveProfile}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Save Profile Details
        </button>
      </div>
    </>
  );
};

export default ProfileDetails;


// import React from "react";

// const ProfileDetails = ({
//   formData,
//   handleChange,
//   handleNestedChange,
//   handleSubmitSection,
// }) => {
//   const saveProfile = (e) => {
//     e.preventDefault();
//     handleSubmitSection("profile");
//   };

//   return (
//     <>
//       {/* Basic Information */}
//       <div className="col-span-2">
//         <h3 className="text-xl font-semibold mb-2">Basic Information</h3>
//       </div>

//       {/* Full Name */}
//       <div className="mb-4">
//         <label htmlFor="name" className="block text-gray-700 mb-1">
//           Full Name
//         </label>
//         <input
//           id="name"
//           className="border p-3 rounded-lg w-full"
//           type="text"
//           name="name"
//           value={formData.name || ""}
//           onChange={handleChange}
//         />
//       </div>

//       {/* Email */}
//       <div className="mb-4">
//         <label htmlFor="email" className="block text-gray-700 mb-1">
//           Email
//         </label>
//         <input
//           id="email"
//           className="border p-3 rounded-lg w-full"
//           type="email"
//           name="email"
//           value={formData.email || ""}
//           onChange={handleChange}
//         />
//       </div>

//       {/* Mobile Number */}
//       <div className="mb-4">
//         <label htmlFor="mobile" className="block text-gray-700 mb-1">
//           Mobile Number
//         </label>
//         <input
//           id="mobile"
//           className="border p-3 rounded-lg w-full"
//           type="text"
//           name="mobile"
//           value={formData.mobile || ""}
//           onChange={handleChange}
//         />
//       </div>

//       {/* Gender */}
//       <div className="mb-4">
//         <label htmlFor="gender" className="block text-gray-700 mb-1">
//           Gender
//         </label>
//         <select
//           id="gender"
//           className="border p-3 rounded-lg w-full"
//           name="gender"
//           value={formData.gender || ""}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//         </select>
//       </div>

//       {/* Date of Birth */}
//       <div className="mb-4">
//         <label htmlFor="dob" className="block text-gray-700 mb-1">
//           Date of Birth
//         </label>
//         <input
//           id="dob"
//           className="border p-3 rounded-lg w-full"
//           type="date"
//           name="dob"
//           value={formData.dob || ""}
//           onChange={handleChange}
//         />
//       </div>

//       {/* Religion (Dropdown) */}
//       <div className="mb-4">
//         <label htmlFor="religion" className="block text-gray-700 mb-1">
//           Religion
//         </label>
//         <select
//           id="religion"
//           className="border p-3 rounded-lg w-full"
//           name="religion"
//           value={formData.religion || ""}
//           onChange={handleChange}
//         >
//           <option value="">Select Religion</option>
//           <option value="hindu">Hindu</option>
//           <option value="sikh">Sikh</option>
//           <option value="jain">Jain</option>
//           <option value="buddhist">Buddhist</option>
//         </select>
//       </div>

//       {/* Marital Status (Dropdown) */}
//       <div className="mb-4">
//         <label htmlFor="marital_status" className="block text-gray-700 mb-1">
//           Marital Status
//         </label>
//         <select
//           id="marital_status"
//           className="border p-3 rounded-lg w-full"
//           name="marital_status"
//           value={formData.marital_status || ""}
//           onChange={handleChange}
//         >
//           <option value="">Select Marital Status</option>
//           <option value="never_married">Never Married</option>
//           <option value="divorced">Divorced</option>
//           <option value="widow_widower">Widow/Widower</option>
//           <option value="awaiting_divorce">Awaiting Divorce</option>
//         </select>
//       </div>

//       {/* Height */}
//       <div className="mb-4">
//         <label htmlFor="height" className="block text-gray-700 mb-1">
//           Height
//         </label>
//         <input
//           id="height"
//           className="border p-3 rounded-lg w-full"
//           type="text"
//           name="height"
//           value={formData.height || ""}
//           onChange={handleChange}
//         />
//       </div>

//       {/* Caste (Dropdown) */}
//       <div className="mb-4">
//         <label htmlFor="caste" className="block text-gray-700 mb-1">
//           Caste
//         </label>
//         <select
//           id="caste"
//           className="border p-3 rounded-lg w-full"
//           name="caste"
//           value={formData.caste || ""}
//           onChange={handleChange}
//         >
//           <option value="">Select Caste</option>
//           <option value="khatri">Khatri</option>
//           <option value="arora">Arora</option>
//           <option value="brahmin">Brahmin</option>
//           <option value="other">Other</option>
//         </select>
//       </div>

//       {/* Language */}
//       <div className="mb-4">
//         <label htmlFor="language" className="block text-gray-700 mb-1">
//           Language
//         </label>
//         <input
//           id="language"
//           className="border p-3 rounded-lg w-full"
//           type="text"
//           name="language"
//           value={formData.language || ""}
//           onChange={handleChange}
//         />
//       </div>

//       {/* Mangalik (Checkbox) */}
//       <div className="mb-4 flex items-center">
//         <input
//           id="mangalik"
//           className="mr-2"
//           type="checkbox"
//           name="mangalik"
//           checked={formData.mangalik || false}
//           onChange={handleChange}
//         />
//         <label htmlFor="mangalik" className="text-gray-700">
//           Mangalik
//         </label>
//       </div>

//       {/* Hobbies */}
//       <div className="col-span-2">
//         <h3 className="text-xl font-semibold mb-2">Hobbies</h3>
//       </div>
//       <div className="mb-4 col-span-2">
//         <label htmlFor="hobbies" className="block text-gray-700 mb-1">
//           Hobbies (comma-separated)
//         </label>
//         <textarea
//           id="hobbies"
//           className="border p-3 rounded-lg w-full"
//           name="hobbies"
//           value={formData.hobbies || ""}
//           onChange={handleChange}
//         />
//       </div>

//       {/* Location */}
//       <div className="col-span-2">
//         <h3 className="text-xl font-semibold mb-2">Location</h3>
//       </div>
//       <div className="mb-4">
//         <label htmlFor="city" className="block text-gray-700 mb-1">
//           City
//         </label>
//         <input
//           id="city"
//           className="border p-3 rounded-lg w-full"
//           type="text"
//           value={formData.location?.city || ""}
//           onChange={(e) => handleNestedChange(e, "location", "city")}
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="pincode" className="block text-gray-700 mb-1">
//           Pincode
//         </label>
//         <input
//           id="pincode"
//           className="border p-3 rounded-lg w-full"
//           type="text"
//           value={formData.location?.pincode || ""}
//           onChange={(e) => handleNestedChange(e, "location", "pincode")}
//         />
//       </div>

//       {/* Birth Details */}
//       <div className="col-span-2">
//         <h3 className="text-xl font-semibold mb-2">Birth Details</h3>
//       </div>
//       <div className="mb-4">
//         <label htmlFor="birth_place" className="block text-gray-700 mb-1">
//           Birth Place
//         </label>
//         <input
//           id="birth_place"
//           className="border p-3 rounded-lg w-full"
//           type="text"
//           value={formData.birth_details?.birth_place || ""}
//           onChange={(e) =>
//             handleNestedChange(e, "birth_details", "birth_place")
//           }
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="birth_time" className="block text-gray-700 mb-1">
//           Birth Time
//         </label>
//         <input
//           id="birth_time"
//           className="border p-3 rounded-lg w-full"
//           type="text"
//           value={formData.birth_details?.birth_time || ""}
//           onChange={(e) =>
//             handleNestedChange(e, "birth_details", "birth_time")
//           }
//         />
//       </div>

//       {/* Physical Attributes */}
//       <div className="col-span-2">
//         <h3 className="text-xl font-semibold mb-2">Physical Attributes</h3>
//       </div>
//       <div className="mb-4">
//         <label htmlFor="skin_tone" className="block text-gray-700 mb-1">
//           Skin Tone
//         </label>
//         <select
//           id="skin_tone"
//           className="border p-3 rounded-lg w-full"
//           value={formData.physical_attributes?.skin_tone || ""}
//           onChange={(e) =>
//             handleNestedChange(e, "physical_attributes", "skin_tone")
//           }
//         >
//           <option value="">Select Skin Tone</option>
//           <option value="fair">Fair</option>
//           <option value="wheatish">Wheatish</option>
//           <option value="dark">Dark</option>
//         </select>
//       </div>
//       <div className="mb-4">
//         <label htmlFor="body_type" className="block text-gray-700 mb-1">
//           Body Type
//         </label>
//         <select
//           id="body_type"
//           className="border p-3 rounded-lg w-full"
//           value={formData.physical_attributes?.body_type || ""}
//           onChange={(e) =>
//             handleNestedChange(e, "physical_attributes", "body_type")
//           }
//         >
//           <option value="">Select Body Type</option>
//           <option value="slim">Slim</option>
//           <option value="athletic">Athletic</option>
//           <option value="average">Average</option>
//         </select>
//       </div>
//       <div className="mb-4 flex items-center">
//         <input
//           id="physical_disability"
//           className="mr-2"
//           type="checkbox"
//           checked={formData.physical_attributes?.physical_disability || false}
//           onChange={(e) =>
//             handleNestedChange(
//               e,
//               "physical_attributes",
//               "physical_disability"
//             )
//           }
//         />
//         <label htmlFor="physical_disability" className="text-gray-700">
//           Physical Disability
//         </label>
//       </div>
//       <div className="mb-4">
//         <label
//           htmlFor="disability_reason"
//           className="block text-gray-700 mb-1"
//         >
//           Disability Reason
//         </label>
//         <input
//           id="disability_reason"
//           className="border p-3 rounded-lg w-full"
//           type="text"
//           value={formData.physical_attributes?.disability_reason || ""}
//           onChange={(e) =>
//             handleNestedChange(e, "physical_attributes", "disability_reason")
//           }
//         />
//       </div>

//       {/* Lifestyle */}
//       <div className="col-span-2">
//         <h3 className="text-xl font-semibold mb-2">Lifestyle</h3>
//       </div>
//       <div className="mb-4">
//         <label htmlFor="veg_nonveg" className="block text-gray-700 mb-1">
//           Diet Preference
//         </label>
//         <select
//           id="veg_nonveg"
//           className="border p-3 rounded-lg w-full"
//           value={formData.lifestyle?.veg_nonveg || ""}
//           onChange={(e) => handleNestedChange(e, "lifestyle", "veg_nonveg")}
//         >
//           <option value="">Diet Preference</option>
//           <option value="Vegetarian">Vegetarian</option>
//           <option value="Non-Vegetarian">Non-Vegetarian</option>
//           <option value="Eggetarian">Eggetarian</option>
//         </select>
//       </div>
//       <div className="mb-4">
//         <label htmlFor="nri_status" className="block text-gray-700 mb-1">
//           NRI Status
//         </label>
//         <select
//           id="nri_status"
//           className="border p-3 rounded-lg w-full"
//           value={formData.lifestyle?.nri_status || ""}
//           onChange={(e) => handleNestedChange(e, "lifestyle", "nri_status")}
//         >
//           <option value="">Select Option</option>
//           <option value="true">Yes</option>
//           <option value="false">No</option>
//         </select>
//       </div>
//       <div className="mb-4">
//         <label htmlFor="smoke" className="block text-gray-700 mb-1">
//           Smoking
//         </label>
//         <select
//           id="smoke"
//           className="border p-3 rounded-lg w-full"
//           value={formData.lifestyle?.smoke || ""}
//           onChange={(e) => handleNestedChange(e, "lifestyle", "smoke")}
//         >
//           <option value="">Select Option</option>
//           <option value="yes">Yes</option>
//           <option value="no">No</option>
//           <option value="occasionally">Occasionally</option>
//         </select>
//       </div>
//       <div className="mb-4">
//         <label htmlFor="drink" className="block text-gray-700 mb-1">
//           Drinking
//         </label>
//         <select
//           id="drink"
//           className="border p-3 rounded-lg w-full"
//           value={formData.lifestyle?.drink || ""}
//           onChange={(e) => handleNestedChange(e, "lifestyle", "drink")}
//         >
//           <option value="">Select Option</option>
//           <option value="yes">Yes</option>
//           <option value="no">No</option>
//           <option value="occasionally">Occasionally</option>
//         </select>
//       </div>

//       <div className="col-span-2 mt-4">
//         <button
//           type="button"
//           onClick={saveProfile}
//           className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
//         >
//           Save Profile Details
//         </button>
//       </div>
//     </>
//   );
// };

// export default ProfileDetails;


