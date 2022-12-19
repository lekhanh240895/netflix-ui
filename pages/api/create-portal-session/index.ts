import { NextApiRequest, NextApiResponse } from 'next';

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2022-11-15',
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const sessionId: string | null = req.body.sessionId as string;
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

    try {
        // This is the url to which the customer will be redirected when they are done
        // managing their billing with the portal.
        const returnUrl = req.headers.origin;

        const portalSession = await stripe.billingPortal.sessions.create({
            customer: checkoutSession.customer as string,
            return_url: returnUrl,
        });
        res.status(200).json(portalSession);
    } catch (err) {
        const errorMessage =
            err instanceof Error ? err.message : 'Internal server error';
        res.status(500).json({ statusCode: 500, message: errorMessage });
    }
}
