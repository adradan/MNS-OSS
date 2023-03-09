import { AuthAction, withAuthUser } from 'next-firebase-auth';
import StyledFirebaseAuth from '@/shared/components/StyledFirebaseAuth';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getApp } from '@firebase/app';

function Login() {
    const authConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: '/',
        signInOptions: [
            {
                provider: GoogleAuthProvider.PROVIDER_ID,
            },
        ],
        credentialHelper: 'none',
        callbacks: {
            signInSuccessWithAuthResult: () => false,
        },
    };

    return (
        <div className="w-100 h-100">
            <div className="w-100 justify-content-around title-text flex items-center px-4">
                login.
            </div>
            <div className="flex justify-around p-4 text-center">
                To avoid abuse, we require users to login with Google to be able
                to submit new messages.
            </div>
            <div className="w-100 flex justify-around">
                <StyledFirebaseAuth
                    uiConfig={authConfig}
                    firebaseAuth={getAuth(getApp())}
                />
            </div>
        </div>
    );
}

export default withAuthUser({
    whenAuthed: AuthAction.REDIRECT_TO_APP,
    whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
    whenUnauthedAfterInit: AuthAction.RENDER,
    appPageURL: '/',
})(Login);
