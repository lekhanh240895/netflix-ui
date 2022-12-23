import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/user';
import dbConnect from '../../../lib/connectDB';
import bcrypt from 'bcrypt';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        await dbConnect();
        const { _id } = req.query;

        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                res.status(500).json({ error: err });
            }
        }

        const user = await User.findOneAndUpdate({ _id }, req.body, {
            new: true,
        });

        console.log(user);

        res.json(user);
    } catch (err) {
        const errorMessage =
            err instanceof Error ? err.message : 'Internal server error';
        throw new Error(errorMessage);
    }
}
