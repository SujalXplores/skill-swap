import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: String,
  bio: String,
  location: {
    city: String,
    state: String,
    country: String,
  },
  skillsOffered: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill'
  }],
  skillsRequested: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill'
  }],
  availability: [{
    day: String,
    startTime: String,
    endTime: String
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model('User', userSchema);