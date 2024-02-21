import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const MostLikedPosts = () => {
  const [mostLikedPosts, setMostLikedPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/posts/most-liked')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setMostLikedPosts(data))
      .catch((error) => console.error('Error fetching most liked posts:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setAllPosts(data))
      .catch((error) => console.error('Error fetching all posts:', error));
  }, []);

  return (
    <div>
        {mostLikedPosts.map((post) => (
          <div className="bg-[#FFF8EB] rounded-lg shadow-md shadow-orange-100 px-4 my-8" key={post._id}>
            <h2 className="text-xl mt-2 font-bold mb-2">{post.content}</h2>
            <p className="text-gray-600 mb-4">Likes: <span className="text-pink-500">❤️</span> {post.likes}</p>
          </div>
        ))}
        </div>
      
  );
};

export default MostLikedPosts;
