import { motion, useReducedMotion } from 'motion/react';
import Eyebrow from '@/Components/ui/Eyebrow';
import { cn } from '@/lib/utils';

export default function PageHeader({
    eyebrow,
    title,
    lead,
    className,
}: {
    eyebrow?: string;
    title: string;
    lead?: string;
    className?: string;
}) {
    const reduce = useReducedMotion();

    return (
        <motion.header
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className={cn('page-header', className)}
        >
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h1 className="page-title">{title}</h1>
            {lead && <p className="page-lead">{lead}</p>}
        </motion.header>
    );
}
