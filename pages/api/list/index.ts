import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/connectDB';
import List from '../../../models/list';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { method, body } = req;

    switch (method) {
        case 'GET':
            try {
                await dbConnect();

                const list = await List.find();
                return res.json(list);
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
