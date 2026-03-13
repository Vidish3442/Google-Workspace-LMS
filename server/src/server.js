import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config.js';
import { connectDatabase } from './db.js';
import { Learner } from './models/Learner.js';

const app = express();

app.use(cors({ origin: config.corsOrigin }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  const dbState = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({ ok: true, service: 'gwelms-api', db: dbState });
});

app.post('/api/users/upsert', async (req, res) => {
  const { googleId, email, name, avatar } = req.body || {};
  if (!googleId || !email || !name) {
    return res.status(400).json({ ok: false, message: 'googleId, email and name are required.' });
  }

  const user = await Learner.findOneAndUpdate(
    { googleId },
    {
      $set: {
        email,
        name,
        avatar: avatar || '',
        lastActiveAt: new Date()
      }
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    }
  );

  return res.json({ ok: true, data: user });
});

app.get('/api/users/:googleId', async (req, res) => {
  const { googleId } = req.params;
  const user = await Learner.findOne({ googleId });
  if (!user) {
    return res.status(404).json({ ok: false, message: 'User not found.' });
  }
  return res.json({ ok: true, data: user });
});

app.put('/api/users/:googleId/progress', async (req, res) => {
  const { googleId } = req.params;
  const { completedLessons, quizScores, notes } = req.body || {};

  const updateDoc = {
    lastActiveAt: new Date()
  };

  if (Array.isArray(completedLessons)) {
    updateDoc.completedLessons = completedLessons;
  }
  if (quizScores && typeof quizScores === 'object') {
    updateDoc.quizScores = quizScores;
  }
  if (notes && typeof notes === 'object') {
    updateDoc.notes = notes;
  }

  const user = await Learner.findOneAndUpdate(
    { googleId },
    { $set: updateDoc },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ ok: false, message: 'User not found.' });
  }

  return res.json({ ok: true, data: user });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ ok: false, message: 'Internal server error.' });
});

async function start() {
  await connectDatabase();
  app.listen(config.port, () => {
    console.log(`GWELMS API running on http://localhost:${config.port}`);
  });
}

start().catch(err => {
  console.error('Failed to start server:', err.message);
  process.exit(1);
});
