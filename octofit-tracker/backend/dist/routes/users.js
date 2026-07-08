import { Router } from 'express';
import User from '../models/user.js';
const router = Router();
router.get('/', async (_req, res) => {
    const users = await User.find().populate('team');
    res.json({ message: 'List users', users });
});
router.post('/', async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json({ message: 'Create user', user });
});
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).populate('team');
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Get user', user });
});
export default router;
