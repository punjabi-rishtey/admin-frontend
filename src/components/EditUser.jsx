// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import ProfileDetails from "./ProfileDetails";
// import ProfessionDetails from "./ProfessionDetails";
// import EducationDetails from "./EducationDetails";
// import FamilyDetails from "./FamilyDetails";
// import AstrologyDetails from "./AstrologyDetails";
// import ProfilePictures from "./ProfilePictures";

// const EditUser = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     gender: "",
//     dob: "",
//     religion: "",
//     marital_status: "",
//     height: "",
//     caste: "",
//     language: "",
//     location: { city: "", pincode: "" },
//     hobbies: "",
//     mangalik: false,
//     birth_details: { birth_time: "", birth_place: "" },
//     physical_attributes: {
//       skin_tone: "",
//       body_type: "",
//       physical_disability: false,
//       disability_reason: "",
//     },
//     lifestyle: {
//       smoke: false,
//       drink: false,
//       veg_nonveg: "",
//       nri_status: false,
//     },
//     family: {
//       family_value: "",
//       family_size: "",
//       mother: { name: "", occupation: "" },
//       father: { name: "", occupation: "" },
//       siblings: { brother_count: 0, sister_count: 0 },
//     },
//     profession: {
//       occupation: "",
//       designation: "",
//       working_with: "",
//       working_as: "",
//       income: "",
//       work_address: "",
//     },
//     education: {
//       education_level: "",
//       education_field: "",
//       qualification_details: "",
//     },
//     astrology: { rashi_nakshatra: "", gotra: ""},
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [sectionStatus, setSectionStatus] = useState({
//     profile: "idle",
//     profession: "idle",
//     education: "idle",
//     family: "idle",
//     astrology: "idle",
//     pictures: "idle",
//   });

//   useEffect(() => {
//     fetchUserDetails();
//   }, [id]);

//   // const fetchUserDetails = async () => {
//   //   try {
//   //     const token = localStorage.getItem("token");
//   //     const response = await axios.get(
//   //       `https://backend-nm1z.onrender.com/api/admin/auth/user/${id}`,
//   //       { headers: { Authorization: `Bearer ${token}` } }
//   //     );

//   //     setFormData(response.data);
//   //     setLoading(false);
//   //   } catch (error) {
//   //     setError("Failed to fetch user details.");
//   //     setLoading(false);
//   //   }
//   // };

//   const fetchUserDetails = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         `https://backend-nm1z.onrender.com/api/admin/auth/user/${id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       let data = response.data;

//         // 1) Gender
//       if (data.gender) {
//         // If your dropdown <option value="Male">, then keep it capital M
//         // If your dropdown <option value="male">, use lowercase
//         // Right now you have <option value="Male"> in ProfileDetails.jsx, so do:
//         data.gender = data.gender.charAt(0).toUpperCase() + data.gender.slice(1).toLowerCase();
//         // e.g. "male" => "Male"
//       }

//       // Normalize Religion
//       if (data.religion) {
//         data.religion = data.religion.toLowerCase();
//       }

//       // Normalize Marital Status: e.g., "Never Married" -> "never_married"
//       if (data.marital_status) {
//         data.marital_status = data.marital_status.toLowerCase().replace(/\s+/g, "_");
//       }

//       // Normalize Caste: convert to lowercase so "Khatri" becomes "khatri"
//       if (data.caste) {
//         data.caste = data.caste.toLowerCase();
//       }

//       // Transform Mangalik: Convert boolean to dropdown value.
//       // Since your dropdown options are: "manglik", "partial_manglik", "non_manglik"
//       // Without additional info, we'll assume: true => "manglik", false => "non_manglik"
//       if (typeof data.mangalik === "boolean") {
//         data.mangalik = data.mangalik ? "manglik" : "non_manglik";
//       }

//       // Normalize Lifestyle fields
//       if (data.lifestyle) {
//         data.lifestyle.smoke = data.lifestyle.smoke ? "yes" : "no";
//         data.lifestyle.drink = data.lifestyle.drink ? "yes" : "no";
//         data.lifestyle.nri_status = data.lifestyle.nri_status ? "true" : "false";
//         if (data.lifestyle.veg_nonveg) {
//           data.lifestyle.veg_nonveg = data.lifestyle.veg_nonveg.toLowerCase();
//         }
//       }

//       // Normalize Physical Attributes
//       if (data.physical_attributes) {
//         data.physical_attributes.physical_disability = data.physical_attributes.physical_disability ? "true" : "false";
//         if (data.physical_attributes.skin_tone) {
//           data.physical_attributes.skin_tone = data.physical_attributes.skin_tone.toLowerCase();
//         }
//         if (data.physical_attributes.body_type) {
//           data.physical_attributes.body_type = data.physical_attributes.body_type.toLowerCase();
//         }
//       }

//       // Normalize Height (if stored as a string like "7'11\"")
//       if (typeof data.height === "string") {
//         const match = data.height.match(/(\d+)'(\d+)/);
//         if (match) {
//           data.height = { feet: match[1], inches: match[2] };
//         } else {
//           data.height = { feet: "", inches: "" };
//         }
//       }

//       setFormData(data);
//       setLoading(false);
//     } catch (error) {
//       setError("Failed to fetch user details.");
//       setLoading(false);
//     }
//   };

//   const handleSubmitSection = async (section) => {
//     try {
//       setSectionStatus((prev) => ({ ...prev, [section]: "loading" }));
//       const token = localStorage.getItem("token");

//       // You might want to adjust the endpoint to handle partial updates
//       await axios.put(
//         `https://backend-nm1z.onrender.com/api/admin/auth/users/edit/${id}/${section}`,
//         { [section]: formData[section] },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setSectionStatus((prev) => ({ ...prev, [section]: "success" }));
//       setTimeout(() => {
//         setSectionStatus((prev) => ({ ...prev, [section]: "idle" }));
//       }, 3000);
//     } catch (error) {
//       setSectionStatus((prev) => ({ ...prev, [section]: "error" }));
//       alert(
//         `Failed to update ${section}. ` +
//           (error.response?.data?.message || error.message)
//       );
//       setTimeout(() => {
//         setSectionStatus((prev) => ({ ...prev, [section]: "idle" }));
//       }, 3000);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `https://backend-nm1z.onrender.com/api/admin/auth/users/edit/${id}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       alert("User updated successfully!");
//       navigate("/users");
//     } catch (error) {
//       alert(
//         "Failed to update user. " +
//           (error.response?.data?.message || error.message)
//       );
//     }
//   };

//   const handleUpdatePictures = (updatedPictures) => {
//     setFormData((prev) => ({
//       ...prev,
//       profile_pictures: updatedPictures,
//     }));
//     // You might want to immediately save this change
//     handleSubmitSection("pictures");
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const newValue = type === "checkbox" ? checked : value;
//     setFormData((prev) => ({ ...prev, [name]: newValue }));
//   };

//   const handleNestedChange = (e, parentKey, childKey) => {
//     const { value, type, checked } = e.target;
//     const newValue = type === "checkbox" ? checked : value;

//     setFormData((prev) => ({
//       ...prev,
//       [parentKey]: {
//         ...prev[parentKey],
//         [childKey]: newValue,
//       },
//     }));
//   };

//   const handleDeepNestedChange = (
//     parentKey,
//     childKey,
//     grandchildKey,
//     value
//   ) => {
//     setFormData((prev) => ({
//       ...prev,
//       [parentKey]: {
//         ...prev[parentKey],
//         [childKey]: {
//           ...prev[parentKey]?.[childKey],
//           [grandchildKey]: value,
//         },
//       },
//     }));
//   };

//   if (loading)
//     return <p className="text-center text-gray-500">Loading user details...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-8 my-10">
//       <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">
//         Edit User
//       </h2>

//       <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
//         <ProfileDetails
//           formData={formData}
//           handleChange={handleChange}
//           handleNestedChange={handleNestedChange}
//           handleSubmitSection={handleSubmitSection}
//         />

//         <ProfessionDetails
//           formData={formData}
//           handleNestedChange={handleNestedChange}
//           handleSubmitSection={handleSubmitSection}
//         />

//         <EducationDetails
//           formData={formData}
//           handleNestedChange={handleNestedChange}
//           handleSubmitSection={handleSubmitSection}
//         />

//         <FamilyDetails
//           formData={formData}
//           handleNestedChange={handleNestedChange}
//           handleDeepNestedChange={handleDeepNestedChange}
//           handleSubmitSection={handleSubmitSection}
//         />

//         <AstrologyDetails
//           formData={formData}
//           handleNestedChange={handleNestedChange}
//           handleSubmitSection={handleSubmitSection}
//         />

//         <ProfilePictures
//           formData={formData}
//           handleUpdatePictures={handleUpdatePictures}
//         />
//       </form>
//     </div>
//   );
// };

// export default EditUser;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileDetails from "./ProfileDetails";
import ProfessionDetails from "./ProfessionDetails";
import EducationDetails from "./EducationDetails";
import FamilyDetails from "./FamilyDetails";
import AstrologyDetails from "./AstrologyDetails";
import ProfilePictures from "./ProfilePictures";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Initialize formData with all sections
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    religion: "",
    marital_status: "",
    height: "",
    caste: "",
    language: "",
    location: { city: "", pincode: "" },
    hobbies: "",
    mangalik: false,
    birth_details: { birth_time: "", birth_place: "" },
    physical_attributes: {
      skin_tone: "",
      body_type: "",
      physical_disability: false,
      disability_reason: "",
    },
    lifestyle: {
      smoke: false,
      drink: false,
      veg_nonveg: "",
      nri_status: false,
    },
    family: {
      family_value: "",
      family_size: "",
      mother: { name: "", occupation: "" },
      father: { name: "", occupation: "" },
      siblings: { brother_count: 0, sister_count: 0 },
    },
    profession: {
      occupation: "",
      designation: "",
      working_with: "",
      working_as: "",
      income: "",
      work_address: "",
    },
    education: {
      education_level: "",
      education_field: "",
      qualification_details: "",
    },
    astrology: { rashi_nakshatra: "", gotra: "" },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sectionStatus, setSectionStatus] = useState({
    profile: "idle",
    profession: "idle",
    education: "idle",
    family: "idle",
    astrology: "idle",
    pictures: "idle",
  });

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  const fetchUserDetails = async () => {
    try {
      console.log("Fetching user details for id:", id);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://backend-nm1z.onrender.com/api/admin/auth/user/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      let data = response.data;
      console.log("Fetched raw data:", data);

      // Transformations to normalize values for dropdowns, etc.
      if (data.gender) {
        // Assuming admin ProfileDetails expects "Male" / "Female"
        data.gender =
          data.gender.charAt(0).toUpperCase() +
          data.gender.slice(1).toLowerCase();
      }
      if (data.religion) {
        data.religion = data.religion.toLowerCase();
      }
      if (data.marital_status) {
        // Transform "Never Married" to "never_married", etc.
        data.marital_status = data.marital_status
          .toLowerCase()
          .replace(/\s+/g, "_");
      }
      if (data.caste) {
        data.caste = data.caste.toLowerCase();
      }
      if (typeof data.mangalik === "boolean") {
        // For our dropdown, we want string values.
        data.mangalik = data.mangalik ? "manglik" : "non_manglik";
      }
      if (data.lifestyle) {
        data.lifestyle.smoke = data.lifestyle.smoke ? "yes" : "no";
        data.lifestyle.drink = data.lifestyle.drink ? "yes" : "no";
        data.lifestyle.nri_status = data.lifestyle.nri_status
          ? "true"
          : "false";
        if (data.lifestyle.veg_nonveg) {
          data.lifestyle.veg_nonveg = data.lifestyle.veg_nonveg.toLowerCase();
        }
      }
      if (data.physical_attributes) {
        data.physical_attributes.physical_disability = data.physical_attributes
          .physical_disability
          ? "true"
          : "false";
        if (data.physical_attributes.skin_tone) {
          data.physical_attributes.skin_tone =
            data.physical_attributes.skin_tone.toLowerCase();
        }
        if (data.physical_attributes.body_type) {
          data.physical_attributes.body_type =
            data.physical_attributes.body_type.toLowerCase();
        }
      }
      if (typeof data.height === "string") {
        const match = data.height.match(/(\d+)'(\d+)/);
        if (match) {
          data.height = { feet: match[1], inches: match[2] };
        } else {
          data.height = { feet: "", inches: "" };
        }
      }

      console.log("Transformed data:", data);
      setFormData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setError("Failed to fetch user details.");
      setLoading(false);
    }
  };

  // Centralized update handler for each section
  const handleSubmitSection = async (section) => {
    try {
      console.log(`Updating section: ${section}`);
      setSectionStatus((prev) => ({ ...prev, [section]: "loading" }));
      const token = localStorage.getItem("token");
      let endpoint = "";
      let payload = {};

      // Choose endpoint and payload based on section name
      switch (section) {
        case "profile":
          // Convert height object to string if needed
          if (formData.height && typeof formData.height === "object") {
            formData.height = `${formData.height.feet}'${formData.height.inches}"`;
          }
          endpoint = `https://backend-nm1z.onrender.com/api/admin/auth/users/edit/${id}`;
          payload = formData;
          break;
        case "astrology":
          endpoint = `https://backend-nm1z.onrender.com/api/admin/auth/astrologies/${id}`;
          payload = { astrology: formData.astrology };
          break;
        case "education":
          endpoint = `https://backend-nm1z.onrender.com/api/admin/auth/educations/${id}`;
          payload = { education: formData.education };
          break;
        case "family":
          endpoint = `https://backend-nm1z.onrender.com/api/admin/auth/families/${id}`;
          payload = { family: formData.family };
          break;
        case "profession":
          endpoint = `https://backend-nm1z.onrender.com/api/admin/auth/professions/${id}`;
          payload = { profession: formData.profession };
          break;
        // Add more sections if needed
        default:
          throw new Error("Unknown section: " + section);
      }

      console.log("Endpoint:", endpoint);
      console.log("Payload:", payload);

      await axios.put(endpoint, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log(`Section ${section} updated successfully`);

      alert("Update successful for " + section);
      setSectionStatus((prev) => ({ ...prev, [section]: "success" }));
      setTimeout(() => {
        setSectionStatus((prev) => ({ ...prev, [section]: "idle" }));
      }, 3000);
    } catch (error) {
      console.error(`Error updating ${section}:`, error);
      setSectionStatus((prev) => ({ ...prev, [section]: "error" }));
      alert(
        `Failed to update ${section}: ` +
          (error.response?.data?.message || error.message)
      );
      setTimeout(() => {
        setSectionStatus((prev) => ({ ...prev, [section]: "idle" }));
      }, 3000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log("Submitting full update for user:", id);
      await axios.put(
        `https://backend-nm1z.onrender.com/api/admin/auth/users/edit/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("User updated successfully");
      alert("User updated successfully!");
      navigate("/users");
    } catch (error) {
      console.error("Error updating user:", error);
      alert(
        "Failed to update user: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleUpdatePictures = (updatedPictures) => {
    setFormData((prev) => ({
      ...prev,
      profile_pictures: updatedPictures,
    }));
    handleSubmitSection("pictures");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    console.log(`Changing field ${name} to ${newValue}`);
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleNestedChange = (e, parentKey, childKey) => {
    const { value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    console.log(
      `Changing nested field ${parentKey}.${childKey} to ${newValue}`
    );
    setFormData((prev) => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [childKey]: newValue,
      },
    }));
  };

  const handleDeepNestedChange = (
    parentKey,
    childKey,
    grandchildKey,
    value
  ) => {
    console.log(
      `Changing deep nested field ${parentKey}.${childKey}.${grandchildKey} to ${value}`
    );
    setFormData((prev) => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [childKey]: {
          ...prev[parentKey]?.[childKey],
          [grandchildKey]: value,
        },
      },
    }));
  };

  if (loading)
    return <p className="text-center text-gray-500">Loading user details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-8 my-10">
      <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">
        Edit User
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <ProfileDetails
          formData={formData}
          handleChange={handleChange}
          handleNestedChange={handleNestedChange}
          handleSubmitSection={handleSubmitSection}
        />

        <ProfessionDetails
          formData={formData}
          handleNestedChange={handleNestedChange}
          handleSubmitSection={handleSubmitSection}
        />

        <EducationDetails
          formData={formData}
          handleNestedChange={handleNestedChange}
          handleSubmitSection={handleSubmitSection}
        />

        <FamilyDetails
          formData={formData}
          handleNestedChange={handleNestedChange}
          handleDeepNestedChange={handleDeepNestedChange}
          handleSubmitSection={handleSubmitSection}
        />

        <AstrologyDetails
          formData={formData}
          handleNestedChange={handleNestedChange}
          handleSubmitSection={handleSubmitSection}
        />

        <ProfilePictures
          formData={formData}
          handleUpdatePictures={handleUpdatePictures}
        />
      </form>
    </div>
  );
};

export default EditUser;
