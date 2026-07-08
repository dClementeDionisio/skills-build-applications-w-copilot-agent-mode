import mongoose, { Document, Schema } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  user: mongoose.Types.ObjectId;
  points: number;
  rank: number;
  team?: mongoose.Types.ObjectId;
  updatedAt: Date;
}

const LeaderboardSchema = new Schema<ILeaderboardEntry>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, required: true },
  rank: { type: Number, required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  updatedAt: { type: Date, default: () => new Date() },
});

const Leaderboard = mongoose.models.Leaderboard || mongoose.model<ILeaderboardEntry>('Leaderboard', LeaderboardSchema);
export default Leaderboard;
