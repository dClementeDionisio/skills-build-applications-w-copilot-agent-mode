import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  goal: string;
  durationMinutes: number;
  difficulty: string;
  exercises: Array<{ name: string; reps?: number; sets?: number; durationMinutes?: number }>;
  createdAt: Date;
}

const WorkoutSchema = new Schema<IWorkout>({
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

const Workout = mongoose.models.Workout || mongoose.model<IWorkout>('Workout', WorkoutSchema);
export default Workout;
