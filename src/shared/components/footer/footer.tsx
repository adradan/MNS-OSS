import GithubIcon from '@/shared/components/github-icon/github-icon';

export function Footer() {
    const githubClick = () => {
        window.open('https://github.com/adradan', '_blank')?.focus();
    };

    return (
        <div className="px-4 py-2">
            <div>
                <div className="w-fit cursor-pointer" onClick={githubClick}>
                    <GithubIcon height={40} width={40} />
                </div>
            </div>
        </div>
    );
}
