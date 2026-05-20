import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { SocialLinkBar } from '@/components/shared/SocialLinkBar';
import { PurchaseLinkButton } from '@/components/shared/PurchaseLinkButton';
import { sanityFetch } from '@/lib/sanity/fetch';
import { siteSettingsQuery } from '@/lib/sanity/queries';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  const settings = await sanityFetch<any>({ query: siteSettingsQuery });
  const contact = settings?.contactInfo;
  const socialLinks = settings?.socialLinks || [];
  const purchaseLinks = settings?.purchaseLinks || [];

  const address = locale === 'zh'
    ? contact?.address?.zh || contact?.address?.en
    : contact?.address?.en || contact?.address?.zh;
  const workingHours = locale === 'zh'
    ? contact?.workingHours?.zh || contact?.workingHours?.en
    : contact?.workingHours?.en || contact?.workingHours?.zh;

  return (
    <div className="py-section px-6">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading title={t('title')} />

        <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-10">
            {contact?.phone && (
              <div>
                <h3 className="text-xs text-neutral-400 uppercase tracking-wider mb-2">
                  {t('phone')}
                </h3>
                <p className="text-xl text-neutral-800">{contact.phone}</p>
              </div>
            )}

            {contact?.email && (
              <div>
                <h3 className="text-xs text-neutral-400 uppercase tracking-wider mb-2">
                  {t('email')}
                </h3>
                <p className="text-xl text-neutral-800">{contact.email}</p>
              </div>
            )}

            {address && (
              <div>
                <h3 className="text-xs text-neutral-400 uppercase tracking-wider mb-2">
                  {t('address')}
                </h3>
                <p className="text-neutral-700 leading-relaxed whitespace-pre-line">{address}</p>
              </div>
            )}

            {workingHours && (
              <div>
                <h3 className="text-xs text-neutral-400 uppercase tracking-wider mb-2">
                  {t('workingHours')}
                </h3>
                <p className="text-neutral-700">{workingHours}</p>
              </div>
            )}
          </div>

          {/* Social & Purchase Links */}
          <div className="space-y-10">
            {socialLinks.length > 0 && (
              <div>
                <h3 className="text-xs text-neutral-400 uppercase tracking-wider mb-4">
                  {t('followUs')}
                </h3>
                <SocialLinkBar links={socialLinks} />
              </div>
            )}

            {purchaseLinks.filter((l: any) => l.isActive).length > 0 && (
              <div>
                <h3 className="text-xs text-neutral-400 uppercase tracking-wider mb-4">
                  {t('buyOnline')}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {purchaseLinks
                    .filter((l: any) => l.isActive)
                    .map((link: any) => (
                      <PurchaseLinkButton key={link.platform} link={link} />
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Map */}
        {contact?.mapEmbedUrl && (
          <div className="mt-20">
            <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-sm overflow-hidden bg-neutral-200">
              <iframe
                src={contact.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Location"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
