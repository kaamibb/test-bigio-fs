import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const { title, author, synopsis, category, storyCover, tags, status, chaptertitle, storychapter } = req.body;
  const newPost = new PostMessage({ title, author, synopsis, category, storyCover, tags, status, chaptertitle, storychapter });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const { title, author, synopsis, category, storyCover, tags, status, chaptertitle, storychapter } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with id: ${_id}`);
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, { title, author, synopsis, category, storyCover, tags, status, chaptertitle, storychapter }, { new: true });
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  await PostMessage.findByIdAndDelete(id);
  res.json({ message: 'Post deleted successfully.' });
};

export const getFilteredPosts = async (req, res) => {
  const { category, status } = req.query;
  let filter = {};

  if (category) {
    filter.category = category;
  }

  if (status) {
    filter.status = status;
  }

  try {
    const filteredPosts = await PostMessage.find(filter);
    res.status(200).json(filteredPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
