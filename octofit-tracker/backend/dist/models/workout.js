import mongoose, { Schema } from 'mongoose';
const WorkoutSchema = new Schema({
    name: { type: String, required: true },
    goal: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true },
    exercises: [
        {
            name: { type: String, required: true },
            reps: Number,
            sets: Number,
            durationMinutes: Number,
        },
    ],
    createdAt: { type: Date, default: () => new Date() },
});
const Workout = mongoose.models.Workout || mongoose.model('Workout', WorkoutSchema);
export default Workout;
