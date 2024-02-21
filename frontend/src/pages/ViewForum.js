import React, { useState, useEffect } from "react";
import { Tabs, Input, Button, Card } from "antd";
import MostLikedPosts from "../components/MostLiked";
const { TextArea } = Input;

const { TabPane } = Tabs;

const ViewForum = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handleLike = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${id}/like`,
        { method: "POST" }
      );
      if (!response.ok) {
        throw new Error("Error liking post");
      }
      const updatedPost = await response.json();
      setPosts(posts.map((post) => (post._id === id ? updatedPost : post)));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
    <section
      className="bg-cover bg-center bg-no-repeat h-3/5 mt-12"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/people-pattern_23-2148128621.jpg?w=740&t=st=1708472316~exp=1708472916~hmac=5fd175098e84918cb61631bc58980cd3eab29720c2233b65033de02918b1904b')",
      }}
    >
      <div className="container mx-auto pt-10 px-4 flex flex-col justify-start items-center h-full text-brown ">
        <h1 className="text-4xl font-bold mb-4 sm:text-5xl text-center">
          #SafetyFirst
        </h1>
        <p className="text-lg mb-8 sm:text-xl text-center">
          Stay informed and contribute to food safety awareness.
          Get updates and valuable resources directly to your inbox!
        </p>
      </div>
    </section>
    <div className="container mx-auto p-4">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Most Liked" key="1">
          <MostLikedPosts />
        </TabPane>
        <TabPane tab="All Posts" key="2">
          {posts.map((post) => (
            <div className="bg-[#FFF8EB] rounded-lg shadow-md shadow-orange-100 px-4 my-8" key={post._id}>
              <h2 className="text-xl mt-2 font-bold mb-2">{post.content}</h2>
              <p className="text-gray-600 mb-4">
                Likes: <span className="text-pink-500">❤️</span> {post.likes}
              </p>
              <Button
                className="bg-transparent text-pink-500 hover:text-pink-600 mb-4 "
                onClick={() => handleLike(post._id)}
              >
                Like
              </Button>
              <br/>
            </div>
          ))}
        </TabPane>
      </Tabs>
    </div>
  </div>
  );
};

export default ViewForum;
