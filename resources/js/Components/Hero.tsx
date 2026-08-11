import { usePage } from '@inertiajs/react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowIcon, ButtonLink, WhatsAppIcon } from '@/Components/ui/Button';
import Eyebrow from '@/Components/ui/Eyebrow';
import type { PageProps, Profile } from '@/types';
import { localePath, useT, whatsappContactUrl } from '@/lib/utils';

export default function Hero({ profile }: { profile: Profile }) {
    const { locale } = usePage<PageProps>().props;
    const t = useT();
    const reduce = useReducedMotion();
    const whatsappHref = whatsappContactUrl(profile.phone, t('whatsapp.prefill'));
    const [firstName, ...rest] = profile.name.split(' ');
    const lastName = rest.join(' ');

    return (
        <section className="hero-section relative isolate overflow-hidden">
            <div className="absolute inset-0 hero-mesh" aria-hidden />
            <div className="absolute inset-0 hero-grain" aria-hidden />
            <div className="hero-portrait-atmosphere" aria-hidden />

            <div className="relative mx-auto grid max-w-6xl items-end gap-0 px-5 pb-0 pt-0 sm:gap-8 sm:pt-10 md:min-h-[min(760px,calc(100dvh-var(--header-height))] md:grid-cols-12 md:gap-0 md:px-8 md:pt-14">
                {/* Portrait — dominant anchor on mobile */}
                <motion.div
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="portrait-column relative z-10 order-1 flex items-end justify-center md:order-2 md:absolute md:inset-y-0 md:end-0 md:w-[min(54%,560px)] md:justify-end lg:w-[min(50%,540px)]"
                >
                    {profile.photo_path && (
                        <div className="portrait-stage relative w-full max-w-[min(88vw,22rem)] sm:max-w-[19rem] md:max-w-none md:w-full md:translate-x-6 lg:translate-x-10 rtl:md:-translate-x-6 rtl:lg:-translate-x-10">
                            <div className="portrait-atmosphere" aria-hidden />

                            <img
                                src={profile.photo_path}
                                alt={profile.name}
                                width={720}
                                height={900}
                                decoding="async"
                                className="portrait-cutout relative z-10 mx-auto block w-full max-w-[min(100%,500px)] select-none md:me-0 md:ms-auto"
                            />

                            <div className="portrait-halo" aria-hidden />
                            <div className="portrait-edge-fade" aria-hidden />
                        </div>
                    )}
                </motion.div>

                {/* Copy — overlaps portrait base on mobile for editorial flow */}
                <div className="relative z-20 order-2 -mt-10 flex flex-col justify-center pb-8 sm:-mt-12 sm:pb-10 md:order-1 md:mt-0 md:col-span-7 md:pb-16 lg:col-span-7">
                    <motion.div
                        initial={reduce ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        className="mb-4 sm:mb-6"
                    >
                        <Eyebrow dot>{profile.title}</Eyebrow>
                    </motion.div>

                    <motion.h1
                        initial={reduce ? false : { opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                        className="font-display font-extrabold leading-[0.92] tracking-[-0.04em] text-ink"
                    >
                        <span className="block text-[clamp(2.25rem,9vw,4.85rem)]">
                            {firstName}
                        </span>
                        {lastName ? (
                            <span className="mt-0.5 block text-[clamp(2.25rem,9vw,4.85rem)] sm:mt-1">
                                {lastName}
                            </span>
                        ) : null}
                    </motion.h1>

                    <motion.p
                        initial={reduce ? false : { opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.14 }}
                        className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-ink/68 sm:mt-6 sm:text-base md:text-lg md:leading-[1.55]"
                    >
                        {profile.headline}
                    </motion.p>

                    <motion.div
                        initial={reduce ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.22 }}
                        className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center"
                    >
                        <ButtonLink
                            href={localePath(locale, 'projects')}
                            variant="primary"
                            className="group w-full sm:w-auto"
                            icon={<ArrowIcon />}
                        >
                            {t('cta.viewWork')}
                        </ButtonLink>
                        <ButtonLink
                            href={whatsappHref ?? localePath(locale, 'contact')}
                            external={Boolean(whatsappHref)}
                            variant="secondary"
                            className="w-full sm:w-auto"
                            leadingIcon={<WhatsAppIcon className="text-[#25D366]" />}
                            aria-label={t('cta.whatsapp')}
                        >
                            {t('cta.whatsapp')}
                        </ButtonLink>
                    </motion.div>

                    <motion.div
                        initial={reduce ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.45, delay: 0.32 }}
                        className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink/10 pt-4 text-sm text-steel sm:mt-10 sm:pt-5"
                    >
                        <span>{profile.location}</span>
                        {profile.github && (
                            <a
                                href={profile.github}
                                target="_blank"
                                rel="noreferrer"
                                className="text-link-muted"
                            >
                                GitHub
                            </a>
                        )}
                        {profile.linkedin && (
                            <a
                                href={profile.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="text-link-muted"
                            >
                                LinkedIn
                            </a>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
