import React from "react";

const EducationDetails = ({
  formData,
  handleNestedChange,
  handleDeepNestedChange,
  handleSubmitSection,
}) => {
  const saveEducation = (e) => {
    e.preventDefault();
    handleSubmitSection("education");
  };

  return (
    <>
      <div className="col-span-2">
        <h3 className="text-xl font-semibold mb-2">Education Details</h3>
      </div>

      {/* Education Level (Dropdown) */}
      <div className="mb-4">
        <label htmlFor="education_level" className="block text-gray-700 mb-1">
          Education Level
        </label>
        <select
          id="education_level"
          className="border p-3 rounded-lg w-full"
          value={formData.education?.education_level || ""}
          onChange={(e) => handleNestedChange(e, "education", "education_level")}
        >
          <option value="">Select Education Level</option>
          <option value="high_school">High School</option>
          <option value="undergraduate">Undergraduate</option>
          <option value="graduate">Graduate</option>
          <option value="post_graduate">Post Graduate</option>
          <option value="doctorate">Doctorate</option>
        </select>
      </div>

      {/* Education Field (Dropdown) */}
      <div className="mb-4">
        <label htmlFor="education_field" className="block text-gray-700 mb-1">
          Education Field
        </label>
        <select
          id="education_field"
          className="border p-3 rounded-lg w-full"
          value={formData.education?.education_field || ""}
          onChange={(e) => handleNestedChange(e, "education", "education_field")}
        >
          <option value="">Select Education Field</option>
          <option value="engineering">Engineering</option>
          <option value="medical">Medical</option>
          <option value="commerce">Commerce</option>
          <option value="arts">Arts</option>
          <option value="science">Science</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* School Details */}
      <div className="col-span-2">
        <h4 className="text-md font-semibold mb-2 mt-4">School Details</h4>
      </div>
      <div className="mb-4">
        <label htmlFor="school_name" className="block text-gray-700 mb-1">
          School Name
        </label>
        <input
          id="school_name"
          className="border p-3 rounded-lg w-full"
          type="text"
          value={formData.education?.school_details?.name || ""}
          onChange={(e) =>
            handleDeepNestedChange(
              "education",
              "school_details",
              "name",
              e.target.value
            )
          }
        />
      </div>
      <div className="mb-4">
        <label htmlFor="school_city" className="block text-gray-700 mb-1">
          School City
        </label>
        <input
          id="school_city"
          className="border p-3 rounded-lg w-full"
          type="text"
          value={formData.education?.school_details?.city || ""}
          onChange={(e) =>
            handleDeepNestedChange(
              "education",
              "school_details",
              "city",
              e.target.value
            )
          }
        />
      </div>

      {/* College Details */}
      <div className="col-span-2">
        <h4 className="text-md font-semibold mb-2 mt-4">College Details</h4>
      </div>
      <div className="mb-4">
        <label htmlFor="college_name" className="block text-gray-700 mb-1">
          College Name
        </label>
        <input
          id="college_name"
          className="border p-3 rounded-lg w-full"
          type="text"
          value={formData.education?.college_details?.name || ""}
          onChange={(e) =>
            handleDeepNestedChange(
              "education",
              "college_details",
              "name",
              e.target.value
            )
          }
        />
      </div>
      <div className="mb-4">
        <label htmlFor="college_city" className="block text-gray-700 mb-1">
          College City
        </label>
        <input
          id="college_city"
          className="border p-3 rounded-lg w-full"
          type="text"
          value={formData.education?.college_details?.city || ""}
          onChange={(e) =>
            handleDeepNestedChange(
              "education",
              "college_details",
              "city",
              e.target.value
            )
          }
        />
      </div>
      <div className="mb-4">
        <label htmlFor="passout_year" className="block text-gray-700 mb-1">
          Passout Year
        </label>
        <input
          id="passout_year"
          className="border p-3 rounded-lg w-full"
          type="number"
          value={formData.education?.college_details?.passout_year || ""}
          onChange={(e) =>
            handleDeepNestedChange(
              "education",
              "college_details",
              "passout_year",
              e.target.value
            )
          }
        />
      </div>

      <div className="col-span-2 mt-4">
        <button
          type="button"
          onClick={saveEducation}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Save Education Details
        </button>
      </div>
    </>
  );
};

export default EducationDetails;
