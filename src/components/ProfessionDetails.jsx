import React from "react";

const ProfessionDetails = ({ formData, handleNestedChange }) => {
  return (
    <>
      <div className="col-span-2">
        <h3 className="text-xl font-semibold mb-2">Profession Details</h3>
      </div>
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        value={formData.profession?.occupation || ""}
        onChange={(e) => handleNestedChange(e, "profession", "occupation")}
        placeholder="Occupation"
      />
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        value={formData.profession?.income || ""}
        onChange={(e) => handleNestedChange(e, "profession", "income")}
        placeholder="Income"
      />
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        value={formData.profession?.designation || ""}
        onChange={(e) => handleNestedChange(e, "profession", "designation")}
        placeholder="Designation"
      />
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        value={formData.profession?.working_with || ""}
        onChange={(e) => handleNestedChange(e, "profession", "working_with")}
        placeholder="Working With"
      />
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        value={formData.profession?.working_as || ""}
        onChange={(e) => handleNestedChange(e, "profession", "working_as")}
        placeholder="Working As"
      />
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        value={formData.profession?.work_address || ""}
        onChange={(e) => handleNestedChange(e, "profession", "work_address")}
        placeholder="Work Address"
      />
    </>
  );
};

export default ProfessionDetails;
