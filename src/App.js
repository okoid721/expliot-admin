// src/App.jsx
import React from 'react';
import UploadForm from './components/UploadForm';
import VideoList from './components/VideoList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8">Admin Panel</h1>
        <UploadForm />
        <VideoList />
      </div>
    </div>
  );
}

export default App;
