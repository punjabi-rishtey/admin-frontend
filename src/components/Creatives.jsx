import React, { useState } from 'react';

const Creatives = () => {
  const [themeColor, setThemeColor] = useState('#0056b3');
  const [banner, setBanner] = useState('');
  const [font, setFont] = useState('Sans-serif');
  const [layout, setLayout] = useState('Standard');

  const handleThemeColorChange = (e) => {
    setThemeColor(e.target.value);
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (r) => {
      setBanner(r.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle submitting these changes to your backend
    alert('Creative settings updated!');
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Creative Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="themeColor" className="block text-sm font-medium text-gray-700">Theme Color</label>
            <input
              type="color"
              id="themeColor"
              name="themeColor"
              value={themeColor}
              onChange={handleThemeColorChange}
              className="mt-1 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="font" className="block text-sm font-medium text-gray-700">Font Style</label>
            <select
              id="font"
              value={font}
              onChange={(e) => setFont(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="Sans-serif">Sans-serif</option>
              <option value="Serif">Serif</option>
              <option value="Monospace">Monospace</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="banner" className="block text-sm font-medium text-gray-700">Banner Image</label>
            <input
              type="file"
              id="banner"
              name="banner"
              onChange={handleBannerChange}
              className="mt-1 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="layout" className="block text-sm font-medium text-gray-700">Page Layout</label>
            <select
              id="layout"
              value={layout}
              onChange={(e) => setLayout(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="Standard">Standard</option>
              <option value="Compact">Compact</option>
              <option value="Wide">Wide</option>
            </select>
          </div>
          <div className="col-span-2">
            {banner && <img src={banner} alt="Banner preview" className="max-w-full h-auto rounded-lg" />}
          </div>
        </div>
        <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Update Settings
        </button>
      </form>
    </div>
  );
};

export default Creatives;
