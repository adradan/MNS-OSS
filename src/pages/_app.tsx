import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import NavBar from '@/shared/components/nav-bar';
import initAuth from '@/shared/services/auth/initAuth';
import { Footer } from '@/shared/components/footer/footer';

initAuth();

const inter = Inter({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    fallback: ['Helvetica', 'Arial', 'sans-serif'],
    subsets: ['latin'],
});


export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className={'h-100 flex flex-col ' + inter.className}>
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
