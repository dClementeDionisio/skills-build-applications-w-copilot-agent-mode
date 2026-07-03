import mongoose, { Schema } from 'mongoose';
const ActivitySchema = new Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceKm: { type: Number },
    caloriesBurned: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true, default: () => new Date() },
});
const Activity = mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);
export default Activity;
