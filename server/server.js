// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const postSchema = new mongoose.Schema({
  content: String,
 
  date: { type: Date, default: Date.now },
  // likes: [{ type: Schema.Types.ObjectId, ref: 'User' }//],
  likes: { type: Number, default:  0 } // Add this line

});

const Post = mongoose.model('Post', postSchema);

app.post('/api/posts/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.likes +=  1; // Increment the likes
    await post.save(); // Save the updated post
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error liking post', error });
  }
});

app.get('/api/posts/most-liked', async (req, res) => {
  try {
    const mostLikedPosts = await Post.find().sort({ likes: -1 }).limit(3);
    res.json(mostLikedPosts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching most liked posts', error });
  }
});

app.get('/api/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.post('/api/posts', async (req, res) => {
    const newPost = new Post({ content: req.body.content });
    try {
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      res.status(500).json({ message: 'Error saving post', error });
    }
  });  

const PORT = process.env.PORT ||  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
