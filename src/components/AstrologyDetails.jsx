import React from "react";

const AstrologyDetails = ({ formData, handleNestedChange }) => {
  return (
    <>
      <div className="col-span-2">
        <h3 className="text-xl font-semibold mb-2">Astrology</h3>
      </div>
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        value={formData.astrology?.rashi_nakshatra || ""}
        onChange={(e) => handleNestedChange(e, "astrology", "rashi_nakshatra")}
        placeholder="Rashi & Nakshatra"
      />
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        value={formData.astrology?.gotra || ""}
        onChange={(e) => handleNestedChange(e, "astrology", "gotra")}
        placeholder="Gotra"
      />
      <input
        className="border p-3 rounded-lg w-full"
        type="text"
        value={formData.astrology?.gotra_mama || ""}
        onChange={(e) => handleNestedChange(e, "astrology", "gotra_mama")}
        placeholder="Gotra Mama"
      />
    </>
  );
};

export default AstrologyDetails;
