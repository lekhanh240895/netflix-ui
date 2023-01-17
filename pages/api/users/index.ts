import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/user';
import dbConnect from '../../../lib/connectDB';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { method, body } = req;

    switch (method) {
        case 'GET':
            try {
                await dbConnect();

                const users = await User.find();

                return res.json(users);
            } catch (err) {
                const errorMessage =
                    err instanceof Error
                        ? err.message
                        : 'Internal server error';
                return res.status(500).json({ error: errorMessage });
            }
        default:
            res.status(424).json({ message: 'Invalid method!' });
    }
}
