import type { ReactNode } from 'react';

type IconProps = { className?: string };

function IconBase({
    className = 'h-5 w-5',
    children,
}: {
    className?: string;
    children: ReactNode;
}) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
        >
            {children}
        </svg>
    );
}

export function NavWorkIcon({ className }: IconProps) {
    return (
        <IconBase className={className}>
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
        </IconBase>
    );
}

export function NavExperienceIcon({ className }: IconProps) {
    return (
        <IconBase className={className}>
            <path d="M12 3v18" />
            <path d="M5 8h14" />
            <path d="M7 8v11" />
            <path d="M17 8v11" />
            <circle cx="12" cy="5" r="2" />
        </IconBase>
    );
}

export function NavAboutIcon({ className }: IconProps) {
    return (
        <IconBase className={className}>
            <circle cx="12" cy="8" r="4" />
            <path d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7" />
        </IconBase>
    );
}

export function NavContactIcon({ className }: IconProps) {
    return (
        <IconBase className={className}>
            <path d="M4 6h16v12H4z" />
            <path d="m4 7 8 6 8-6" />
        </IconBase>
    );
}

export function DownloadIcon({ className }: IconProps) {
    return (
        <IconBase className={className}>
            <path d="M12 4v10" />
            <path d="m8.5 10.5 3.5 3.5 3.5-3.5" />
            <path d="M5 18h14" />
        </IconBase>
    );
}

export function GlobeIcon({ className }: IconProps) {
    return (
        <IconBase className={className}>
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18" />
            <path d="M12 3c2.5 2.8 3.8 6.2 3.8 9s-1.3 6.2-3.8 9" />
            <path d="M12 3c-2.5 2.8-3.8 6.2-3.8 9s1.3 6.2 3.8 9" />
        </IconBase>
    );
}

export function ArrowEndIcon({ className }: IconProps) {
    return (
        <IconBase className={className}>
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
        </IconBase>
    );
}

export function CloseIcon({ className }: IconProps) {
    return (
        <IconBase className={className}>
            <path d="M6 6l12 12" />
            <path d="M18 6 6 18" />
        </IconBase>
    );
}

export const navIcons = {
    work: NavWorkIcon,
    experience: NavExperienceIcon,
    about: NavAboutIcon,
    contact: NavContactIcon,
} as const;
