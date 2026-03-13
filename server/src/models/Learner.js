import mongoose from 'mongoose';

const QuizScoreSchema = new mongoose.Schema(
  {
    score: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    pct: { type: Number, default: 0 },
    takenAt: { type: Date, default: null }
  },
  { _id: false }
);

const LearnerSchema = new mongoose.Schema(
  {
    googleId: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, index: true },
    name: { type: String, required: true },
    avatar: { type: String, default: '' },
    completedLessons: { type: [String], default: [] },
    quizScores: {
      type: Map,
      of: QuizScoreSchema,
      default: {}
    },
    notes: {
      type: Map,
      of: String,
      default: {}
    },
    lastActiveAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const Learner = mongoose.model('Learner', LearnerSchema);
