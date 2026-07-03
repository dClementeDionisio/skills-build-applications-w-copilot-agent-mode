import { Router } from 'express';
import Workout from '../models/workout.js';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find();
  res.json({ message: 'List workouts', workouts });
});

router.post('/', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json({ message: 'Create workout', workout });
});

router.get('/:id', async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  if (!workout) {
    return res.status(404).json({ message: 'Workout not found' });
  }
  res.json({ message: 'Get workout', workout });
});

export default router;
