import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

export default function TextLink({
    href,
    children,
    className,
    external,
}: {
    href: string;
    children: React.ReactNode;
    className?: string;
    external?: boolean;
}) {
    const classes = cn('text-link', className);

    if (external) {
        return (
            <a href={href} target="_blank" rel="noreferrer" className={classes}>
                {children}
            </a>
        );
    }

    return (
        <Link href={href} className={classes}>
            {children}
        </Link>
    );
}
