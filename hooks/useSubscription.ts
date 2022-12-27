import { useEffect, useState } from 'react';
import { useAppSelector } from './hooks';
import { authSelector } from '../redux/selector';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2022-11-15',
});

function useSubscribe() {
    const [subscription, setSubscription] = useState<boolean>(false);
    const { user } = useAppSelector(authSelector);

    useEffect(() => {
        if (!user) {
            return;
        }

        (async function () {
            const subscriptions = await stripe.subscriptions.list();
        })();
    }, [user]);

    return subscription;
}

export default useSubscribe;
