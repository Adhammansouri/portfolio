export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string | null;
}

export type Locale = 'en' | 'ar';

export interface Profile {
    name: string;
    photo_path: string | null;
    title: string;
    headline: string;
    bio: string;
    location: string | null;
    email: string | null;
    phone: string | null;
    linkedin: string | null;
    github: string | null;
    availability: string;
}

export interface ProjectLinks {
    live?: string;
    github?: string;
    github_note?: string;
    company?: string;
    note?: string;
}

export interface ProjectItem {
    id: number;
    slug: string;
    category: string | null;
    featured: boolean;
    stack: string[];
    links: ProjectLinks;
    cover: string | null;
    year: string | null;
    title: string;
    tagline: string | null;
    summary: string;
    body_md?: string | null;
    challenge?: string | null;
    solution?: string | null;
    results?: string | null;
}

export interface ExperienceItem {
    id: number;
    company: string;
    role: string;
    employment_type: string | null;
    location: string | null;
    starts_on: string | null;
    ends_on: string | null;
    is_current: boolean;
    bullets: string[];
}

export interface CapabilityItem {
    title: string;
    description: string;
}

export interface EducationItem {
    institution: string;
    degree: string;
    location: string | null;
    starts_on: string | null;
    ends_on: string | null;
    notes: string | null;
}

export interface CertificationItem {
    title: string;
    issuer: string;
    year: string | null;
    description: string | null;
}

export interface LeadershipEntry {
    title: string;
    organization: string;
    year: string | null;
    description: string | null;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    locale?: Locale;
    dir?: 'ltr' | 'rtl';
    translations?: Record<string, string>;
    flash?: {
        success?: boolean;
    };
    auth: {
        user: User | null;
    };
};
