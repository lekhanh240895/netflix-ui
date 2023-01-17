// pages/api/signin.js

import dbConnect from '../../../lib/connectDB';
import User from '../../../models/user';
import jwt from 'jsonwebtoken';
import { setCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

interface Data {
    errorMessage: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    await dbConnect();

    const { email, password } = req.body;

    if (req.method === 'POST') {
        const user = await User.findOne({ email });

        if (!user)
            return res
                .status(400)
                .json({ errorMessage: 'Wrong email or password!' });

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            res.status(400).json({
                errorMessage: 'Incorrect password!',
            });
        }

        if (user && validPassword) {
            const token = jwt.sign(
                { userId: user._id },
                process.env.TOKEN_SECRET,
                {
                    expiresIn: '1d',
                },
            );

            setCookie('token', token, {
                req,
                res,
                maxAge: 60 * 60 * 24, // 1 day
                path: '/',
            });

            res.status(200).json(user);
        }
    } else {
        res.status(424).json({ errorMessage: 'Invalid method!' });
    }
}
