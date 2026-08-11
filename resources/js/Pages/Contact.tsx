import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Section } from '@/Components/SectionHeading';
import PageHeader from '@/Components/ui/PageHeader';
import { ArrowIcon, ButtonLink, WhatsAppIcon } from '@/Components/ui/Button';
import type { PageProps, Profile } from '@/types';
import { useT, whatsappContactUrl } from '@/lib/utils';

type Props = PageProps<{
    profile: Profile;
}>;

export default function Contact({ profile }: Props) {
    const { locale } = usePage<PageProps>().props;
    const t = useT();
    const whatsappHref = whatsappContactUrl(profile.phone, t('whatsapp.prefill'));

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

                    <div className="flex flex-col justify-center md:col-span-7">
                        <p className="mb-6 max-w-md text-sm leading-relaxed text-steel sm:text-base">
                            {t('contact.whatsappHint')}
                        </p>
                        <ButtonLink
                            href={whatsappHref ?? '#'}
                            external={Boolean(whatsappHref)}
                            variant="primary"
                            className="group w-full sm:w-auto"
                            leadingIcon={<WhatsAppIcon className="text-[#25D366]" />}
                            icon={<ArrowIcon />}
                            aria-label={t('cta.whatsapp')}
                        >
                            {t('cta.whatsapp')}
                        </ButtonLink>
                    </div>
                </div>
            </Section>
        </AppLayout>
    );
}
