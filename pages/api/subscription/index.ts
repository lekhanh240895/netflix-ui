import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import User from '../../../models/user';
import { getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2022-11-15',
});

interface Data {
    userId: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === 'POST') {
        const priceId: string = req.body.priceId as string;
        const token = getCookie('token', { req, res }) as string;

        if (!token) {
            return res.status(401).send('Unauthorized');
        }

        const data = jwt.verify(token, process.env.TOKEN_SECRET) as Data;
        const user = await User.findById(data.userId).select('-password');

        try {
            // Create Checkout Sessions from body params.
            const params: Stripe.Checkout.SessionCreateParams = {
                payment_method_types: ['card'],
                mode: 'subscription',
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                success_url: `${req.headers.origin}/`,
                cancel_url: `${req.headers.origin}/planform`,
                customer: user.stripe_customer,
            };
            const checkoutSession: Stripe.Checkout.Session =
                await stripe.checkout.sessions.create(params);

            res.status(200).json(checkoutSession);
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : 'Internal server error';
            res.status(500).json({
                statusCode: 500,
                message: errorMessage,
            });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
