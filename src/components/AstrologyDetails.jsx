import React from "react";

const AstrologyDetails = ({
  formData,
  handleNestedChange,
  handleSubmitSection,
}) => {
  const saveAstrology = (e) => {
    e.preventDefault();
    handleSubmitSection("astrology");
  };
  return (
    <>
      <div className="col-span-2">
        <h3 className="text-xl font-semibold mb-2">Astrology</h3>
      </div>
  {/* Rashi & Nakshatra */}
  <div className="mb-4">
        <label htmlFor="rashi_nakshatra" className="block text-gray-700 mb-1">
          Rashi &amp; Nakshatra
        </label>
        <input
          id="rashi_nakshatra"
          className="border p-3 rounded-lg w-full"
          type="text"
          value={formData.astrology?.rashi_nakshatra || ""}
          onChange={(e) =>
            handleNestedChange(e, "astrology", "rashi_nakshatra")
          }
        />
      </div>

      {/* Gotra */}
      <div className="mb-4">
        <label htmlFor="gotra" className="block text-gray-700 mb-1">
          Gotra
        </label>
        <input
          id="gotra"
          className="border p-3 rounded-lg w-full"
          type="text"
          value={formData.astrology?.gotra || ""}
          onChange={(e) => handleNestedChange(e, "astrology", "gotra")}
        />
      </div>


      <div className="col-span-2 mt-4">
        <button
          type="button"
          onClick={saveAstrology}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Save Astrology Details
        </button>
      </div>
    </>
  );
};

export default AstrologyDetails;