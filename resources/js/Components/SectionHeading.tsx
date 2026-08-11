import { motion, useReducedMotion } from 'motion/react';
import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

export default function SectionHeading({
    eyebrow,
    title,
    lead,
    className = '',
}: {
    eyebrow?: string;
    title: string;
    lead?: string;
    className?: string;
}) {
    const reduce = useReducedMotion();

    return (
        <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45 }}
            className={cn('max-w-2xl', className || 'mb-8 md:mb-14')}
        >
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            <h2 className="section-title">{title}</h2>
            {lead && <p className="section-lead">{lead}</p>}
        </motion.div>
    );
}

export function Section({
    children,
    className = '',
    id,
}: PropsWithChildren<{ className?: string; id?: string }>) {
    return (
        <section id={id} className={cn('section-block', className)}>
            {children}
        </section>
    );
}
