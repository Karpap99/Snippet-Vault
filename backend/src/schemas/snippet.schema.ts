import * as mongoose from 'mongoose';

export const Snippet = new mongoose.Schema({
  title: String,
  description: Number,
  createdAt: Date,
  updatedAt: Date,
});
