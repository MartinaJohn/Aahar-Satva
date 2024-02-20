import React, { useState, useEffect } from 'react';
import { Input, Button, Card } from 'antd';

const { TextArea } = Input;

const Forum = () => {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState([]);

  // Fetch existing posts when the component mounts
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

  // Function to handle adding a new post
  const handleAddPost = () => {
    if (newPost.trim() !== '') {
      fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newPost }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setPosts([...posts, data]); // Add the new post to the list
          setNewPost(''); // Clear the input field
        })
        .catch((error) => console.error('Error adding post:', error));
    }
  };

  return (
    <div className=" mt-12">
      <section className="bg-cover bg-center bg-no-repeat h- mt-12" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/modern-colorful-watercolor-background_1055-7132.jpg?t=st=1708461752~exp=1708465352~hmac=b7dc1e187d14993416a760703cf5e4e4bbd5cc7d4c344cbc99b42f0635c561c3&w=740')" }}>
      <div className="container mx-auto pt-10 px-4 flex flex-col justify-start items-center h-full text-brown ">
        <h1 className="text-4xl font-bold mb-4 sm:text-5xl text-center">Awareness Forum</h1>
        <p className="text-lg mb-8 sm:text-xl text-center">Engage in discussions and share information related to food safety and regulations.</p>
        
      </div>
    </section>

    <div>
  <Card className="p-6 ">
    <h2 className="text-xl font-semibold mb-2 text-gray-800">Add a New Post</h2>
    <TextArea
      value={newPost}
      onChange={(e) => setNewPost(e.target.value)}
      placeholder="Write your post here..."
      autoSize={{ minRows: 3, maxRows: 6 }}
      className="mb-2"
    />
    <Button
      onClick={handleAddPost}
      type='text'
      className="font-bold text-black shadow-lg border-black border-2 hover:bg-[#432818] hover:text-white shadow-lg"
    >
      Post
    </Button>
  </Card>
</div>

<div className="mb-8">
  <Card className="p-6 "><h2 className="text-xl font-semibold mb-2 text-gray-800">Previous Posts</h2>
    
  {posts.map((post, index) => (
            <div key={post._id} className="mb-4">
              <p className="text-gray-800">{post.content}</p>
            </div>
          ))}
  </Card>
</div>

     
    </div>
  );
};

export default Forum;
