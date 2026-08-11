import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

const components: Components = {
    h2: ({ children }) => (
        <h2 className="mt-8 font-display text-base font-bold tracking-tight text-ink first:mt-0 sm:text-lg">
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 className="mt-6 font-display text-sm font-semibold text-ink sm:text-base">
            {children}
        </h3>
    ),
    p: ({ children }) => (
        <p className="mt-3 leading-relaxed text-ink/75">{children}</p>
    ),
    ul: ({ children }) => (
        <ul className="mt-3 list-disc space-y-2 ps-5 text-ink/75">{children}</ul>
    ),
    ol: ({ children }) => (
        <ol className="mt-3 list-decimal space-y-2 ps-5 text-ink/75">{children}</ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    strong: ({ children }) => (
        <strong className="font-semibold text-ink">{children}</strong>
    ),
    code: ({ children }) => (
        <code className="rounded bg-ink/6 px-1.5 py-0.5 font-mono text-[0.85em] text-ink/85">
            {children}
        </code>
    ),
    a: ({ href, children }) => (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
        >
            {children}
        </a>
    ),
};

type Props = {
    content: string;
};

export default function PortfolioMarkdown({ content }: Props) {
    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {content}
        </ReactMarkdown>
    );
}
