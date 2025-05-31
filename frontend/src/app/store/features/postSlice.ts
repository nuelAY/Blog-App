// src/store/features/blogSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/app/store";

export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: { name: string};
  category: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

interface BlogState {
  blogs: Blog[];
  selectedBlog: Blog | null;
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: BlogState = {
  blogs: [],
  selectedBlog: null,
  loading: false,
  error: null,
  token: null,
};

// Async Thunks
export const fetchAllBlogs = createAsyncThunk(
  "blogs/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("https://blog-v0c9.onrender.com/api/blogs");
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch blogs"
      );
    }
  }
);

export const fetchBlogById = createAsyncThunk(
  "blogs/fetchById",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(`https://blog-v0c9.onrender.com/api/blogs/${id}`);
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch blog"
      );
    }
  }
);

export const createBlog = createAsyncThunk(
  "blogs/create",
  async (blogData: FormData, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.user?.token;
      console.log("Token being sent:", token);
      const response = await axios.post(
        "https://blog-v0c9.onrender.com/api/blogs",
        blogData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response:", response);
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create blog"
      );
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blogs/update",
  async ({ id, data }: { id: string; data: Partial<Blog> }, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.user?.token;
      const response = await axios.put(
        `https://blog-v0c9.onrender.com/api/blogs/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update blog"
      );
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/delete",
  async (id: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.user?.token;

      if (!token) {
        return thunkAPI.rejectWithValue("No token found. Please log in again.");
      }

      await axios.delete(`https://blog-v0c9.onrender.com/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return id;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete blog"
      );
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBlog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        console.log("action:", action);
        state.loading = false;
        state.blogs.unshift(action.payload);
        state.token = action.payload.token;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.blogs.findIndex(
          (b) => b._id === action.payload._id
        );
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
      });
  },
});

export default blogSlice.reducer;
