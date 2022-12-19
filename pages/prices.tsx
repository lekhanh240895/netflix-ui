import React from 'react';
import Stripe from 'stripe';

interface Plan {
    id: string;
    name: string;
    price: number;
    interval: string;
    currency: string;
    quality: string;
    resolution: string;
    devices: string;
}

interface Props {
    prices: Stripe.Price[];
    plans: Plan[];
}

function Pricing({ plans }: Props) {
    return <pre>{JSON.stringify(plans, null, 2)}</pre>;
}

export default Pricing;

export const getStaticProps = async () => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        // https://github.com/stripe/stripe-node#configuration
        apiVersion: '2022-11-15',
    });

    const { data: prices } = await stripe.prices.list();

    const plans = await Promise.all(
        prices.map(async (price) => {
            const product = await stripe.products.retrieve(
                price.product as string,
            );

            return {
                id: price.id,
                name: product.name,
                price: price.unit_amount,
                interval: price.recurring?.interval,
                currency: price.currency,
                quality: product.metadata.quality,
                resolution: product.metadata.resolution,
                devices: product.metadata.devices,
            };
        }),
    );

    return {
        props: {
            plans,
        },
    };
};
