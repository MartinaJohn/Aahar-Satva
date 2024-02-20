import React, { useState, useEffect } from 'react';
import { Input, Button, Card } from 'antd';
import MostLikedPosts from '../components/MostLiked';
const { TextArea } = Input;

const ViewForum = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  const handleLike = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}/like`, { method: 'POST' });
      if (!response.ok) {
        throw new Error('Error liking post');
      }
      const updatedPost = await response.json();
      setPosts(posts.map(post => post._id === id ? updatedPost : post));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (

    <div>
    <MostLikedPosts />
      {posts.map(post => (
        <div key={post._id}>
          <h2>{post.content}</h2>
          <p>Likes: {post.likes}</p>
          <Button onClick={() => handleLike(post._id)}>Like</Button>
        </div>
      ))}
    </div>
  );
};

export default ViewForum;
