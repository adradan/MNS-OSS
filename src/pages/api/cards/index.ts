import initAuth from '@/shared/services/auth/initAuth';
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyIdToken } from 'next-firebase-auth';
import { Card } from '@/shared/models/Card';
import firestoreDb from '@/shared/firebase/firestore-admin';

initAuth();

const postRequest = async (
    req: NextApiRequest,
    res: NextApiResponse,
    token: string
) => {
    try {
        const incomingCard = req.body as Card;
        const user = await verifyIdToken(token);
        const id = user.id;
        if (!id) throw new Error('No user ID.');
        await colorValidator(incomingCard.color || '');
        authorValidator(incomingCard.author || '', id);
        if (!incomingCard.message || !incomingCard.sendTo)
            throw new Error('Incomplete Card.');

        const newCard = {
            ...incomingCard,
            author: id,
        };

        await firestoreDb.createCard(newCard);
        return res.status(200).json(newCard);
    } catch (err) {
        const error = err as any;
        console.log(error.message);
        return res.status(500).json({
            error: 'Unexpected error.',
        });
    }
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = req.headers.authorization;
    if (!token)
        return res.status(401).json({
            error: 'Unauthorized',
        });
    if (req.method == 'POST') {
        return await postRequest(req, res, token);
    } else {
        return res.status(200).json({
            msg: 'Cool.',
        });
    }
}

async function colorValidator(color: string) {
    const colors = await firestoreDb.getColors();
    for (const val of Object.values(colors)) {
        if (val.value == color) return;
    }
    throw new Error('Invalid Color.');
}

function authorValidator(author: string, authId: string) {
    if (author !== authId) throw new Error('Mismatched author.');
}
