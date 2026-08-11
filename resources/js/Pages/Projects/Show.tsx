import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ProjectRow from '@/Components/ProjectRow';
import SectionHeading, { Section } from '@/Components/SectionHeading';
import TextLink from '@/Components/ui/TextLink';
import type { PageProps, ProjectItem } from '@/types';
import { localePath, useT } from '@/lib/utils';

type Props = PageProps<{
    project: ProjectItem;
    related: ProjectItem[];
}>;

export default function ProjectShow({ project, related }: Props) {
    const { locale } = usePage<PageProps>().props;
    const t = useT();

    return (
        <AppLayout>
            <Head>
                <title>{project.title}</title>
                <meta name="description" content={project.summary} />
            </Head>

            <Section className="!pt-8 md:!pt-16">
                <p className="eyebrow">
                    {project.category}
                    {project.year ? ` · ${project.year}` : ''}
                </p>
                <h1 className="mt-3 font-display text-[clamp(1.875rem,5vw,3rem)] font-extrabold leading-[1.08] tracking-tight text-ink sm:mt-4">
                    {project.title}
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink/75 sm:mt-5 sm:text-lg">
                    {project.tagline}
                </p>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink/65 sm:mt-4 sm:text-base">
                    {project.summary}
                </p>

                <div className="mt-8 grid gap-8 border-t border-ink/10 pt-8 sm:mt-10 sm:gap-10 sm:pt-10 md:grid-cols-3">
                    {[
                        { label: t('projects.challenge'), body: project.challenge },
                        { label: t('projects.solution'), body: project.solution },
                        { label: t('projects.results'), body: project.results },
                    ].map((block) => (
                        <div key={block.label}>
                            <h2 className="eyebrow">{block.label}</h2>
                            <p className="mt-3 text-sm leading-relaxed text-ink/75">
                                {block.body}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-10 grid gap-8 sm:mt-12 sm:gap-10 md:grid-cols-2">
                    <div>
                        <h2 className="eyebrow">{t('projects.stack')}</h2>
                        <ul className="mt-3 flex flex-wrap gap-2 sm:mt-4">
                            {project.stack.map((tech) => (
                                <li key={tech} className="tag">
                                    {tech}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="eyebrow">{t('projects.links')}</h2>
                        <ul className="mt-3 space-y-2 text-sm sm:mt-4">
                            {project.links?.live && (
                                <li>
                                    <a
                                        href={project.links.live}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-link"
                                    >
                                        {t('projects.live')}
                                    </a>
                                </li>
                            )}
                            {project.links?.github && (
                                <li>
                                    <a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-link"
                                    >
                                        {t('projects.github')}
                                        {project.links.github_note === 'private'
                                            ? ` (${t('projects.privateRepo')})`
                                            : ''}
                                    </a>
                                </li>
                            )}
                            {project.links?.company && (
                                <li className="text-ink/70">{project.links.company}</li>
                            )}
                            {project.links?.note && (
                                <li className="text-ink/70">{project.links.note}</li>
                            )}
                        </ul>
                    </div>
                </div>

                {project.body_md && (
                    <div className="prose-portfolio mt-10 max-w-3xl whitespace-pre-wrap text-sm leading-relaxed text-ink/75 sm:mt-14">
                        {project.body_md}
                    </div>
                )}
            </Section>

            {related.length > 0 && (
                <Section className="border-t border-ink/8">
                    <SectionHeading title={t('projects.related')} />
                    <div className="border-t border-ink/10">
                        {related.map((p, i) => (
                            <ProjectRow key={p.id} project={p} index={i} />
                        ))}
                    </div>
                    <TextLink
                        href={localePath(locale, 'projects')}
                        className="mt-6 inline-block"
                    >
                        {t('cta.viewAll')}
                    </TextLink>
                </Section>
            )}
        </AppLayout>
    );
}
