// pages/api/signup.js

import dbConnect from '../../../lib/connectDB';
import User from '../../../models/user';
import jwt from 'jsonwebtoken';
import { setCookie } from 'cookies-next';
import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

type Data = {
    message: string;
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2022-11-15',
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    await dbConnect();

    const { email, password } = req.body;

    if (req.method === 'POST') {
        const userExist = await User.findOne({ email });

        if (userExist)
            return res.status(422).json({ message: 'Email already in use!' });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create stripe customer for user
        const customer = await stripe.customers.create({
            email,
        });

        const user = new User({
            email,
            password: hashPassword,
            stripe_customer: customer.id,
        });
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
            expiresIn: '1d',
        });

        setCookie('token', token, {
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
