import mongoose, { Schema } from 'mongoose';
const LeaderboardSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    updatedAt: { type: Date, default: () => new Date() },
});
const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', LeaderboardSchema);
export default Leaderboard;
