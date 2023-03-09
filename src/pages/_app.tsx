import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import type { AppProps } from 'next/app';
import NavBar from '@/shared/components/nav-bar';
import initAuth from '@/shared/services/auth/initAuth';
import { Footer } from '@/shared/components/footer/footer';

initAuth();

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className="h-100 flex flex-col">
            <div className="nav-bar">
                <NavBar />
            </div>
            <div className="page-content grow">
                <Component {...pageProps} />
            </div>
            <div className="footer">
                <Footer />
            </div>
        </div>
    );
}
