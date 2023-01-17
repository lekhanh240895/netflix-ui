// models/user.js

import mongoose, { Schema } from 'mongoose';
import { IList } from '../typings';

const ListSchema = new mongoose.Schema(
    {
        movies: [
            {
                id: { type: Number },
                title: { type: String },
                backdrop_path: { type: String },
                media_type: { type: String },
                release_date: { type: String },
                first_air_date: { type: String },
                genre_ids: { type: [Number] },
                name: { type: String },
                origin_country: { type: String },
                original_language: { type: String },
                original_name: { type: String },
                overview: { type: String },
                popularity: { type: Number },
                poster_path: { type: String },
                vote_average: { type: Number },
                vote_count: { type: Number },
                createdAt: { type: Number },
                updatedAt: { type: Number },
            },
        ],
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export default mongoose.models.List ||
    mongoose.model<IList>('List', ListSchema);
