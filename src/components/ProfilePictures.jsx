import React from "react";

const ProfilePictures = ({ formData, handleUpdatePictures }) => {
  // Function to handle picture deletion if needed
  const handleDeletePicture = (index) => {
    const updatedPictures = formData.profile_pictures.filter(
      (_, i) => i !== index
    );
    handleUpdatePictures(updatedPictures);
  };

  return (
    <>
      <div className="col-span-2">
        <h3 className="text-xl font-semibold mb-2">Profile Pictures</h3>
      </div>
      <div className="col-span-2 flex flex-wrap gap-4">
        {formData.profile_pictures?.map((pic, index) => (
          <div key={index} className="relative group">
            <img
              src={pic}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-md"
            />
            <button
              type="button"
              onClick={() => handleDeletePicture(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <div className="col-span-2 mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add New Pictures
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        <button
          type="button"
          onClick={() =>
            alert("Picture upload functionality would be implemented here")
          }
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Update Pictures
        </button>
      </div>
    </>
  );
};

export default ProfilePictures;
