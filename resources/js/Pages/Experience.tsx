import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import SectionHeading, { Section } from '@/Components/SectionHeading';
import PageHeader from '@/Components/ui/PageHeader';
import type {
    CertificationItem,
    EducationItem,
    ExperienceItem,
    LeadershipEntry,
    PageProps,
} from '@/types';
import { useT } from '@/lib/utils';

type Props = PageProps<{
    experiences: ExperienceItem[];
    educations: EducationItem[];
    certifications: CertificationItem[];
    leadership: LeadershipEntry[];
    skills: Record<string, string[]>;
}>;

export default function ExperiencePage({
    experiences,
    educations,
    certifications,
    leadership,
    skills,
}: Props) {
    const t = useT();

    return (
        <AppLayout>
            <Head title={t('experience.title')} />

            <Section className="!pt-8 md:!pt-16">
                <PageHeader
                    title={t('experience.title')}
                    lead={t('experience.lead')}
                    className="mb-10 md:mb-14"
                />

                <h3 className="mb-5 font-display text-lg font-bold sm:mb-6 sm:text-xl">
                    {t('experience.work')}
                </h3>
                <div className="space-y-8 sm:space-y-10">
                    {experiences.map((exp) => (
                        <article
                            key={exp.id}
                            className="grid gap-3 border-t border-ink/10 pt-6 sm:gap-4 sm:pt-8 md:grid-cols-12"
                        >
                            <div className="md:col-span-4">
                                <p className="font-semibold text-ink">{exp.company}</p>
                                <p className="mt-1 text-sm text-steel">
                                    {exp.starts_on} —{' '}
                                    {exp.is_current
                                        ? t('experience.present')
                                        : exp.ends_on}
                                </p>
                                <p className="mt-1 text-sm text-steel">
                                    {exp.employment_type}
                                    {exp.location ? ` · ${exp.location}` : ''}
                                </p>
                            </div>
                            <div className="md:col-span-8">
                                <h4 className="font-display text-base font-bold text-ink sm:text-lg">
                                    {exp.role}
                                </h4>
                                <ul className="mt-3 space-y-2 sm:mt-4">
                                    {exp.bullets.map((b) => (
                                        <li
                                            key={b}
                                            className="relative ps-4 text-sm leading-relaxed text-ink/75 before:absolute before:start-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-accent"
                                        >
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    ))}
                </div>
            </Section>

            <Section className="border-t border-ink/8">
                <h3 className="mb-5 font-display text-lg font-bold sm:mb-6 sm:text-xl">
                    {t('experience.education')}
                </h3>
                <div className="space-y-5 sm:space-y-6">
                    {educations.map((edu) => (
                        <div key={edu.institution} className="grid gap-1 sm:gap-2 md:grid-cols-12 md:gap-4">
                            <p className="text-sm text-steel md:col-span-3">
                                {edu.starts_on} — {edu.ends_on}
                            </p>
                            <div className="md:col-span-9">
                                <p className="font-semibold">{edu.institution}</p>
                                <p className="text-ink/75">{edu.degree}</p>
                                {edu.location && (
                                    <p className="text-sm text-steel">{edu.location}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            <Section className="border-t border-ink/8">
                <h3 className="mb-5 font-display text-lg font-bold sm:mb-6 sm:text-xl">
                    {t('experience.certs')}
                </h3>
                <div className="space-y-5 sm:space-y-6">
                    {certifications.map((c) => (
                        <div key={c.title}>
                            <p className="font-semibold">
                                {c.title}{' '}
                                <span className="font-normal text-steel">· {c.year}</span>
                            </p>
                            <p className="text-sm text-ink/70">{c.issuer}</p>
                            {c.description && (
                                <p className="mt-1 text-sm text-ink/65">{c.description}</p>
                            )}
                        </div>
                    ))}
                </div>
            </Section>

            <Section className="border-t border-ink/8">
                <h3 className="mb-5 font-display text-lg font-bold sm:mb-6 sm:text-xl">
                    {t('experience.leadership')}
                </h3>
                <div className="space-y-5 sm:space-y-6">
                    {leadership.map((l) => (
                        <div key={l.title}>
                            <p className="font-semibold">
                                {l.title}{' '}
                                <span className="font-normal text-steel">· {l.year}</span>
                            </p>
                            <p className="text-sm text-ink/70">{l.organization}</p>
                            {l.description && (
                                <p className="mt-1 text-sm text-ink/65">{l.description}</p>
                            )}
                        </div>
                    ))}
                </div>
            </Section>

            <Section className="border-t border-ink/8">
                <SectionHeading
                    title={t('experience.skills')}
                    className="mb-8 md:mb-10"
                />
                <div className="grid gap-8 md:grid-cols-2">
                    {Object.entries(skills).map(([group, names]) => (
                        <div key={group}>
                            <p className="eyebrow">{group}</p>
                            <ul className="mt-3 flex flex-wrap gap-2">
                                {names.map((name) => (
                                    <li key={name} className="tag">
                                        {name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </Section>
        </AppLayout>
    );
}
