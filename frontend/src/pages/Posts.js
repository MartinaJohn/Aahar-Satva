// Post.js
import React, { useState } from 'react';
import axios from 'axios';

const Posts = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);

  const likePost = async () => {
    try {
      const response = await fetch(`/api/posts/${post._id}/like`);
      setLikes(response.data.likes);
    } catch (error) {
      console.error('Error liking post', error);
    }
  };

  return (
    <div>
      <p>{post.content}</p>
      <p>Likes: {likes}</p>
      <button onClick={likePost}>Like</button>
    </div>
  );
};

export default Posts;
