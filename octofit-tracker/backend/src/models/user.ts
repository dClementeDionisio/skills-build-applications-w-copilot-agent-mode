import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: string;
  team: mongoose.Types.ObjectId | null;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: 'member' },
  team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
  createdAt: { type: Date, default: () => new Date() },
});

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
