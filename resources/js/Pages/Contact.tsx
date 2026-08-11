import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEvent } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Section } from '@/Components/SectionHeading';
import PageHeader from '@/Components/ui/PageHeader';
import type { PageProps, Profile } from '@/types';
import { localePath, useT } from '@/lib/utils';

type Props = PageProps<{
    profile: Profile;
}>;

export default function Contact({ profile }: Props) {
    const { locale, flash } = usePage<PageProps>().props;
    const t = useT();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(localePath(locale, 'contact'), {
            onSuccess: () => reset('message'),
        });
    };

    return (
        <AppLayout>
            <Head title={t('contact.title')} />

            <Section className="!pt-8 md:!pt-16">
                <div className="grid gap-10 sm:gap-12 md:grid-cols-12">
                    <div className="md:col-span-5">
                        <PageHeader
                            title={t('contact.title')}
                            lead={t('contact.lead')}
                        />
                        <ul className="mt-6 space-y-3 text-sm sm:mt-8">
                            <li>
                                <a
                                    href={`mailto:${profile.email}`}
                                    className="text-link"
                                >
                                    {profile.email}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`tel:${profile.phone}`}
                                    className="text-link-muted"
                                >
                                    {profile.phone}
                                </a>
                            </li>
                            <li>
                                <a href="/resume" className="text-link-muted">
                                    {t('nav.cv')}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-7">
                        {flash?.success && (
                            <p className="field-success">{t('contact.success')}</p>
                        )}

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label className="field-label" htmlFor="name">
                                    {t('contact.name')}
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="field-input"
                                    required
                                    autoComplete="name"
                                />
                                {errors.name && (
                                    <p className="field-error">{errors.name}</p>
                                )}
                            </div>
                            <div>
                                <label className="field-label" htmlFor="email">
                                    {t('contact.email')}
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="field-input"
                                    required
                                    autoComplete="email"
                                    inputMode="email"
                                />
                                {errors.email && (
                                    <p className="field-error">{errors.email}</p>
                                )}
                            </div>
                            <div>
                                <label className="field-label" htmlFor="message">
                                    {t('contact.message')}
                                </label>
                                <textarea
                                    id="message"
                                    rows={6}
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    className="field-input resize-y"
                                    required
                                />
                                {errors.message && (
                                    <p className="field-error">{errors.message}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn btn-primary w-full sm:w-auto"
                            >
                                {processing ? t('cta.sending') : t('cta.send')}
                            </button>
                        </form>
                    </div>
                </div>
            </Section>
        </AppLayout>
    );
}
