import { Request, Response } from "express";
import Blog from "../models/Blog";
import { AuthRequest } from "../middleware/authMiddleware";

export const getAllBlogs = async (_req: Request, res: Response) => {
  const blogs = await Blog.find().populate("author", "name");
  res.json(blogs);
};

export const getBlogById = async (req: Request, res: Response) => {
  const blog = await Blog.findById(req.params.id).populate("author", "name");
  if (!blog) {
    res.status(404).json({ message: "Blog not found" });
    res.json(blog);
    return;
  }
};

export const createBlog = async (req: AuthRequest, res: Response) => {
  const { title, content } = req.body;

  const blog = await Blog.create({
    title,
    content,
    author: req.user?._id,
  });

  res.status(201).json(blog);
};

export const updateBlog = async (req: AuthRequest, res: Response) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404).json({ message: "Blog not found" });
    return;
  }

  if (blog.author.toString() !== req.user?._id.toString()) {
    res.status(403).json({ message: "Unauthorized" });
    return;
  }

  blog.title = req.body.title || blog.title;
  blog.content = req.body.content || blog.content;
  const updated = await blog.save();
  res.json(updated);
};

export const deleteBlog = async (req: AuthRequest, res: Response) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404).json({ message: "Blog not found" });
    return;
  }

  if (blog.author.toString() !== req.user?._id.toString()) {
    res.status(403).json({ message: "Unauthorized" });
    return;
  }

  await blog.deleteOne();
  res.json({ message: "Blog deleted" });
};
