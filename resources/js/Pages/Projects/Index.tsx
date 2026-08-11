import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ProjectRow from '@/Components/ProjectRow';
import { Section } from '@/Components/SectionHeading';
import PageHeader from '@/Components/ui/PageHeader';
import type { PageProps, ProjectItem } from '@/types';
import { useT } from '@/lib/utils';

type Props = PageProps<{
    projects: ProjectItem[];
}>;

export default function ProjectsIndex({ projects }: Props) {
    const t = useT();

    return (
        <AppLayout>
            <Head title={t('projects.title')} />
            <Section className="!pt-8 md:!pt-16">
                <PageHeader
                    title={t('projects.title')}
                    lead={t('projects.lead')}
                    className="mb-8 md:mb-12"
                />
                <div className="border-t border-ink/10">
                    {projects.map((project, i) => (
                        <ProjectRow key={project.id} project={project} index={i} />
                    ))}
                </div>
            </Section>
        </AppLayout>
    );
}
