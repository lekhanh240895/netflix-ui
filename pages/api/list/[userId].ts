import { NextApiRequest, NextApiResponse } from 'next';
import List from '../../../models/list';
import dbConnect from '../../../lib/connectDB';
import { IList } from '../../../typings';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {
        method,
        body: { selectedMovie },
        query: { userId },
    } = req;

    switch (method) {
        case 'GET':
            try {
                await dbConnect();

                const list = await List.findOne({ user: userId });

                return res.json(list);
            } catch (err) {
                const errorMessage =
                    err instanceof Error
                        ? err.message
                        : 'Internal server error';
                return res.status(500).json({ error: errorMessage });
            }
        case 'DELETE':
            try {
                await dbConnect();
                // Delete a List
                const list = await List.findOneAndDelete({ user: userId });
                return res.status(201).json('Movie deleted!');
            } catch (err) {
                const errorMessage =
                    err instanceof Error
                        ? err.message
                        : 'Internal server error';
                return res.status(500).json({ error: errorMessage });
            }
        case 'PUT':
            try {
                await dbConnect();

                const userList: IList | null = await List.findOne({
                    user: userId,
                });

                if (!userList) {
                    const list = new List({
                        movies: [selectedMovie],
                        user: userId,
                    });
                    await list.save();

                    return res.status(201).json(list);
                }

                if (
                    userList.movies.some(
                        (movie) => movie.id === selectedMovie.id,
                    )
                ) {
                    const list = await List.findOneAndUpdate(
                        { user: userId },
                        {
                            $pull: {
                                movies: {
                                    id: selectedMovie.id,
                                },
                            },
                        },
                        {
                            new: true,
                        },
                    );

                    return res.status(200).json(list);
                } else {
                    const list = await List.findOneAndUpdate(
                        { user: userId },
                        {
                            $push: {
                                movies: selectedMovie,
                            },
                        },
                        {
                            new: true,
                        },
                    );
                    return res.status(200).json(list);
                }
            } catch (err) {
                const errorMessage =
                    err instanceof Error
                        ? err.message
                        : 'Internal server error';
                return res.status(500).json({ error: errorMessage });
            }
        default:
            res.status(424).json({ message: 'Invalid method!' });
    }
}
