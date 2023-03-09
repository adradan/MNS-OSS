import Link from 'next/link';
import styles from './nav-bar.module.css';

import { AuthAction, useAuthUser, withAuthUser } from 'next-firebase-auth';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';

function NavBar() {
    const router = useRouter();
    const authUser = useAuthUser();
    const [show, setShow] = useState(false);

    let button: any;
    if (authUser.id) {
        button = {
            link: '/cards/submit',
            text: 'submit',
        };
    } else {
        button = {
            link: '/login',
            text: 'login',
        };
    }

    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);
    const goToHome = () => {
        router.push('/');
    };

    return (
        <>
            <div className="hidden md:m-8 md:flex md:h-24 md:items-center md:justify-around">
                <div className="flex grow justify-start">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="80"
                        height="80"
                        viewBox="0 0 80 80"
                        className="cursor-pointer"
                        onClick={goToHome}
                    >
                        <path d="M 5 14 L 5 68 L 56.257812 68 L 54.257812 66 L 7 66 L 7 23.533203 L 35.998047 43.742188 C 38.399524 45.416578 41.60015 45.415895 44.001953 43.742188 L 73 23.533203 L 73 61.253906 L 75 63.253906 L 75 14 L 5 14 z M 7 16 L 73 16 L 73 21.095703 L 42.859375 42.101562 C 41.139343 43.300829 38.86261 43.300829 37.142578 42.101562 L 7 21.095703 L 7 16 z M 12 28 A 1 1 0 0 0 11 29 A 1 1 0 0 0 12 30 A 1 1 0 0 0 13 29 A 1 1 0 0 0 12 28 z M 68 28 A 1 1 0 0 0 67 29 A 1 1 0 0 0 68 30 A 1 1 0 0 0 69 29 A 1 1 0 0 0 68 28 z M 12 32 A 1 1 0 0 0 11 33 A 1 1 0 0 0 12 34 A 1 1 0 0 0 13 33 A 1 1 0 0 0 12 32 z M 68 32 A 1 1 0 0 0 67 33 A 1 1 0 0 0 68 34 A 1 1 0 0 0 69 33 A 1 1 0 0 0 68 32 z M 12 36 A 1 1 0 0 0 11 37 A 1 1 0 0 0 12 38 A 1 1 0 0 0 13 37 A 1 1 0 0 0 12 36 z M 68 36 A 1 1 0 0 0 67 37 A 1 1 0 0 0 68 38 A 1 1 0 0 0 69 37 A 1 1 0 0 0 68 36 z M 12 40 A 1 1 0 0 0 11 41 A 1 1 0 0 0 12 42 A 1 1 0 0 0 13 41 A 1 1 0 0 0 12 40 z M 68 40 A 1 1 0 0 0 67 41 A 1 1 0 0 0 68 42 A 1 1 0 0 0 69 41 A 1 1 0 0 0 68 40 z M 12 44 A 1 1 0 0 0 11 45 A 1 1 0 0 0 12 46 A 1 1 0 0 0 13 45 A 1 1 0 0 0 12 44 z M 68 44 A 1 1 0 0 0 67 45 A 1 1 0 0 0 68 46 A 1 1 0 0 0 69 45 A 1 1 0 0 0 68 44 z M 12 48 A 1 1 0 0 0 11 49 A 1 1 0 0 0 12 50 A 1 1 0 0 0 13 49 A 1 1 0 0 0 12 48 z M 68 48 A 1 1 0 0 0 67 49 A 1 1 0 0 0 68 50 A 1 1 0 0 0 69 49 A 1 1 0 0 0 68 48 z M 49.078125 48.003906 C 48.792281 47.982813 48.505672 48.085672 48.294922 48.294922 C 48.015922 48.573922 47.927359 48.990375 48.068359 49.359375 L 51.873047 59.251953 C 51.924047 59.382953 52.000609 59.501609 52.099609 59.599609 L 71.09375 78.59375 C 72.00175 79.50075 73.207234 80.001953 74.490234 80.001953 C 75.774234 80.001953 76.979719 79.50075 77.886719 78.59375 L 78.59375 77.886719 C 80.46775 76.012719 80.468703 72.964797 78.595703 71.091797 L 59.601562 52.099609 C 59.502563 52.000609 59.383906 51.922094 59.253906 51.871094 L 49.361328 48.066406 C 49.269078 48.031656 49.173406 48.010937 49.078125 48.003906 z M 52.625 51.466797 L 57.814453 53.460938 C 57.744453 53.810938 57.625781 54.180859 57.425781 54.380859 C 57.077781 54.728859 56.212563 54.846609 55.851562 54.849609 L 54.851562 54.849609 L 54.851562 55.849609 C 54.851562 56.196609 54.732812 57.076781 54.382812 57.425781 C 54.181812 57.626781 53.812891 57.7425 53.462891 57.8125 L 51.466797 52.623047 L 52.625 51.466797 z M 12 52 A 1 1 0 0 0 11 53 A 1 1 0 0 0 12 54 A 1 1 0 0 0 13 53 A 1 1 0 0 0 12 52 z M 68 52 A 1 1 0 0 0 67 53 A 1 1 0 0 0 68 54 A 1 1 0 0 0 69 53 A 1 1 0 0 0 68 52 z M 59.482422 54.808594 L 71.632812 66.957031 L 66.957031 71.630859 L 54.810547 59.482422 C 55.163547 59.330422 55.509875 59.126844 55.796875 58.839844 C 56.389875 58.246844 56.650672 57.404719 56.763672 56.761719 C 57.405672 56.647719 58.246844 56.389875 58.839844 55.796875 C 59.127844 55.508875 59.330422 55.162594 59.482422 54.808594 z M 12 56 A 1 1 0 0 0 11 57 A 1 1 0 0 0 12 58 A 1 1 0 0 0 13 57 A 1 1 0 0 0 12 56 z M 12 60 A 1 1 0 0 0 11 61 A 1 1 0 0 0 12 62 A 1 1 0 0 0 13 61 A 1 1 0 0 0 12 60 z M 16 60 A 1 1 0 0 0 15 61 A 1 1 0 0 0 16 62 A 1 1 0 0 0 17 61 A 1 1 0 0 0 16 60 z M 20 60 A 1 1 0 0 0 19 61 A 1 1 0 0 0 20 62 A 1 1 0 0 0 21 61 A 1 1 0 0 0 20 60 z M 24 60 A 1 1 0 0 0 23 61 A 1 1 0 0 0 24 62 A 1 1 0 0 0 25 61 A 1 1 0 0 0 24 60 z M 28 60 A 1 1 0 0 0 27 61 A 1 1 0 0 0 28 62 A 1 1 0 0 0 29 61 A 1 1 0 0 0 28 60 z M 32 60 A 1 1 0 0 0 31 61 A 1 1 0 0 0 32 62 A 1 1 0 0 0 33 61 A 1 1 0 0 0 32 60 z M 36 60 A 1 1 0 0 0 35 61 A 1 1 0 0 0 36 62 A 1 1 0 0 0 37 61 A 1 1 0 0 0 36 60 z M 40 60 A 1 1 0 0 0 39 61 A 1 1 0 0 0 40 62 A 1 1 0 0 0 41 61 A 1 1 0 0 0 40 60 z M 44 60 A 1 1 0 0 0 43 61 A 1 1 0 0 0 44 62 A 1 1 0 0 0 45 61 A 1 1 0 0 0 44 60 z M 48 60 A 1 1 0 0 0 47 61 A 1 1 0 0 0 48 62 A 1 1 0 0 0 49 61 A 1 1 0 0 0 48 60 z M 73.046875 68.371094 L 75.632812 70.957031 L 70.957031 75.630859 L 68.371094 73.044922 L 73.046875 68.371094 z M 77.046875 72.371094 L 77.181641 72.505859 C 78.273641 73.599859 78.273641 75.378656 77.181641 76.472656 L 76.474609 77.179688 C 75.416609 78.238687 73.569812 78.239688 72.507812 77.179688 L 72.371094 77.044922 L 77.046875 72.371094 z"></path>
                    </svg>
                </div>
                <div className="flex justify-around">
                    <Link href="/" className={styles.navLink}>
                        home
                    </Link>
                    <Link href="/about" className={styles.navLink}>
                        about
                    </Link>
                    <Link href="/cards/browse" className={styles.navLink}>
                        browse
                    </Link>
                    {authUser.id && (
                        <Link className={styles.navLink} href={'/logout'}>
                            logout
                        </Link>
                    )}
                </div>
                <div className="flex grow justify-end">
                    <Link
                        href={button.link}
                        className="rounded-lg bg-black px-4 py-3 font-medium text-white hover:!text-white"
                    >
                        {button.text}
                    </Link>
                </div>
            </div>
            <div className="m-8 flex h-24 items-center justify-around md:hidden">
                <div
                    className="cursor-pointer justify-start"
                    onClick={goToHome}
                >
                    messages never sent.
                </div>
                <div className="grow"></div>
                <div className="justify-end">
                    <div className="cursor-pointer" onClick={handleOpen}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="30"
                            height="30"
                            viewBox="0 0 50 50"
                        >
                            <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="border-white p-4 pb-0">
                    <div>messages never sent.</div>
                    <button
                        className="focus:outline-none"
                        onClick={handleClose}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="20"
                            height="20"
                            viewBox="0 0 50 50"
                        >
                            <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
                        </svg>
                    </button>
                </Modal.Header>
                <Modal.Body className="flex flex-col">
                    <Link
                        className={styles.navModalLink}
                        href="/"
                        onClick={handleClose}
                    >
                        home
                    </Link>
                    <Link
                        className={styles.navModalLink}
                        href="/about"
                        onClick={handleClose}
                    >
                        about
                    </Link>
                    <Link
                        className={styles.navModalLink}
                        href="/cards/browse"
                        onClick={handleClose}
                    >
                        browse
                    </Link>
                    {authUser.id && (
                        <Link
                            className={styles.navModalLink}
                            href={'/logout'}
                            onClick={handleClose}
                        >
                            logout
                        </Link>
                    )}
                    <Link
                        className="m-2 rounded-lg bg-black p-2 text-center font-medium text-white hover:!text-white"
                        href={button.link}
                        onClick={handleClose}
                    >
                        {button.text}
                    </Link>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default withAuthUser({
    whenUnauthedBeforeInit: AuthAction.RENDER,
    whenUnauthedAfterInit: AuthAction.RENDER,
    whenAuthed: AuthAction.RENDER,
})(NavBar);
