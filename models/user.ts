// models/user.js

import mongoose from 'mongoose';
import { IUser } from '../typings';

const UserSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    email: { type: String, required: true },
    password: { type: String, required: true },
    stripe_customer: { type: String, default: '' },
    is_sub: { type: Boolean, default: false },
});

export default mongoose.models.User ||
    mongoose.model<IUser>('User', UserSchema);
