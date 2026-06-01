import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  articleUrl: {
    type: String,
    required: true,
    unique: true,
  },
  summary: {
    type: String,
    required: true,
  },
  keyTakeaway: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema);
