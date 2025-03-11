import React from "react";

const ProfessionDetails = ({
  formData,
  handleNestedChange,
  handleSubmitSection,
}) => {
  const saveProfession = (e) => {
    e.preventDefault();
    handleSubmitSection("profession");
  };
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
      <div className="col-span-2 mt-4">
        <button
          type="button"
          onClick={saveProfession}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Save Profession Details
        </button>
      </div>
    </>
  );
};

export default ProfessionDetails;
