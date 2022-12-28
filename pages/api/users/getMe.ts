import { getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';
import User from '../../../models/user';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/connectDB';

interface Data {
    userId: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    await dbConnect();

    const token = getCookie('token', { req, res }) as string;

    if (token) {
        try {
            const data = jwt.verify(token, process.env.TOKEN_SECRET) as Data;
            const user = await User.findById(data.userId).select('-password');
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error' });
        }
    } else {
        res.status(404).json({ message: 'Authorization failed!' });
    }
}
