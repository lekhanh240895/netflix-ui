import { FieldValue } from 'firebase/firestore';
import React from 'react';

export interface Genre {
    name: string;
    email: string;
}

export interface IUser {
    _id: {
        id: string;
    };
    id: string;
    email: string;
    password: string;
    name?: string;
    uid?: string;
    image?: string;
    lastOnline?: string | FieldValue;
    createdAt?: string | FieldValue;
}

export interface Movie {
    title: string;
    backdrop_path: string;
    media_type?: string;
    release_date?: string;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
}

export interface Element {
    type:
        | 'Bloopers'
        | 'Featurette'
        | 'Behind the Scenes'
        | 'Clip'
        | 'Trailer'
        | 'Teaser';
}

interface Plan {
    id: string;
    name: string;
    price: number;
    interval: string;
    currency: string;
    quality: string;
    resolution: string;
    devices: string;
}
