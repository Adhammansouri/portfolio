import { usePage } from '@inertiajs/react';
import type { PageProps } from '@/types';

export function useT() {
    const { translations = {} } = usePage<PageProps>().props;

    return (key: string, fallback = ''): string =>
        translations[key] ?? (fallback || key);
}

export function localePath(locale: string | undefined, path = ''): string {
    const loc = locale || 'en';
    const clean = path.replace(/^\//, '');
    return clean ? `/${loc}/${clean}` : `/${loc}`;
}

export function swapLocalePath(
    currentPath: string,
    from: string,
    to: string,
): string {
    const parts = currentPath.split('/').filter(Boolean);
    if (parts[0] === from || parts[0] === 'en' || parts[0] === 'ar') {
        parts[0] = to;
        return '/' + parts.join('/');
    }
    return `/${to}${currentPath.startsWith('/') ? currentPath : '/' + currentPath}`;
}

export function cn(...classes: Array<string | false | null | undefined>): string {
    return classes.filter(Boolean).join(' ');
}

export function formatWhatsAppNumber(phone: string): string {
    const digits = phone.replace(/\D/g, '');
    if (!digits) return '';
    if (digits.startsWith('20')) return digits;
    if (digits.startsWith('0')) return `20${digits.slice(1)}`;
    return digits;
}

export function whatsappContactUrl(
    phone: string | null | undefined,
    message: string,
): string | null {
    if (!phone) return null;
    const number = formatWhatsAppNumber(phone);
    if (!number) return null;
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
