import { usePage } from '@inertiajs/react';
import { PropsWithChildren, useEffect } from 'react';
import SiteHeader from '@/Components/SiteHeader';
import type { PageProps } from '@/types';
import { useT } from '@/lib/utils';

export default function AppLayout({
    children,
    title,
}: PropsWithChildren<{ title?: string }>) {
    const { locale = 'en', dir = 'ltr' } = usePage<PageProps>().props;
    const t = useT();

    useEffect(() => {
        document.documentElement.lang = locale;
        document.documentElement.dir = dir;
    }, [locale, dir]);

    return (
        <div className="min-h-screen bg-paper text-ink">
            <SiteHeader />

            <main>{children}</main>

            <footer className="site-footer">
                <div className="site-footer-inner">
                    <p>
                        © {new Date().getFullYear()} Adham Mansour.{' '}
                        {t('footer.rights')}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                        <a
                            href="https://github.com/Adhammansouri"
                            target="_blank"
                            rel="noreferrer"
                            className="text-link-muted"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://www.linkedin.com/in/adham-mansour11/"
                            target="_blank"
                            rel="noreferrer"
                            className="text-link-muted"
                        >
                            LinkedIn
                        </a>
                        <a href="/resume" className="text-link-muted">
                            {t('nav.cv')}
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
