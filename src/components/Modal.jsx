import React, { useState } from 'react';

const Modal = ({ title, onClose, onSubmit }) => {
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('user_name', userName);
    formData.append('message', message);
    if (image) {
      formData.append('image', image);
    }

    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    fetch('https://backend-nm1z.onrender.com/api/testimonials/add', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      onSubmit(); // Call the onSubmit prop function to handle closing and refreshing after submit
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50">
      <div className="flex items-center justify-center min-h-full p-4 text-center">
        <div className="relative bg-white rounded-lg shadow-xl border border-gray-200">
          <div className="py-3 px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <input
              type="text"
              placeholder="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-2 border border-gray-300 file:border-none file:rounded-md file:bg-blue-500 file:text-white file:cursor-pointer file:hover:bg-blue-600 file:p-2"
              required
            />
            <div className="flex justify-end space-x-3">
              <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
                Close
              </button>
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
