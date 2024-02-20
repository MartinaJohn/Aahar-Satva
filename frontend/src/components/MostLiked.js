import React, { useState, useEffect } from 'react';

const MostLikedPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/posts/most-liked')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching most liked posts:', error));
  }, []);

  return (
    <div>
      <h1>Most Liked Posts</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.content}</h2>
          <p>Likes: {post.likes}</p>
        </div>
      ))}
    </div>
  );
};

export default MostLikedPosts;
