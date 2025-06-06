import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path'
import authRoutes from './routes/authRoutes';
import blogRoutes from './routes/blogRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// 🖼 Serve uploaded images/files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// 🌐 Serve static frontend
app.use(express.static(path.join(__dirname, '../../frontend/out')));

// 🔁 Fallback: send index.html for any other route
// ✅ Fallback only for non-API routes
app.use('/', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../../frontend/out/index.html'));
  } else {
    res.status(404).json({ message: 'API route not found' });
  }
});



app.get('/', (_req, res) => {
  res.send('Blog API is running');
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
