import initAuth from '@/shared/services/auth/initAuth';
import { NextApiRequest, NextApiResponse } from 'next';
import { setAuthCookies } from 'next-firebase-auth';

initAuth();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await setAuthCookies(req, res);
    } catch (err) {
        return res.status(500).json({
            error: 'Unexpected error.',
        });
    }
    return res.status(200).json({ success: true });
}
