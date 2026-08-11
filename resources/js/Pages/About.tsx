import { Head, usePage } from '@inertiajs/react';
import { motion, useReducedMotion } from 'motion/react';
import AppLayout from '@/Layouts/AppLayout';
import SectionHeading, { Section } from '@/Components/SectionHeading';
import { ArrowIcon, ButtonLink, WhatsAppIcon } from '@/Components/ui/Button';
import PageHeader from '@/Components/ui/PageHeader';
import type { PageProps, Profile } from '@/types';
import { localePath, useT, whatsappContactUrl } from '@/lib/utils';

type Props = PageProps<{
    profile: Profile;
    skills: Record<string, string[]>;
}>;

const contactLinks = (profile: Profile, t: (key: string) => string) => [
    {
        key: 'email',
        label: t('about.email'),
        href: `mailto:${profile.email}`,
        value: profile.email,
    },
    {
        key: 'phone',
        label: t('about.phone'),
        href: `tel:${profile.phone}`,
        value: profile.phone,
    },
    {
        key: 'linkedin',
        label: t('about.linkedin'),
        href: profile.linkedin ?? '#',
        value: 'adham-mansour11',
        external: true,
    },
    {
        key: 'github',
        label: t('about.github'),
        href: profile.github ?? '#',
        value: 'Adhammansouri',
        external: true,
    },
];

export default function About({ profile, skills }: Props) {
    const t = useT();
    const { locale } = usePage<PageProps>().props;
    const reduce = useReducedMotion();
    const links = contactLinks(profile, t);
    const whatsappHref = whatsappContactUrl(profile.phone, t('whatsapp.prefill'));

    return (
        <AppLayout>
            <Head>
                <title>{t('about.title')}</title>
                <meta name="description" content={profile.bio} />
            </Head>

            <Section className="!pt-8 md:!pt-14">
                <div className="grid items-start gap-8 sm:gap-10 md:grid-cols-12 md:gap-14 lg:gap-16">
                    <motion.div
                        initial={reduce ? false : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="md:sticky md:top-24 md:col-span-5"
                    >
                        {profile.photo_path && (
                            <div className="about-portrait-frame">
                                <div className="about-portrait-stage">
                                    <img
                                        src="/images/adham-mansour-about.png"
                                        alt={profile.name}
                                        width={640}
                                        height={800}
                                        decoding="async"
                                        className="about-portrait-photo"
                                    />
                                </div>

                                <div className="relative z-30 flex items-center justify-between gap-3 border-t border-ink/8 bg-paper/75 px-4 py-3 backdrop-blur-sm">
                                    <span className="text-sm font-medium text-ink/80">
                                        {profile.location}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                                        <span
                                            className="h-1.5 w-1.5 rounded-full bg-accent-soft"
                                            aria-hidden
                                        />
                                        {profile.availability}
                                    </span>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    <div className="md:col-span-7">
                        <PageHeader
                            title={t('about.title')}
                            lead={t('about.lead')}
                            className="mb-6 md:mb-10"
                        />

                        <motion.div
                            initial={reduce ? false : { opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.06 }}
                        >
                            <h2 className="font-display text-[clamp(1.75rem,4.5vw,2.75rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink">
                                {profile.name}
                            </h2>
                            <p className="mt-3 text-base font-medium text-accent md:text-lg">
                                {profile.title}
                            </p>
                            <p className="mt-5 max-w-prose text-base leading-[1.75] text-ink/72 sm:mt-6 md:text-[1.0625rem]">
                                {profile.bio}
                            </p>
                        </motion.div>

                        <motion.dl
                            initial={reduce ? false : { opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.12 }}
                            className="mt-8 grid gap-2 sm:grid-cols-2 sm:mt-10"
                        >
                            {links.map((item) => (
                                <div key={item.key} className="info-card group">
                                    <dt className="eyebrow !text-[0.625rem] !text-steel">
                                        {item.label}
                                    </dt>
                                    <dd className="mt-1">
                                        <a
                                            href={item.href}
                                            target={item.external ? '_blank' : undefined}
                                            rel={item.external ? 'noreferrer' : undefined}
                                            className="text-sm font-semibold text-ink transition group-hover:text-accent"
                                        >
                                            {item.value}
                                        </a>
                                    </dd>
                                </div>
                            ))}
                        </motion.dl>

                        <motion.div
                            initial={reduce ? false : { opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: 0.18 }}
                            className="mt-6 sm:mt-8"
                        >
                            <ButtonLink
                                href={whatsappHref ?? localePath(locale, 'contact')}
                                external={Boolean(whatsappHref)}
                                variant="primary"
                                className="group"
                                leadingIcon={<WhatsAppIcon className="text-[#25D366]" />}
                                icon={<ArrowIcon />}
                                aria-label={t('cta.whatsapp')}
                            >
                                {t('cta.whatsapp')}
                            </ButtonLink>
                        </motion.div>
                    </div>
                </div>

                <div className="mt-14 border-t border-ink/10 pt-10 md:mt-24 md:pt-16">
                    <SectionHeading
                        title={t('experience.skills')}
                        lead={t('home.capabilitiesLead')}
                        className="mb-8 md:mb-12"
                    />
                    <div className="grid gap-8 sm:gap-10 md:grid-cols-2">
                        {Object.entries(skills).map(([group, names], index) => (
                            <motion.div
                                key={group}
                                initial={reduce ? false : { opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="border-t border-ink/10 pt-5 sm:pt-6"
                            >
                                <p className="eyebrow">{group}</p>
                                <ul className="mt-3 flex flex-wrap gap-2 sm:mt-4">
                                    {names.map((name) => (
                                        <li key={name} className="tag">
                                            {name}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>
        </AppLayout>
    );
}
