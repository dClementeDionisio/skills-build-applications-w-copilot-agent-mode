import mongoose, { Schema } from 'mongoose';
const TeamSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: () => new Date() },
});
const Team = mongoose.models.Team || mongoose.model('Team', TeamSchema);
export default Team;
