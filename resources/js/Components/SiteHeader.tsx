import { Link, usePage } from '@inertiajs/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
    ArrowEndIcon,
    DownloadIcon,
    GlobeIcon,
    navIcons,
} from '@/Components/NavIcons';
import type { PageProps } from '@/types';
import { cn, localePath, swapLocalePath, useT } from '@/lib/utils';

type NavItem = { href: string; label: string; key: keyof typeof navIcons };

const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

const drawerListMotion = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.055, delayChildren: 0.1 },
    },
};

const drawerItemMotion = {
    hidden: { opacity: 0, y: 12 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.36, ease: EASE_SMOOTH },
    },
};

function isNavActive(path: string, href: string, locale: string): boolean {
    const normalized = path.split('?')[0].replace(/\/$/, '') || `/${locale}`;
    const target = href.replace(/\/$/, '');

    if (target === `/${locale}`) {
        return normalized === `/${locale}`;
    }

    return normalized === target || normalized.startsWith(`${target}/`);
}

function MenuIcon({ open, reduce }: { open: boolean; reduce: boolean | null }) {
    const duration = reduce ? 0 : 0.28;

    return (
        <span className="header-menu-icon" aria-hidden>
            <motion.span
                className="header-menu-line header-menu-line--top"
                animate={
                    open
                        ? { top: '50%', rotate: 45, y: '-50%' }
                        : { top: '22%', rotate: 0, y: 0 }
                }
                transition={{ duration, ease: EASE_SMOOTH }}
            />
            <motion.span
                className="header-menu-line header-menu-line--mid"
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: duration * 0.75, ease: EASE_SMOOTH }}
            />
            <motion.span
                className="header-menu-line header-menu-line--bottom"
                animate={
                    open
                        ? { bottom: '50%', rotate: -45, y: '50%' }
                        : { bottom: '22%', rotate: 0, y: 0 }
                }
                transition={{ duration, ease: EASE_SMOOTH }}
            />
        </span>
    );
}

function useScrollLock(locked: boolean) {
    const scrollYRef = useRef(0);

    useEffect(() => {
        if (!locked) return;

        scrollYRef.current = window.scrollY;
        const { style: bodyStyle } = document.body;
        const { style: htmlStyle } = document.documentElement;

        bodyStyle.position = 'fixed';
        bodyStyle.top = `-${scrollYRef.current}px`;
        bodyStyle.left = '0';
        bodyStyle.right = '0';
        bodyStyle.width = '100%';
        bodyStyle.overflow = 'hidden';
        htmlStyle.overflow = 'hidden';

        return () => {
            bodyStyle.position = '';
            bodyStyle.top = '';
            bodyStyle.left = '';
            bodyStyle.right = '';
            bodyStyle.width = '';
            bodyStyle.overflow = '';
            htmlStyle.overflow = '';
            window.scrollTo(0, scrollYRef.current);
        };
    }, [locked]);
}

export default function SiteHeader() {
    const { locale = 'en', dir = 'ltr' } = usePage<PageProps>().props;
    const page = usePage();
    const t = useT();
    const reduce = useReducedMotion();
    const other = locale === 'ar' ? 'en' : 'ar';

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const nav: NavItem[] = [
        { href: localePath(locale, 'projects'), label: t('nav.work'), key: 'work' },
        { href: localePath(locale, 'experience'), label: t('nav.experience'), key: 'experience' },
        { href: localePath(locale, 'about'), label: t('nav.about'), key: 'about' },
        { href: localePath(locale, 'contact'), label: t('nav.contact'), key: 'contact' },
    ];

    const currentPath =
        (typeof page.url === 'string' ? page.url : `/${locale}`) || `/${locale}`;
    const switchHref = swapLocalePath(currentPath.split('?')[0], locale, other);

    const closeMenu = useCallback(() => setMenuOpen(false), []);
    const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);

    useScrollLock(menuOpen);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        closeMenu();
    }, [currentPath, closeMenu]);

    useEffect(() => {
        if (!menuOpen) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') closeMenu();
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [menuOpen, closeMenu]);

    const slideFrom = dir === 'rtl' ? '-100%' : '100%';
    const drawerTween = reduce
        ? { duration: 0 }
        : { type: 'tween' as const, ease: EASE_SMOOTH, duration: 0.38 };

    return (
        <>
            <header
                className={cn(
                    'site-header',
                    scrolled ? 'site-header--scrolled' : 'site-header--top',
                    menuOpen && 'site-header--menu-open',
                )}
            >
                <div className="header-inner">
                    <Link
                        href={localePath(locale)}
                        className="header-brand group"
                        onClick={closeMenu}
                    >
                        <span className="header-brand-mark">
                            <img
                                src="/images/adham-mansour-logo.png?v=2"
                                alt=""
                                width={64}
                                height={64}
                                decoding="async"
                                className="h-full w-full object-cover"
                            />
                        </span>
                        <span className="header-brand-name">Adham Mansour</span>
                    </Link>

                    <nav className="nav-pill" aria-label="Main">
                        {nav.map((item) => {
                            const active = isNavActive(currentPath, item.href, locale);
                            const Icon = navIcons[item.key];

                            return (
                                <Link
                                    key={item.key}
                                    href={item.href}
                                    className={cn(
                                        'nav-pill-link',
                                        active && 'nav-pill-link--active',
                                    )}
                                >
                                    {active && (
                                        <motion.span
                                            layoutId="nav-active-pill"
                                            className="nav-pill-indicator"
                                            transition={
                                                reduce
                                                    ? { duration: 0 }
                                                    : { type: 'spring', stiffness: 380, damping: 32 }
                                            }
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-1.5">
                                        <Icon className="h-3.5 w-3.5 opacity-70" />
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="header-actions">
                        <a
                            href="/resume"
                            className={cn(
                                'header-action-btn hidden sm:inline-flex',
                                menuOpen && 'max-md:!hidden',
                            )}
                            aria-label={t('nav.cv')}
                        >
                            <DownloadIcon className="h-4 w-4" />
                            <span className="hidden lg:inline">{t('nav.cv')}</span>
                            <span className="lg:hidden">CV</span>
                        </a>

                        <Link
                            href={switchHref}
                            className={cn(
                                'header-action-btn header-action-btn--icon',
                                menuOpen && 'max-md:!hidden',
                            )}
                            aria-label={locale === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
                            hrefLang={other}
                        >
                            <GlobeIcon className="h-4 w-4" />
                            <span className="text-[0.6875rem] font-bold uppercase tracking-[0.1em]">
                                {other === 'ar' ? 'ع' : 'EN'}
                            </span>
                        </Link>

                        <button
                            type="button"
                            className={cn(
                                'header-menu-btn md:hidden',
                                menuOpen && 'header-menu-btn--open',
                            )}
                            onClick={toggleMenu}
                            aria-expanded={menuOpen}
                            aria-controls="mobile-drawer"
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        >
                            <span className="sr-only">{menuOpen ? 'Close' : 'Menu'}</span>
                            <MenuIcon open={menuOpen} reduce={reduce} />
                        </button>
                    </div>
                </div>
            </header>

            <AnimatePresence initial={false}>
                {menuOpen && (
                    <motion.div
                        key="mobile-menu"
                        className="mobile-menu-root md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={
                            reduce ? { duration: 0 } : { duration: 0.28, ease: EASE_SMOOTH }
                        }
                    >
                        <motion.button
                            type="button"
                            className="mobile-drawer-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={
                                reduce
                                    ? { duration: 0 }
                                    : { duration: 0.32, ease: EASE_SMOOTH }
                            }
                            onClick={closeMenu}
                            aria-label="Close menu"
                        />

                        <motion.nav
                            id="mobile-drawer"
                            className="mobile-drawer"
                            role="dialog"
                            aria-modal="true"
                            aria-label={locale === 'ar' ? 'قائمة التنقل' : 'Navigation menu'}
                            initial={
                                reduce
                                    ? false
                                    : { x: slideFrom, opacity: 0.94 }
                            }
                            animate={{ x: 0, opacity: 1 }}
                            exit={
                                reduce
                                    ? undefined
                                    : { x: slideFrom, opacity: 0.94 }
                            }
                            transition={drawerTween}
                        >
                            <div className="mobile-drawer-mesh" aria-hidden />
                            <div className="mobile-drawer-grain" aria-hidden />

                            <div className="mobile-drawer-nav">
                                <motion.p
                                    className="mobile-drawer-label"
                                    initial={reduce ? false : { opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={
                                        reduce
                                            ? { duration: 0 }
                                            : { duration: 0.3, ease: EASE_SMOOTH, delay: 0.08 }
                                    }
                                >
                                    {locale === 'ar' ? 'التنقل' : 'Navigate'}
                                </motion.p>

                                <motion.ul
                                    className="mobile-drawer-list"
                                    variants={reduce ? undefined : drawerListMotion}
                                    initial="hidden"
                                    animate="show"
                                >
                                    {nav.map((item, index) => {
                                        const active = isNavActive(
                                            currentPath,
                                            item.href,
                                            locale,
                                        );
                                        const Icon = navIcons[item.key];

                                        return (
                                            <motion.li
                                                key={item.key}
                                                variants={reduce ? undefined : drawerItemMotion}
                                            >
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        'mobile-drawer-link',
                                                        active && 'mobile-drawer-link--active',
                                                    )}
                                                    onClick={closeMenu}
                                                >
                                                    <span className="mobile-drawer-link-icon">
                                                        <Icon className="h-5 w-5" />
                                                    </span>
                                                    <span className="mobile-drawer-link-text">
                                                        <span className="mobile-drawer-link-index">
                                                            {String(index + 1).padStart(2, '0')}
                                                        </span>
                                                        {item.label}
                                                    </span>
                                                    <ArrowEndIcon className="mobile-drawer-link-arrow h-4 w-4" />
                                                </Link>
                                            </motion.li>
                                        );
                                    })}
                                </motion.ul>
                            </div>

                            <motion.div
                                className="mobile-drawer-footer"
                                initial={reduce ? false : { opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={
                                    reduce
                                        ? { duration: 0 }
                                        : { duration: 0.34, ease: EASE_SMOOTH, delay: 0.22 }
                                }
                            >
                                <a
                                    href="/resume"
                                    className="btn btn-primary mobile-drawer-cv"
                                    onClick={closeMenu}
                                >
                                    <DownloadIcon className="h-4 w-4" />
                                    {t('nav.cv')}
                                </a>
                                <Link
                                    href={switchHref}
                                    className="btn btn-secondary mobile-drawer-lang"
                                    onClick={closeMenu}
                                >
                                    <GlobeIcon className="h-4 w-4" />
                                    {other === 'ar' ? 'عربي' : 'English'}
                                </Link>
                            </motion.div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
