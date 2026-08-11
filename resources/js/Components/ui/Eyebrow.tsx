import { cn } from '@/lib/utils';

export default function Eyebrow({
    children,
    className,
    dot = false,
}: {
    children: React.ReactNode;
    className?: string;
    dot?: boolean;
}) {
    return (
        <p className={cn('eyebrow', dot && 'eyebrow-dot', className)}>
            {children}
        </p>
    );
}
