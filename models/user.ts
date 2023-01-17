// models/user.js

import mongoose, { Schema } from 'mongoose';
import { IUser } from '../typings';

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, default: '' },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        stripe_customer: { type: String, default: '', unique: true },
        is_sub: { type: Boolean, default: false },
        myList: {
            type: Schema.Types.ObjectId,
            ref: 'List',
        },
        likes: [{ type: Number }],
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export default mongoose.models.User ||
    mongoose.model<IUser>('User', UserSchema);
