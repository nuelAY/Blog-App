import express from 'express';
import multer from 'multer';
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Setup multer for handling file uploads
const upload = multer({ dest: 'uploads/' }); // stores uploaded files in /uploads

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

// 🚀 Add multer middleware here for the POST route
router.post('/', protect, upload.single('image'), createBlog);

router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);

export default router;
