import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VideoList() {
  const [videos, setVideos] = useState([]);

  // Fetch videos from the server
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/videos');
        console.log('Fetched videos:', response.data.videos);
        setVideos(response.data.videos);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      }
    };
    fetchVideos();
  }, []);

  // Function to delete a video
  const deleteVideo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/videos/${id}`);
      setVideos(videos.filter((video) => video._id !== id)); // Remove deleted video from state
      console.log('Video deleted successfully');
    } catch (error) {
      console.error('Failed to delete video:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Uploaded Videos</h2>
      <ul>
        {videos.map((video) => (
          <li key={video._id} className="mb-4 p-4 border-b">
            <video width="320" height="240" controls>
              <source src={`http://localhost:5000/${video.videoPath}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="mt-2">{video.caption}</p>
            {/* Delete button */}
            <button
              onClick={() => deleteVideo(video._id)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VideoList;
