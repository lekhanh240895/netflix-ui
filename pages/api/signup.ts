// pages/api/signup.js

import dbConnect from '../../lib/connectDB';
import User from '../../models/user';
import jwt from 'jsonwebtoken';
import { setCookies } from 'cookies-next';
import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    await dbConnect();

    const { name, email, password } = req.body;

    if (req.method === 'POST') {
        const userExist = await User.findOne({ email });

        if (userExist)
            return res.status(422).json({ message: 'Email already in use!' });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = new User({ name, email, password: hashPassword });
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
            expiresIn: '1d',
        });

        setCookies('token', token, {
            req,
            res,
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        res.status(201).json(user);
    } else {
        res.status(424).json({ message: 'Invalid method!' });
    }
}
