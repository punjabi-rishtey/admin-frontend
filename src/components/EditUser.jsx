import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    user: {},
    astrology: {},
    education: {},
    family: {},
    profession: {}
  });
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `https://backend-nm1z.onrender.com/api/admin/auth/user/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFormData({
          user: {
            name: response.data.name || '',
            email: response.data.email || '',
            mobile: response.data.mobile || '',
            gender: response.data.gender || '',
            dob: response.data.dob || '',
            religion: response.data.religion || '',
            marital_status: response.data.marital_status || '',
            height: response.data.height || '',
            caste: response.data.caste || '',
            language: response.data.language || '',
            hobbies: response.data.hobbies || [],
            mangalik: response.data.mangalik || 'false',
            birth_details: response.data.birth_details || { birth_time: '', birth_place: '' },
            physical_attributes: response.data.physical_attributes || {
              skin_tone: '',
              body_type: '',
              physical_disability: false,
              disability_reason: ''
            },
            lifestyle: response.data.lifestyle || {
              smoke: 'no',
              drink: 'no',
              veg_nonveg: '',
              nri_status: false
            },
            location: response.data.location || { city: '', address: '' }
          },
          astrology: response.data.astrology || { rashi_nakshatra: '', gotra: '' },
          education: response.data.education || {
            education_level: '',
            education_field: '',
            school_details: { name: '', city: '' },
            college_details: { name: '', city: '', passout_year: '' }
          },
          family: response.data.family || {
            family_value: '',
            family_type: '',
            mother: { name: '', occupation: '' },
            father: { name: '', occupation: '' },
            siblings: { brother_count: 0, sister_count: 0 }
          },
          profession: response.data.profession || {
            occupation: '',
            work_address: { address: '', city: '' }
          }
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleInputChange = (section, field, value, subSection) => {
    setFormData(prev => {
      if (subSection) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [subSection]: {
              ...prev[section][subSection],
              [field]: value
            }
          }
        };
      }
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      };
    });
  };

  const handleSubmit = async (section, endpoint) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        endpoint,
        formData[section],
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      alert(`${section.charAt(0).toUpperCase() + section.slice(1)} updated successfully!`);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleResetPassword = () => {
    setShowPasswordPrompt(true);
  };

  const handlePasswordSubmit = async () => {
    if (!newPassword.trim()) {
      setError('Please enter a new password.');
      return;
    }

    const confirm = window.confirm(
      `Are you sure you want to change the password for ${formData.user.name} to ${newPassword}?`
    );

    if (confirm) {
      try {
        const token = localStorage.getItem('token');
        await axios.put(
          `https://backend-nm1z.onrender.com/api/admin/auth/change-password/${id}`,
          { newPassword },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        alert('Password changed successfully!');
        setShowPasswordPrompt(false);
        setNewPassword('');
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    } else {
      setShowPasswordPrompt(false);
      setNewPassword('');
    }
  };

  const handlePasswordCancel = () => {
    setShowPasswordPrompt(false);
    setNewPassword('');
    setError(null);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="text-2xl font-semibold text-gray-700">Loading...</div>
    </div>
  );

  if (error && !formData.user.name) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-lg">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Edit User Profile</h1>
        
        {error && (
          <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* User Basic Information */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Basic Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={formData.user.name}
                onChange={(e) => handleInputChange('user', 'name', e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.user.email}
                onChange={(e) => handleInputChange('user', 'email', e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile</label>
              <input
                type="text"
                value={formData.user.mobile}
                onChange={(e) => handleInputChange('user', 'mobile', e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter mobile number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                value={formData.user.gender}
                onChange={(e) => handleInputChange('user', 'gender', e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                value={formData.user.dob}
                onChange={(e) => handleInputChange('user', 'dob', e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Religion</label>
              <input
                type="text"
                value={formData.user.religion}
                onChange={(e) => handleInputChange('user', 'religion', e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter religion"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Caste</label>
              <input
                type="text"
                value={formData.user.caste}
                onChange={(e) => handleInputChange('user', 'caste', e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter caste"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Height</label>
              <input
                type="text"
                value={formData.user.height}
                onChange={(e) => handleInputChange('user', 'height', e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter height"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Language</label>
              <input
                type="text"
                value={formData.user.language}
                onChange={(e) => handleInputChange('user', 'language', e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter language"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Marital Status</label>
              <input
                type="text"
                value={formData.user.marital_status}
                onChange={(e) => handleInputChange('user', 'marital_status', e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter marital status"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mangalik</label>
              <select
                value={formData.user.mangalik}
                onChange={(e) => handleInputChange('user', 'mangalik', e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="false">Non-Mangalik</option>
                <option value="true">Mangalik</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => handleSubmit('user', `https://backend-nm1z.onrender.com/api/admin/auth/users/edit/${id}`)}
            className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Save Basic Info
          </button>
        </div>

        {/* Birth Details */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Birth Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Birth Time</label>
              <input
                type="text"
                value={formData.user.birth_details.birth_time}
                onChange={(e) => handleInputChange('user', 'birth_time', e.target.value, 'birth_details')}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter birth time"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Birth Place</label>
              <input
                type="text"
                value={formData.user.birth_details.birth_place}
                onChange={(e) => handleInputChange('user', 'birth_place', e.target.value, 'birth_details')}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter birth place"
              />
            </div>
          </div>
          <button
            onClick={() => handleSubmit('user', `https://backend-nm1z.onrender.com/api/admin/auth/users/edit/${id}`)}
            className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Save Birth Details
          </button>
        </div>

        {/* Physical Attributes */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Physical Attributes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Skin Tone</label>
              <input
                type="text"
                value={formData.user.physical_attributes.skin_tone}
                onChange={(e) => handleInputChange('user', 'skin_tone', e.target.value, 'physical_attributes')}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter skin tone"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Body Type</label>
              <input
                type="text"
                value={formData.user.physical_attributes.body_type}
                onChange={(e) => handleInputChange('user', 'body_type', e.target.value, 'physical_attributes')}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter body type"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Physical Disability</label>
              <select
                value={formData.user.physical_attributes.physical_disability}
                onChange={(e) => handleInputChange('user', 'physical_disability', e.target.value === 'true', 'physical_attributes')}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value={false}>No Disability</option>
                <option value={true}>Has Disability</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Disability Reason</label>
              <input
                type="text"
                value={formData.user.physical_attributes.disability_reason}
                onChange={(e) => handleInputChange('user', 'disability_reason', e.target.value, 'physical_attributes')}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter disability reason"
              />
            </div>
          </div>
          <button
            onClick={() => handleSubmit('user', `https://backend-nm1z.onrender.com/api/admin/auth/users/edit/${id}`)}
            className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Save Physical Attributes
          </button>
        </div>

        {/* Lifestyle */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Lifestyle</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Smoking</label>
              <select
                value={formData.user.lifestyle.smoke}
                onChange={(e) => handleInputChange('user', 'smoke', e.target.value, 'lifestyle')}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="no">No Smoking</option>
                <option value="yes">Smokes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Drinking</label>
              <select
                value={formData.user.lifestyle.drink}
                onChange={(e) => handleInputChange('user', 'drink', e.target.value, 'lifestyle')}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="no">No Drinking</option>
                <option value="yes">Drinks</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Diet</label>
              <input
                type="text"
                value={formData.user.lifestyle.veg_nonveg}
                onChange={(e) => handleInputChange('user', 'veg_nonveg', e.target.value, 'lifestyle')}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter diet preference"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">NRI Status</label>
              <select
                value={formData.user.lifestyle.nri_status}
                onChange={(e) => handleInputChange('user', 'nri_status', e.target.value === 'true', 'lifestyle')}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value={false}>Not NRI</option>
                <option value={true}>NRI</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => handleSubmit('user', `https://backend-nm1z.onrender.com/api/admin/auth/users/edit/${id}`)}
            className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Save Lifestyle
          </button>
        </div>

        {/* Location */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Location</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                value={formData.user.location.city}
                onChange={(e) => handleInputChange('user', 'city', e.target.value, 'location')}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter city"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={formData.user.location.address}
                onChange={(e) => handleInputChange('user', 'address', e.target.value, 'location')}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter address"
              />
            </div>
          </div>
          <button
            onClick={() => handleSubmit('user', `https://backend-nm1z.onrender.com/api/admin/auth/users/edit/${id}`)}
            className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Save Location
          </button>
        </div>

        {/* Astrology */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Astrology</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Rashi Nakshatra</label>
              <input
                type="text"
                value={formData.astrology.rashi_nakshatra}
                onChange={(e) => handleInputChange('astrology', 'rashi_nakshatra', e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter rashi nakshatra"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gotra</label>
              <input
                type="text"
                value={formData.astrology.gotra}
                onChange={(e) => handleInputChange('astrology', 'gotra', e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter gotra"
              />
            </div>
          </div>
          <button
            onClick={() => handleSubmit('astrology', `https://backend-nm1z.onrender.com/api/admin/auth/astrologies/${id}`)}
            className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Save Astrology
          </button>
        </div>

        {/* Education */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Education</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Education Level</label>
              <input
                type="text"
                value={formData.education.education_level}
                onChange={(e) => handleInputChange('education', 'education_level', e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter education level"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Education Field</label>
              <input
                type="text"
                value={formData.education.education_field}
                onChange={(e) => handleInputChange('education', 'education_field', e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter education field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">School Name</label>
              <input
                type="text"
                value={formData.education.school_details.name}
                onChange={(e) => handleInputChange('education', 'name', e.target.value, 'school_details')}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter school name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">School City</label>
              <input
                type="text"
                value={formData.education.school_details.city}
                onChange={(e) => handleInputChange('education', 'city', e.target.value, 'school_details')}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter school city"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">College Name</label>
              <input
                type="text"
                value={formData.education.college_details.name}
                onChange={(e) => handleInputChange('education', 'name', e.target.value, 'college_details')}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter college name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">College City</label>
              <input
                type="text"
                value={formData.education.college_details.city}
                onChange={(e) => handleInputChange('education', 'city', e.target.value, 'college_details')}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter college city"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Passout Year</label>
              <input
                type="text"
                value={formData.education.college_details.passout_year}
                onChange={(e) => handleInputChange('education', 'passout_year', e.target.value, 'college_details')}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter passout year"
              />
            </div>
          </div>
          <button
            onClick={() => handleSubmit('education', `https://backend-nm1z.onrender.com/api/admin/auth/educations/${id}`)}
            className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Save Education
          </button>
        </div>

        {/* Family */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Family</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Family Value</label>
              <input
                type="text"
                value={formData.family.family_value}
                onChange={(e) => handleInputChange('family', 'family_value', e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter family value"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Family Type</label>
              <input
                type="text"
                value={formData.family.family_type}
                onChange={(e) => handleInputChange('family', 'family_type', e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter family type"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mother's Name</label>
              <input
                type="text"
                value={formData.family.mother.name}
                onChange={(e) => handleInputChange('family', 'name', e.target.value, 'mother')}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter mother's name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mother's Occupation</label>
              <input
                type="text"
                value={formData.family.mother.occupation}
                onChange={(e) => handleInputChange('family', 'occupation', e.target.value, 'mother')}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter mother's occupation"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Father's Name</label>
              <input
                type="text"
                value={formData.family.father.name}
                onChange={(e) => handleInputChange('family', 'name', e.target.value, 'father')}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter father's name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Father's Occupation</label>
              <input
                type="text"
                value={formData.family.father.occupation}
                onChange={(e) => handleInputChange('family', 'occupation', e.target.value, 'father')}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter father's occupation"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Brother Count</label>
              <input
                type="number"
                value={formData.family.siblings.brother_count}
                onChange={(e) => handleInputChange('family', 'brother_count', parseInt(e.target.value), 'siblings')}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter brother count"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Sister Count</label>
              <input
                type="number"
                value={formData.family.siblings.sister_count}
                onChange={(e) => handleInputChange('family', 'sister_count', parseInt(e.target.value), 'siblings')}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter sister count"
              />
            </div>
          </div>
          <button
            onClick={() => handleSubmit('family', `https://backend-nm1z.onrender.com/api/admin/auth/families/${id}`)}
            className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Save Family
          </button>
        </div>

        {/* Profession */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Profession</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Occupation</label>
              <input
                type="text"
                value={formData.profession.occupation}
                onChange={(e) => handleInputChange('profession', 'occupation', e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter occupation"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Work Address</label>
              <input
                type="text"
                value={formData.profession.work_address.address}
                onChange={(e) => handleInputChange('profession', 'address', e.target.value, 'work_address')}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter work address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Work City</label>
              <input
                type="text"
                value={formData.profession.work_address.city}
                onChange={(e) => handleInputChange('profession', 'city', e.target.value, 'work_address')}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter work city"
              />
            </div>
          </div>
          <button
            onClick={() => handleSubmit('profession', `https://backend-nm1z.onrender.com/api/admin/auth/professions/${id}`)}
            className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Save Profession
          </button>
        </div>

        {/* Password Reset */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Reset Password</h2>
          {showPasswordPrompt ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter new password"
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handlePasswordSubmit}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
                >
                  Submit Password
                </button>
                <button
                  onClick={handlePasswordCancel}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleResetPassword}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
            >
              Reset Password
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUser;

//

// v3
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

//   // Initialize formData with all sections
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
//     astrology: { rashi_nakshatra: "", gotra: "" },
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
//   const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
//   const [newPassword, setNewPassword] = useState("");

//   useEffect(() => {
//     // console.log("> id: ", id);
//     fetchUserDetails();
//   }, [id]);

//   const fetchUserDetails = async () => {
//     try {
//       console.log("Fetching user details for id:", id);
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         `https://backend-nm1z.onrender.com/api/admin/auth/user/${id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       let data = response.data;
//       console.log("Fetched raw data:", data);

//       // Transformations to normalize values for dropdowns, etc.
//       if (data.gender) {
//         data.gender =
//           data.gender.charAt(0).toUpperCase() +
//           data.gender.slice(1).toLowerCase();
//       }
//       if (data.religion) {
//         data.religion = data.religion.toLowerCase();
//       }
//       if (data.marital_status) {
//         data.marital_status = data.marital_status
//           .toLowerCase()
//           .replace(/\s+/g, "_");
//       }
//       if (data.caste) {
//         data.caste = data.caste.toLowerCase();
//       }
//       if (typeof data.mangalik === "boolean") {
//         data.mangalik = data.mangalik ? "manglik" : "non_manglik";
//       }
//       if (data.lifestyle) {
//         data.lifestyle.smoke = data.lifestyle.smoke ? "yes" : "no";
//         data.lifestyle.drink = data.lifestyle.drink ? "yes" : "no";
//         data.lifestyle.nri_status = data.lifestyle.nri_status
//           ? "true"
//           : "false";
//         if (data.lifestyle.veg_nonveg) {
//           data.lifestyle.veg_nonveg = data.lifestyle.veg_nonveg.toLowerCase();
//         }
//       }
//       if (data.physical_attributes) {
//         data.physical_attributes.physical_disability = data.physical_attributes
//           .physical_disability
//           ? "true"
//           : "false";
//         if (data.physical_attributes.skin_tone) {
//           data.physical_attributes.skin_tone =
//             data.physical_attributes.skin_tone.toLowerCase();
//         }
//         if (data.physical_attributes.body_type) {
//           data.physical_attributes.body_type =
//             data.physical_attributes.body_type.toLowerCase();
//         }
//       }
//       if (typeof data.height === "string") {
//         const match = data.height.match(/(\d+)'(\d+)/);
//         if (match) {
//           data.height = { feet: match[1], inches: match[2] };
//         } else {
//           data.height = { feet: "", inches: "" };
//         }
//       }

//       console.log("Transformed data:", data);
//       setFormData(data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//       setError("Failed to fetch user details.");
//       setLoading(false);
//     }
//   };

//   const handleSubmitSection = async (section) => {
//     try {
//       console.log(`Updating section: ${section}`);
//       setSectionStatus((prev) => ({ ...prev, [section]: "loading" }));
//       const token = localStorage.getItem("token");
//       let endpoint = "";
//       let payload = {};

//       switch (section) {
//         case "profile":
//           if (formData.height && typeof formData.height === "object") {
//             formData.height = `${formData.height.feet}'${formData.height.inches}"`;
//           }
//           endpoint = `https://backend-nm1z.onrender.com/api/admin/auth/users/edit/${id}`;
//           payload = formData;
//           break;
//         case "astrology":
//           endpoint = `https://backend-nm1z.onrender.com/api/admin/auth/astrologies/${id}`;
//           payload = { astrology: formData.astrology };
//           break;
//         case "education":
//           endpoint = `https://backend-nm1z.onrender.com/api/admin/auth/educations/${id}`;
//           payload = { education: formData.education };
//           break;
//         case "family":
//           endpoint = `https://backend-nm1z.onrender.com/api/admin/auth/families/${id}`;
//           payload = { family: formData.family };
//           break;
//         case "profession":
//           endpoint = `https://backend-nm1z.onrender.com/api/admin/auth/professions/${id}`;
//           payload = { profession: formData.profession };
//           break;
//         default:
//           throw new Error("Unknown section: " + section);
//       }

//       console.log("Endpoint:", endpoint);
//       console.log("Payload:", payload);

//       await axios.put(endpoint, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       console.log(`Section ${section} updated successfully`);

//       alert("Update successful for " + section);
//       setSectionStatus((prev) => ({ ...prev, [section]: "success" }));
//       setTimeout(() => {
//         setSectionStatus((prev) => ({ ...prev, [section]: "idle" }));
//       }, 3000);
//     } catch (error) {
//       console.error(`Error updating ${section}:`, error);
//       setSectionStatus((prev) => ({ ...prev, [section]: "error" }));
//       alert(
//         `Failed to update ${section}: ` +
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
//       console.log("Submitting full update for user:", id);
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
//       console.log("User updated successfully");
//       alert("User updated successfully!");
//       navigate("/users");
//     } catch (error) {
//       console.error("Error updating user:", error);
//       alert(
//         "Failed to update user: " +
//           (error.response?.data?.message || error.message)
//       );
//     }
//   };

//   const handleUpdatePictures = (updatedPictures) => {
//     setFormData((prev) => ({
//       ...prev,
//       profile_pictures: updatedPictures,
//     }));
//     handleSubmitSection("pictures");
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const newValue = type === "checkbox" ? checked : value;
//     console.log(`Changing field ${name} to ${newValue}`);
//     setFormData((prev) => ({ ...prev, [name]: newValue }));
//   };

//   const handleNestedChange = (e, parentKey, childKey) => {
//     const { value, type, checked } = e.target;
//     const newValue = type === "checkbox" ? checked : value;
//     console.log(
//       `Changing nested field ${parentKey}.${childKey} to ${newValue}`
//     );
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
//     console.log(
//       `Changing deep nested field ${parentKey}.${childKey}.${grandchildKey} to ${value}`
//     );
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

//   const handleResetPassword = () => {
//     setShowPasswordPrompt(true);
//   };

//   const handlePasswordSubmit = async () => {
//     if (!newPassword.trim()) {
//       alert("Please enter a new password.");
//       return;
//     }

//     const confirm = window.confirm(
//       `Are you sure you want to change the password for ${formData.name} to ${newPassword}?`
//     );

//     if (confirm) {
//       try {
//         const token = localStorage.getItem("token");
//         await axios.put(
//           // `http://localhost:5174/api/admin/auth/change-password/${id}`,
//           `https://backend-nm1z.onrender.com/api/admin/auth/change-password/${id}`,
//           { newPassword },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         alert("Password changed successfully!");
//         setShowPasswordPrompt(false);
//         setNewPassword("");
//       } catch (error) {
//         console.error("Error changing password:", error);
//         alert(
//           "Failed to change password: " +
//             (error.response?.data?.message || error.message)
//         );
//       }
//     } else {
//       setShowPasswordPrompt(false);
//       setNewPassword("");
//     }
//   };

//   const handlePasswordCancel = () => {
//     setShowPasswordPrompt(false);
//     setNewPassword("");
//   };

//   if (loading)
//     return <p className="text-center text-gray-500">Loading user details...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-8 my-10">
//       <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">
//         Edit User
//       </h2>

//       <div className="flex justify-end mb-4">
//         <button
//           type="button"
//           onClick={handleResetPassword}
//           className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//         >
//           Reset Password
//         </button>
//       </div>

//       {showPasswordPrompt && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h3 className="text-lg font-semibold mb-4">Set New Password</h3>
//             <input
//               type="password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               placeholder="Enter new password"
//               className="w-full p-2 border rounded mb-4"
//             />
//             <div className="flex justify-end gap-4">
//               <button
//                 type="button"
//                 onClick={handlePasswordSubmit}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               >
//                 Change Password
//               </button>
//               <button
//                 type="button"
//                 onClick={handlePasswordCancel}
//                 className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

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

// ======================

// v1
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

// ============================================

// v2
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

//   // Initialize formData with all sections
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
//     astrology: { rashi_nakshatra: "", gotra: "" },
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

//   const fetchUserDetails = async () => {
//     try {
//       console.log("Fetching user details for id:", id);
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         `https://backend-nm1z.onrender.com/api/admin/auth/user/${id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       let data = response.data;
//       console.log("Fetched raw data:", data);

//       // Transformations to normalize values for dropdowns, etc.
//       if (data.gender) {
//         // Assuming admin ProfileDetails expects "Male" / "Female"
//         data.gender =
//           data.gender.charAt(0).toUpperCase() +
//           data.gender.slice(1).toLowerCase();
//       }
//       if (data.religion) {
//         data.religion = data.religion.toLowerCase();
//       }
//       if (data.marital_status) {
//         // Transform "Never Married" to "never_married", etc.
//         data.marital_status = data.marital_status
//           .toLowerCase()
//           .replace(/\s+/g, "_");
//       }
//       if (data.caste) {
//         data.caste = data.caste.toLowerCase();
//       }
//       if (typeof data.mangalik === "boolean") {
//         // For our dropdown, we want string values.
//         data.mangalik = data.mangalik ? "manglik" : "non_manglik";
//       }
//       if (data.lifestyle) {
//         data.lifestyle.smoke = data.lifestyle.smoke ? "yes" : "no";
//         data.lifestyle.drink = data.lifestyle.drink ? "yes" : "no";
//         data.lifestyle.nri_status = data.lifestyle.nri_status
//           ? "true"
//           : "false";
//         if (data.lifestyle.veg_nonveg) {
//           data.lifestyle.veg_nonveg = data.lifestyle.veg_nonveg.toLowerCase();
//         }
//       }
//       if (data.physical_attributes) {
//         data.physical_attributes.physical_disability = data.physical_attributes
//           .physical_disability
//           ? "true"
//           : "false";
//         if (data.physical_attributes.skin_tone) {
//           data.physical_attributes.skin_tone =
//             data.physical_attributes.skin_tone.toLowerCase();
//         }
//         if (data.physical_attributes.body_type) {
//           data.physical_attributes.body_type =
//             data.physical_attributes.body_type.toLowerCase();
//         }
//       }
//       if (typeof data.height === "string") {
//         const match = data.height.match(/(\d+)'(\d+)/);
//         if (match) {
//           data.height = { feet: match[1], inches: match[2] };
//         } else {
//           data.height = { feet: "", inches: "" };
//         }
//       }

//       console.log("Transformed data:", data);
//       setFormData(data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//       setError("Failed to fetch user details.");
//       setLoading(false);
//     }
//   };

//   // Centralized update handler for each section
//   const handleSubmitSection = async (section) => {
//     try {
//       console.log(`Updating section: ${section}`);
//       setSectionStatus((prev) => ({ ...prev, [section]: "loading" }));
//       const token = localStorage.getItem("token");
//       let endpoint = "";
//       let payload = {};

//       // Choose endpoint and payload based on section name
//       switch (section) {
//         case "profile":
//           // Convert height object to string if needed
//           if (formData.height && typeof formData.height === "object") {
//             formData.height = `${formData.height.feet}'${formData.height.inches}"`;
//           }
//           endpoint = `https://backend-nm1z.onrender.com/api/admin/auth/users/edit/${id}`;
//           payload = formData;
//           break;
//         case "astrology":
//           endpoint = `https://backend-nm1z.onrender.com/api/admin/auth/astrologies/${id}`;
//           payload = { astrology: formData.astrology };
//           break;
//         case "education":
//           endpoint = `https://backend-nm1z.onrender.com/api/admin/auth/educations/${id}`;
//           payload = { education: formData.education };
//           break;
//         case "family":
//           endpoint = `https://backend-nm1z.onrender.com/api/admin/auth/families/${id}`;
//           payload = { family: formData.family };
//           break;
//         case "profession":
//           endpoint = `https://backend-nm1z.onrender.com/api/admin/auth/professions/${id}`;
//           payload = { profession: formData.profession };
//           break;
//         // Add more sections if needed
//         default:
//           throw new Error("Unknown section: " + section);
//       }

//       console.log("Endpoint:", endpoint);
//       console.log("Payload:", payload);

//       await axios.put(endpoint, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       console.log(`Section ${section} updated successfully`);

//       alert("Update successful for " + section);
//       setSectionStatus((prev) => ({ ...prev, [section]: "success" }));
//       setTimeout(() => {
//         setSectionStatus((prev) => ({ ...prev, [section]: "idle" }));
//       }, 3000);
//     } catch (error) {
//       console.error(`Error updating ${section}:`, error);
//       setSectionStatus((prev) => ({ ...prev, [section]: "error" }));
//       alert(
//         `Failed to update ${section}: ` +
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
//       console.log("Submitting full update for user:", id);
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
//       console.log("User updated successfully");
//       alert("User updated successfully!");
//       navigate("/users");
//     } catch (error) {
//       console.error("Error updating user:", error);
//       alert(
//         "Failed to update user: " +
//           (error.response?.data?.message || error.message)
//       );
//     }
//   };

//   const handleUpdatePictures = (updatedPictures) => {
//     setFormData((prev) => ({
//       ...prev,
//       profile_pictures: updatedPictures,
//     }));
//     handleSubmitSection("pictures");
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const newValue = type === "checkbox" ? checked : value;
//     console.log(`Changing field ${name} to ${newValue}`);
//     setFormData((prev) => ({ ...prev, [name]: newValue }));
//   };

//   const handleNestedChange = (e, parentKey, childKey) => {
//     const { value, type, checked } = e.target;
//     const newValue = type === "checkbox" ? checked : value;
//     console.log(
//       `Changing nested field ${parentKey}.${childKey} to ${newValue}`
//     );
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
//     console.log(
//       `Changing deep nested field ${parentKey}.${childKey}.${grandchildKey} to ${value}`
//     );
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
