import { Inter } from 'next/font/google';
import Typewriter from 'typewriter-effect';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <div className="w-100 flex-col content-center justify-center">
            <div className="w-100 justify-content-around title-text flex h-36 items-center px-4">
                <Typewriter
                    options={{
                        strings: ['messages never sent.'],
                        autoStart: true,
                        loop: true,
                    }}
                ></Typewriter>
            </div>
            <div className="grow px-4 text-center font-medium">
                <div>A collection of messages that we wish were sent.</div>
                <div>Get started by logging in at the top right.</div>
            </div>
        </div>
    );
}
