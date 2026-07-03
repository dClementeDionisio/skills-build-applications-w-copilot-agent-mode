import mongoose, { Document, Schema } from 'mongoose';

export interface IActivity extends Document {
  title: string;
  type: string;
  durationMinutes: number;
  distanceKm?: number;
  caloriesBurned: number;
  user: mongoose.Types.ObjectId;
  date: Date;
}

const ActivitySchema = new Schema<IActivity>({
  title: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number },
  caloriesBurned: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true, default: () => new Date() },
});

const Activity = mongoose.models.Activity || mongoose.model<IActivity>('Activity', ActivitySchema);
export default Activity;
