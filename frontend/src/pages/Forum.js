import React, { useState } from 'react';
import { Input, Button, Card } from 'antd';



const { TextArea } = Input;

const Forum = () => {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState([]);

  const handleAddPost = () => {
    // Add the new post to the list of posts
    setPosts([...posts, newPost]);
    // Clear the input field after posting
    setNewPost('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Food Regulation Forum</h1>

      {/* Add Post Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Add a New Post</h2>
        <TextArea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write your post here..."
          autoSize={{ minRows: 3, maxRows: 6 }}
        />
        <br />
        <br/>
        <Button
        onClick={handleAddPost}
        type="primary"
        className="bg-blue-500 hover:bg-white  text-white font-bold px-4 rounded text-center"
      >
          Post
        </Button>
      </div>

      {/* Previous Posts Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Previous Posts</h2>
        <Card>
          {posts.map((post, index) => (
            <div key={index} className="mb-4">
              <p className="text-gray-800">{post}</p>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default Forum;
