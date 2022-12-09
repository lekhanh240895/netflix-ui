import { NextApiRequest, NextApiResponse } from 'next';

import Stripe from 'stripe';
import getUser from '../../../lib/getUser';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2022-11-15',
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        // This is the url to which the customer will be redirected when they are done
        // managing their billing with the portal.
        const returnUrl = req.headers.origin;

        const user = await getUser(req, res);

        if (user?.stripe_customer) {
            const portalSession = await stripe.billingPortal.sessions.create({
                customer: user.stripe_customer,
                return_url: returnUrl,
            });
            res.status(200).json({
                url: portalSession.url,
            });
        } else {
            res.status(400).json({
                error: 'User not found!',
            });
        }
    } catch (err) {
        const errorMessage =
            err instanceof Error ? err.message : 'Internal server error';
        res.status(500).json({ statusCode: 500, message: errorMessage });
    }
}
