import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Hero from '@/Components/Hero';
import ProjectRow from '@/Components/ProjectRow';
import SectionHeading, { Section } from '@/Components/SectionHeading';
import { ArrowIcon, ButtonLink, WhatsAppIcon } from '@/Components/ui/Button';
import TextLink from '@/Components/ui/TextLink';
import type {
    CapabilityItem,
    ExperienceItem,
    PageProps,
    Profile,
    ProjectItem,
} from '@/types';
import { localePath, useT, whatsappContactUrl } from '@/lib/utils';

type Props = PageProps<{
    profile: Profile;
    featuredProjects: ProjectItem[];
    currentExperiences: ExperienceItem[];
    capabilities: CapabilityItem[];
}>;

export default function Home({
    profile,
    featuredProjects,
    currentExperiences,
    capabilities,
}: Props) {
    const { locale } = usePage<PageProps>().props;
    const t = useT();
    const whatsappHref = whatsappContactUrl(profile.phone, t('whatsapp.prefill'));

    return (
        <AppLayout>
            <Head>
                <title>{profile.name}</title>
                <meta name="description" content={profile.headline} />
                <meta property="og:title" content={`${profile.name} — ${profile.title}`} />
                <meta property="og:description" content={profile.headline} />
                <meta property="og:image" content={profile.photo_path ?? ''} />
            </Head>

            <Hero profile={profile} />

            <Section id="work">
                <div className="mb-2 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
                    <SectionHeading
                        title={t('home.selectedWork')}
                        lead={t('home.selectedWorkLead')}
                        className="mb-0"
                    />
                    <TextLink
                        href={localePath(locale, 'projects')}
                        className="shrink-0 self-start sm:self-auto sm:pb-1"
                    >
                        {t('cta.viewAll')} →
                    </TextLink>
                </div>
                <div className="border-t border-ink/10">
                    {featuredProjects.map((project, i) => (
                        <ProjectRow key={project.id} project={project} index={i} />
                    ))}
                </div>
            </Section>

            <Section className="border-t border-ink/8 bg-white/35">
                <SectionHeading
                    title={t('home.capabilities')}
                    lead={t('home.capabilitiesLead')}
                />
                <div className="grid gap-10 sm:gap-12 md:grid-cols-3 md:gap-10">
                    {capabilities.map((cap, i) => (
                        <div key={cap.title} className="relative ps-5">
                            <span
                                className="absolute start-0 top-1.5 h-8 w-0.5 rounded-full bg-accent"
                                aria-hidden
                            />
                            <p className="mb-3 font-mono text-[0.6875rem] font-medium tracking-[0.16em] text-steel">
                                {String(i + 1).padStart(2, '0')}
                            </p>
                            <h3 className="font-display text-lg font-bold tracking-tight text-ink sm:text-xl">
                                {cap.title}
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-ink/70">
                                {cap.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section>
                <div className="mb-2 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
                    <SectionHeading
                        title={t('home.experience')}
                        lead={t('home.experienceLead')}
                        className="mb-0"
                    />
                    <TextLink
                        href={localePath(locale, 'experience')}
                        className="shrink-0 self-start sm:self-auto sm:pb-1"
                    >
                        {t('nav.experience')} →
                    </TextLink>
                </div>
                <div className="border-t border-ink/10">
                    {currentExperiences.map((exp) => (
                        <div
                            key={exp.id}
                            className="grid gap-2 border-b border-ink/10 py-6 sm:gap-3 sm:py-7 md:grid-cols-12 md:gap-6 md:py-8"
                        >
                            <div className="md:col-span-4">
                                <p className="font-semibold tracking-tight text-ink">
                                    {exp.company}
                                </p>
                                <p className="mt-1 font-mono text-xs tracking-wide text-steel">
                                    {exp.starts_on} — {t('experience.present')}
                                </p>
                            </div>
                            <div className="md:col-span-8">
                                <p className="font-display text-base font-bold tracking-tight text-ink sm:text-lg md:text-xl">
                                    {exp.role}
                                </p>
                                <p className="mt-1.5 text-sm text-steel">
                                    {exp.employment_type}
                                    {exp.location ? ` · ${exp.location}` : ''}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            <section className="relative mt-4 overflow-hidden border-t border-ink/10 sm:mt-8">
                <div className="absolute inset-0 bg-ink" aria-hidden />
                <div
                    className="pointer-events-none absolute inset-0 opacity-50"
                    style={{
                        background:
                            'radial-gradient(ellipse 70% 80% at 0% 50%, rgba(15,118,110,0.5), transparent 55%), radial-gradient(ellipse 50% 60% at 100% 80%, rgba(214,199,161,0.18), transparent 50%)',
                    }}
                    aria-hidden
                />
                <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 sm:gap-8 sm:py-16 md:flex-row md:items-end md:justify-between md:gap-12 md:px-8 md:py-20">
                    <div className="max-w-xl">
                        <p className="eyebrow mb-3 !text-accent-soft">
                            {t('nav.contact')}
                        </p>
                        <h2 className="font-display text-[clamp(1.75rem,5vw,2.75rem)] font-bold leading-[1.1] tracking-tight text-paper">
                            {t('home.contactBand')}
                        </h2>
                        <p className="mt-3 text-base leading-relaxed text-paper/65 sm:mt-4 md:text-lg">
                            {t('home.contactBandLead')}
                        </p>
                    </div>
                    <ButtonLink
                        href={whatsappHref ?? localePath(locale, 'contact')}
                        external={Boolean(whatsappHref)}
                        variant="inverse"
                        className="group shrink-0 self-start md:self-auto"
                        leadingIcon={<WhatsAppIcon className="text-[#25D366]" />}
                        icon={<ArrowIcon />}
                        aria-label={t('cta.whatsapp')}
                    >
                        {t('cta.whatsapp')}
                    </ButtonLink>
                </div>
            </section>
        </AppLayout>
    );
}
