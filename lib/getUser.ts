// lib/getUser.js

import { getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { NextApiRequest, NextApiResponse } from 'next';

interface Data {
    userId: string;
}

export default async function getUser(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const token = getCookie('token', { req, res }) as string;
    if (token) {
        try {
            const data = jwt.verify(token, process.env.TOKEN_SECRET) as Data;
            let user = await User.findById(data.userId).select('-password');
            user = JSON.parse(JSON.stringify(user));
            return user;
        } catch (error) {
            return null;
        }
    }
}
