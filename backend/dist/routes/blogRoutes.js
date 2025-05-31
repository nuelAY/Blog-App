"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const blogController_1 = require("../controllers/blogController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Setup multer for handling file uploads
const upload = (0, multer_1.default)({ dest: 'uploads/' }); // stores uploaded files in /uploads
router.get('/', blogController_1.getAllBlogs);
router.get('/:id', blogController_1.getBlogById);
// 🚀 Add multer middleware here for the POST route
router.post('/', authMiddleware_1.protect, upload.single('image'), blogController_1.createBlog);
router.put('/:id', authMiddleware_1.protect, blogController_1.updateBlog);
router.delete('/:id', authMiddleware_1.protect, blogController_1.deleteBlog);
exports.default = router;
