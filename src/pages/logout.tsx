import { AuthAction, withAuthUser } from 'next-firebase-auth';
import { getAuth } from 'firebase/auth';
import { getApp } from '@firebase/app';

function Logout() {
    const auth = getAuth(getApp());

    const signOut = () => auth.signOut();
    return (
        <div className="w-100 h-100">
            <div className="w-100 justify-content-around title-text flex items-center px-4">
                logout.
            </div>
            <div className="flex justify-around p-4 text-center">
                By logging out, you will have to log back in to submit new
                messages.
            </div>
            <div className="w-100 flex justify-around">
                <div className="w-fit rounded-md border-2 border-solid border-gray-500">
                    <button
                        type="button"
                        onClick={signOut}
                        className="w-100 px-4 py-2"
                    >
                        Logout of Google.
                    </button>
                </div>
            </div>
        </div>
    );
}

export default withAuthUser({
    whenAuthed: AuthAction.RENDER,
    whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
    authPageURL: '/login',
})(Logout);
