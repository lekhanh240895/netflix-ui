import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../../models/user';
import bcrypt from 'bcrypt';
import dbConnect from '../../../../lib/connectDB';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {
        method,
        body,
        query: { _id },
    } = req;

    switch (method) {
        case 'GET':
            try {
                await dbConnect();

                const user = await User.findById(_id);
                return res.status(200).json({ user });
            } catch (err) {
                const errorMessage =
                    err instanceof Error
                        ? err.message
                        : 'Internal server error';
                return res.status(500).json({ error: errorMessage });
            }
        case 'PUT':
            try {
                await dbConnect();

                if (body.password) {
                    try {
                        const salt = await bcrypt.genSalt(10);
                        body.password = await bcrypt.hash(body.password, salt);
                    } catch (err) {
                        res.status(500).json({ error: err });
                    }
                }

                const user = await User.findOneAndUpdate({ _id }, body, {
                    new: true,
                    runValidators: true,
                });

                return res.json({ user });
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
