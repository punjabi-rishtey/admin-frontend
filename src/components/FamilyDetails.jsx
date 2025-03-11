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
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        value={formData.family?.family_value || ""}
        onChange={(e) => handleNestedChange(e, "family", "family_value")}
        placeholder="Family Value"
      />
      <input
        className="border p-3 rounded-lg w-full"
        type="number"
        value={formData.family?.family_size || ""}
        onChange={(e) => handleNestedChange(e, "family", "family_size")}
        placeholder="Family Size"
      />
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        value={formData.family?.father?.name || ""}
        onChange={(e) =>
          handleDeepNestedChange("family", "father", "name", e.target.value)
        }
        placeholder="Father's Name"
      />
      <input
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
        placeholder="Father's Occupation"
      />
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        value={formData.family?.mother?.name || ""}
        onChange={(e) =>
          handleDeepNestedChange("family", "mother", "name", e.target.value)
        }
        placeholder="Mother's Name"
      />
      <input
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
        placeholder="Mother's Occupation"
      />
      <input
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
        placeholder="Number of Brothers"
      />
      <input
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
        placeholder="Number of Sisters"
      />
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
