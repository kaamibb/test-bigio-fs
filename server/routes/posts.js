import express from 'express';
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getFilteredPosts,
} from "../controllers/post.js";

const router = express.Router();
router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.get('/filtered', getFilteredPosts);


export default router;