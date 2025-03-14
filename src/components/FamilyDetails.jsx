import React from "react";

const FamilyDetails = ({
  formData,
  handleNestedChange,
  handleDeepNestedChange,
  handleSubmitSection,
}) => {
  const saveFamily = (e) => {
    e.preventDefault();
    handleSubmitSection("family");
  };

  return (
    <>
      <div className="col-span-2">
        <h3 className="text-xl font-semibold mb-2">Family Details</h3>
      </div>

      {/* Family Value (Dropdown) */}
      <div className="mb-4">
        <label htmlFor="family_value" className="block text-gray-700 mb-1">
          Family Value
        </label>
        <select
          id="family_value"
          className="border p-3 rounded-lg w-full"
          value={formData.family?.family_value || ""}
          onChange={(e) => handleNestedChange(e, "family", "family_value")}
        >
          <option value="">Select Family Value</option>
          <option value="orthodox">Orthodox</option>
          <option value="traditional">Traditional</option>
          <option value="moderate">Moderate</option>
          <option value="liberal">Liberal</option>
          <option value="modern">Modern</option>
        </select>
      </div>

      {/* Family Type (Dropdown) */}
      <div className="mb-4">
        <label htmlFor="family_type" className="block text-gray-700 mb-1">
          Family Type
        </label>
        <select
          id="family_type"
          className="border p-3 rounded-lg w-full"
          value={formData.family?.family_type || ""}
          onChange={(e) => handleNestedChange(e, "family", "family_type")}
        >
          <option value="">Select Family Type</option>
          <option value="living_alone">Living Alone</option>
          <option value="nuclear">Nuclear Family</option>
          <option value="extended">Extended Family</option>
          <option value="joint">Joint Family</option>
        </select>
      </div>


      {/* Father's Name */}
      <div className="mb-4">
        <label htmlFor="father_name" className="block text-gray-700 mb-1">
          Father's Name
        </label>
        <input
          id="father_name"
          className="border p-3 rounded-lg w-full"
          type="text"
          value={formData.family?.father?.name || ""}
          onChange={(e) =>
            handleDeepNestedChange("family", "father", "name", e.target.value)
          }
        />
      </div>

      {/* Father's Occupation */}
      <div className="mb-4">
        <label htmlFor="father_occupation" className="block text-gray-700 mb-1">
          Father's Occupation
        </label>
        <input
          id="father_occupation"
          className="border p-3 rounded-lg w-full"
          type="text"
          value={formData.family?.father?.occupation || ""}
          onChange={(e) =>
            handleDeepNestedChange(
              "family",
              "father",
              "occupation",
              e.target.value
            )
          }
        />
      </div>

      {/* Mother's Name */}
      <div className="mb-4">
        <label htmlFor="mother_name" className="block text-gray-700 mb-1">
          Mother's Name
        </label>
        <input
          id="mother_name"
          className="border p-3 rounded-lg w-full"
          type="text"
          value={formData.family?.mother?.name || ""}
          onChange={(e) =>
            handleDeepNestedChange("family", "mother", "name", e.target.value)
          }
        />
      </div>

      {/* Mother's Occupation */}
      <div className="mb-4">
        <label htmlFor="mother_occupation" className="block text-gray-700 mb-1">
          Mother's Occupation
        </label>
        <input
          id="mother_occupation"
          className="border p-3 rounded-lg w-full"
          type="text"
          value={formData.family?.mother?.occupation || ""}
          onChange={(e) =>
            handleDeepNestedChange(
              "family",
              "mother",
              "occupation",
              e.target.value
            )
          }
        />
      </div>

      {/* Number of Brothers */}
      <div className="mb-4">
        <label htmlFor="brother_count" className="block text-gray-700 mb-1">
          Number of Brothers
        </label>
        <input
          id="brother_count"
          className="border p-3 rounded-lg w-full"
          type="number"
          value={formData.family?.siblings?.brother_count || 0}
          onChange={(e) =>
            handleDeepNestedChange(
              "family",
              "siblings",
              "brother_count",
              e.target.value
            )
          }
        />
      </div>

      {/* Number of Sisters */}
      <div className="mb-4">
        <label htmlFor="sister_count" className="block text-gray-700 mb-1">
          Number of Sisters
        </label>
        <input
          id="sister_count"
          className="border p-3 rounded-lg w-full"
          type="number"
          value={formData.family?.siblings?.sister_count || 0}
          onChange={(e) =>
            handleDeepNestedChange(
              "family",
              "siblings",
              "sister_count",
              e.target.value
            )
          }
        />
      </div>

      <div className="col-span-2 mt-4">
        <button
          type="button"
          onClick={saveFamily}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Save Family Details
        </button>
      </div>
    </>
  );
};

export default FamilyDetails;
