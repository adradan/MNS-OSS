export default function About() {
    return (
        <div className="h-100 w-100 flex flex-col p-4">
            <div className="title-text mb-6 text-center">about us.</div>
            <div className="grow px-4 text-center">
                <div>
                    Made to be a replica of{' '}
                    <span>
                        <a
                            href="https://theunsentproject.com/"
                            className="font-medium"
                        >
                            The Unsent Project
                        </a>
                    </span>
                    .
                </div>
                <div>Created by Eric.</div>
            </div>
        </div>
    );
}
