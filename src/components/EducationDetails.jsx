import React from "react";

const EducationDetails = ({ formData, handleNestedChange }) => {
  return (
    <>
      <div className="col-span-2">
        <h3 className="text-xl font-semibold mb-2">Education</h3>
      </div>
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        value={formData.education?.education_level || ""}
        onChange={(e) => handleNestedChange(e, "education", "education_level")}
        placeholder="Highest Qualification"
      />
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        value={formData.education?.education_field || ""}
        onChange={(e) => handleNestedChange(e, "education", "education_field")}
        placeholder="Field of Study"
      />
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        value={formData.education?.qualification_details || ""}
        onChange={(e) =>
          handleNestedChange(e, "education", "qualification_details")
        }
        placeholder="Qualification Details"
      />
    </>
  );
};

export default EducationDetails;
