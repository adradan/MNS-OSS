import { init } from 'next-firebase-auth';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const initAuth = () => {
    console.log('apikey', process.env.FIREBASE_CLIENT_API_KEY);
    const clientConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_API_KEY || '', // required
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
        databaseURL: '',
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_BUCKET || '',
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID || '',
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
    };
    const app = initializeApp(clientConfig);
    init({
        debug: process.env.NODE_ENV == 'production' ? false : true,
        authPageURL: '/login',
        appPageURL: '/',
        loginAPIEndpoint: '/api/login',
        logoutAPIEndpoint: '/api/logout',
        onLoginRequestError: (err) => {
            console.error(err);
        },
        onLogoutRequestError: (err) => {
            console.error(err);
        },
        firebaseAdminInitConfig: {
            credential: {
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
                clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL || '',
                // The private key must not be accessible on the client side.
                privateKey:
                    process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') ||
                    '',
            },
            databaseURL: '',
        },
        // Use application default credentials (takes precedence over firebaseAdminInitConfig if set)
        // useFirebaseAdminDefaultCredential: true,
        firebaseClientInitConfig: clientConfig,
        cookies: {
            name: 'MNS', // required
            // Keys are required unless you set `signed` to `false`.
            // The keys cannot be accessible on the client side.
            keys: [
                process.env.COOKIE_SECRET_CURRENT,
                process.env.COOKIE_SECRET_PREVIOUS,
            ],
            httpOnly: true,
            maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
            overwrite: true,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV == 'production' ? true : false, // set this to false in local (non-HTTPS) development
            signed: true,
        },
        onVerifyTokenError: (err) => {
            console.error(err);
        },
        onTokenRefreshError: (err) => {
            console.error(err);
        },
    });
    return getAuth(app);
};

export default initAuth;
