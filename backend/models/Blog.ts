import mongoose, { Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  content: string;
  category: string;
  author: mongoose.Types.ObjectId;
  image?: string;  
}

const blogSchema = new mongoose.Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IBlog>('Blog', blogSchema);
