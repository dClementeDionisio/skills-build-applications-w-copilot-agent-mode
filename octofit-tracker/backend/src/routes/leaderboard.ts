import { Router } from 'express';
import Leaderboard from '../models/leaderboard.js';

const router = Router();

router.get('/', async (_req, res) => {
  const leaderboard = await Leaderboard.find().populate('user team').sort({ rank: 1 });
  res.json({ message: 'Get leaderboard', leaderboard });
});

router.post('/', async (req, res) => {
  const entry = await Leaderboard.create(req.body);
  res.status(201).json({ message: 'Create leaderboard entry', entry });
});

export default router;
