import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const client = await clientPromise;
        const db = client.db('Netflix');

        const users = await db.collection('users').find({}).limit(20).toArray();

        res.json(users);
    } catch (err) {
        // const errorMessage =
        //     err instanceof Error ? err.message : 'Internal server error';
        // throw new Error(errorMessage);
        console.log(err);
    }
}
