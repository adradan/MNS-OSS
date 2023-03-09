import initAuth from '@/shared/services/auth/initAuth';
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyIdToken } from 'next-firebase-auth';
import firestoreDb from '@/shared/firebase/firestore-admin';

initAuth();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method !== 'GET') throw new Error('Unsupported method.');
        const token = req.headers.authorization;
        if (!token)
            return res.status(401).json({
                error: 'Unauthorized',
            });
        const { userId } = req.query;
        const user = await verifyIdToken(token);
        const id = user.id;
        if (!id || (id && id !== userId)) throw new Error('Invalid ID.');
        const userCards = await firestoreDb.getUserCards(id);
        return res.status(200).json(userCards);
    } catch (err) {
        return res.status(500).json({
            error: 'Unexpected error.',
        });
    }
}
