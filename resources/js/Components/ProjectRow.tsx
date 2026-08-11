import { Link, usePage } from '@inertiajs/react';
import { motion, useReducedMotion } from 'motion/react';
import type { PageProps, ProjectItem } from '@/types';
import { localePath } from '@/lib/utils';

export default function ProjectRow({
    project,
    index = 0,
}: {
    project: ProjectItem;
    index?: number;
}) {
    const { locale } = usePage<PageProps>().props;
    const reduce = useReducedMotion();
    const stackPreview = project.stack.slice(0, 3).join(' · ');

    return (
        <motion.article
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.16) }}
            className="project-row group"
        >
            <Link
                href={localePath(locale, `projects/${project.slug}`)}
                className="block md:grid md:grid-cols-12 md:items-baseline md:gap-6"
            >
                {/* Mobile: inline meta row */}
                <div className="project-row-meta md:col-span-2">
                    <span className="eyebrow !text-[0.625rem]">{project.category}</span>
                    <span className="font-mono text-[0.6875rem] text-steel md:mt-1.5 md:block">
                        {project.year}
                    </span>
                </div>

                <div className="md:col-span-6">
                    <h3 className="project-row-title">
                        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                            {project.title}
                        </span>
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/60 md:text-[0.9375rem]">
                        {project.tagline || project.summary}
                    </p>
                    {/* Stack visible on mobile below description */}
                    <p className="mt-3 text-xs tracking-wide text-steel md:hidden">
                        {stackPreview}
                    </p>
                </div>

                <div className="hidden items-center justify-end gap-4 md:col-span-4 md:flex">
                    <p className="text-xs tracking-wide text-steel md:text-end">
                        {stackPreview}
                    </p>
                    <span
                        aria-hidden
                        className="shrink-0 text-sm font-semibold text-accent opacity-0 transition duration-200 group-hover:opacity-100"
                    >
                        →
                    </span>
                </div>
            </Link>
        </motion.article>
    );
}
