import mongoose, { Schema } from 'mongoose';
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: 'member' },
    team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    createdAt: { type: Date, default: () => new Date() },
});
const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
