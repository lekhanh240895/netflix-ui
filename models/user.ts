// models/user.js

import mongoose from 'mongoose';
import { IUser } from '../typings';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export default mongoose.models.User ||
    mongoose.model<IUser>('User', UserSchema);
