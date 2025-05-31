"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.createBlog = exports.getBlogById = exports.getAllBlogs = void 0;
const Blog_1 = __importDefault(require("../models/Blog"));
const getAllBlogs = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield Blog_1.default.find().populate("author", "name");
    res.json(blogs);
});
exports.getAllBlogs = getAllBlogs;
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield Blog_1.default.findById(req.params.id).populate("author", "name");
    if (!blog) {
        res.status(404).json({ message: "Blog not found" });
        res.json(blog);
        return;
    }
});
exports.getBlogById = getBlogById;
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, content, category } = req.body;
        const image = req.file ? req.file.filename : null;
        const blog = yield Blog_1.default.create({
            title,
            content,
            category,
            author: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id, // safe access
            imageUrl: image ? `/uploads/${image}` : null,
        });
        res.status(201).json(blog); // ✅ send response
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to create blog post' });
    }
});
exports.createBlog = createBlog;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const blog = yield Blog_1.default.findById(req.params.id);
    if (!blog) {
        res.status(404).json({ message: "Blog not found" });
        return;
    }
    if (blog.author.toString() !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString())) {
        res.status(403).json({ message: "Unauthorized" });
        return;
    }
    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    const updated = yield blog.save();
    res.json(updated);
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const blog = yield Blog_1.default.findById(req.params.id);
    if (!blog) {
        res.status(404).json({ message: "Blog not found" });
        return;
    }
    if (blog.author.toString() !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString())) {
        res.status(403).json({ message: "Unauthorized" });
        return;
    }
    yield blog.deleteOne();
    res.json({ message: "Blog deleted" });
});
exports.deleteBlog = deleteBlog;
