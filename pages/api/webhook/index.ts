import { buffer } from 'micro';
import Cors from 'micro-cors';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import user from '../../../models/user';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15',
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

export const config = {
    api: {
        bodyParser: false,
    },
};

const cors = Cors({
    allowMethods: ['POST', 'HEAD'],
});

interface IObject extends Stripe.Event.Data.Object {
    customer?: string;
    start_date?: string;
}

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const buf = await buffer(req);
        const sig = req.headers['stripe-signature']!;

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : 'Unknown error';
            console.log(`❌ Error message: ${errorMessage}`);
            res.status(400).send(`Webhook Error: ${errorMessage}`);
            return;
        }

        const object: IObject = event.data.object;

        switch (event.type) {
            case 'customer.subscription.created':
                await user.findOneAndUpdate(
                    { stripe_customer: object.customer },
                    { is_sub: true },
                    { new: true },
                );
                break;
            case 'customer.subscription.updated':
                await user.findOneAndUpdate(
                    { stripe_customer: object.customer },
                    { is_sub: true },
                    { new: true },
                );
                break;
            case 'customer.subscription.deleted':
                await user.findOneAndUpdate(
                    { stripe_customer: object.customer },
                    { is_sub: false },
                    { new: true },
                );
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        res.json({ received: true });
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
};

export default cors(webhookHandler as any);
