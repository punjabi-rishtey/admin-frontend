import React from "react";

const ProfessionDetails = ({
  formData,
  handleNestedChange,
  handleDeepNestedChange,
  handleSubmitSection,
}) => {
  const saveProfession = (e) => {
    e.preventDefault();
    handleSubmitSection("profession");
  };

  return (
    <>
      <div className="col-span-2">
        <h3 className="text-xl font-semibold mb-2">Professional Details</h3>
      </div>

      {/* Occupation */}
      <div className="mb-4">
        <label htmlFor="occupation" className="block text-gray-700 mb-1">
          Occupation
        </label>
        <input
          id="occupation"
          className="border p-3 rounded-lg w-full"
          type="text"
          value={formData.profession?.occupation || ""}
          onChange={(e) => handleNestedChange(e, "profession", "occupation")}
        />
      </div>

      {/* Designation */}
      <div className="mb-4">
        <label htmlFor="designation" className="block text-gray-700 mb-1">
          Designation
        </label>
        <input
          id="designation"
          className="border p-3 rounded-lg w-full"
          type="text"
          value={formData.profession?.designation || ""}
          onChange={(e) => handleNestedChange(e, "profession", "designation")}
        />
      </div>

      {/* Working With */}
      <div className="mb-4">
        <label htmlFor="working_with" className="block text-gray-700 mb-1">
          Working With
        </label>
        <input
          id="working_with"
          className="border p-3 rounded-lg w-full"
          type="text"
          value={formData.profession?.working_with || ""}
          onChange={(e) => handleNestedChange(e, "profession", "working_with")}
        />
      </div>

      {/* Annual Income (Dropdown) */}
      <div className="mb-4">
        <label htmlFor="annual_income" className="block text-gray-700 mb-1">
          Annual Income
        </label>
        <select
          id="annual_income"
          className="border p-3 rounded-lg w-full"
          value={formData.profession?.income || ""}
          onChange={(e) => handleNestedChange(e, "profession", "income")}
        >
          <option value="">Select Annual Income</option>
          <option value="0-3">Up to 3 Lakhs</option>
          <option value="3-5">3-5 Lakhs</option>
          <option value="5-7">5-7 Lakhs</option>
          <option value="7-10">7-10 Lakhs</option>
          <option value="10-15">10-15 Lakhs</option>
          <option value="15-20">15-20 Lakhs</option>
          <option value="20-25">20-25 Lakhs</option>
          <option value="25-35">25-35 Lakhs</option>
          <option value="35-50">35-50 Lakhs</option>
          <option value="50-75">50-75 Lakhs</option>
          <option value="75-100">75 Lakhs - 1 Crore</option>
          <option value="100+">1 Crore+</option>
        </select>
      </div>

      {/* Work Address */}
      <div className="col-span-2">
        <h4 className="text-md font-semibold mb-2 mt-4">Work Address</h4>
      </div>
      <div className="mb-4">
        <label htmlFor="work_address_address" className="block text-gray-700 mb-1">
          Address
        </label>
        <input
          id="work_address_address"
          className="border p-3 rounded-lg w-full"
          type="text"
          value={formData.profession?.work_address?.address || ""}
          onChange={(e) =>
            handleDeepNestedChange(
              "profession",
              "work_address",
              "address",
              e.target.value
            )
          }
        />
      </div>
      <div className="mb-4">
        <label htmlFor="work_address_city" className="block text-gray-700 mb-1">
          City
        </label>
        <input
          id="work_address_city"
          className="border p-3 rounded-lg w-full"
          type="text"
          value={formData.profession?.work_address?.city || ""}
          onChange={(e) =>
            handleDeepNestedChange(
              "profession",
              "work_address",
              "city",
              e.target.value
            )
          }
        />
      </div>

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
