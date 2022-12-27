import React from 'react';

export interface Genre {
    name: string;
    email: string;
}

export interface IUser {
    _id: string;
    email: string;
    password: string;
    name?: string;
    image?: string;
    lastOnline?: string;
    createdAt?: string;
    isSubscribed: false;
    stripe_customer?: string;
    is_sub?: boolean;
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
