import { Schema, model } from 'mongoose';

const CommentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  comments: {
    type: String,
    required: true
  }
});

module.exports = model('comment', CommentSchema);
