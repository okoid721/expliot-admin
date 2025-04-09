// src/components/UploadForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function UploadForm() {
  const [videoFile, setVideoFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [message, setMessage] = useState('');

  // Handle file change
  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile || !caption) {
      setMessage('Please fill in all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('caption', caption);

    try {
      const response = await axios.post('http://localhost:5000/upload-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Video uploaded successfully!');
      setCaption('');
      setVideoFile(null);
    } catch (error) {
      setMessage('Failed to upload video.');
    }
  };

  return (
    <div className="max-w-xl mx-auto my-8 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Upload Video</h2>
      {message && <p className="text-center mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="caption" className="block text-gray-700">Caption</label>
          <input
            type="text"
            id="caption"
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter video caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="video" className="block text-gray-700">Upload Video</label>
          <input
            type="file"
            id="video"
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadForm;
