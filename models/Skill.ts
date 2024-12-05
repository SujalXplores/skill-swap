import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Expert'],
    required: true
  },
  type: {
    type: String,
    enum: ['offered', 'requested'],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  portfolioLinks: [{
    type: String,
    required: false
  }]
}, {
  timestamps: true
});

export default mongoose.models.Skill || mongoose.model('Skill', skillSchema);