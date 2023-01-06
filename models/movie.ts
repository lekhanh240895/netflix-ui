// models/user.js

import mongoose from 'mongoose';
import { Movie } from '../typings';

const MovieSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    email: { type: String, required: true },
    password: { type: String, required: true },
    stripe_customer: { type: String, default: '' },
    is_sub: { type: Boolean, default: false },
});

export default mongoose.models.User ||
    mongoose.model<Movie>('Movie', MovieSchema);
