import { Router } from 'express';
import Activity from '../models/activity.js';
const router = Router();
router.get('/', async (_req, res) => {
    const activities = await Activity.find().populate('user');
    res.json({ message: 'List activities', activities });
});
router.post('/', async (req, res) => {
    const activity = await Activity.create(req.body);
    res.status(201).json({ message: 'Create activity', activity });
});
router.get('/:id', async (req, res) => {
    const activity = await Activity.findById(req.params.id).populate('user');
    if (!activity) {
        return res.status(404).json({ message: 'Activity not found' });
    }
    res.json({ message: 'Get activity', activity });
});
export default router;
