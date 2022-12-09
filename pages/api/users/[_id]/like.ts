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
        body: { movieId },
        query: { _id },
    } = req;

    switch (method) {
        case 'POST':
            try {
                await dbConnect();

                const user = await User.findOne({ _id });

                if (user.likes.includes(movieId)) {
                    const user = await User.findOneAndUpdate(
                        { _id },
                        {
                            $pull: {
                                likes: movieId,
                            },
                        },
                    );
                    return res.status(200).json(user);
                } else {
                    const user = await User.findOneAndUpdate(
                        { _id },
                        {
                            $push: {
                                likes: movieId,
                            },
                        },
                    );
                    return res.status(200).json(user);
                }
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
