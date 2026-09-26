import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { TextLink } from '@/components/ui/TextLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Badge } from '@/components/ui/Badge';
import { navigation, siteConfig } from '@/content/siteConfig';

/**
 * FOOTER
 *
 * Asymmetric like the rest of the page: an oversized wordmark occupying the
 * left half, with three narrow columns of links pushed right. Hairlines only —
 * no filled panel, so the page ends quietly rather than with a slab.
 *
 * Contact rows render only when a real value exists, so the footer does not
 * advertise a placeholder phone number as though it were real.
 */
export function Footer() {
  const { contact, social } = siteConfig;

  const hasPhone = !contact.phone.endsWith('0000000000');
  const hasEmail = !contact.email.startsWith('hello@example');
  // Only platforms the client actually uses. Each carries its own label and
  // handle so the footer can read "Instagram · @handle" rather than showing a
  // bare handle that could be mistaken for the brand name.
  const socials = Object.values(social).filter((p) => p !== null);

  return (
    <Section as="footer" surface="ivory" spacing="default" ruled className="pb-10">
      <Container>
        <div className="gap-block grid lg:grid-cols-12">
          {/* Wordmark — deliberately oversized, deliberately left. */}
          <div className="lg:col-span-5">
            <p className="text-display-2 font-display leading-[0.95]">
              {siteConfig.wordmark.lead}
              <span className="text-stone block">{siteConfig.wordmark.trail}</span>
            </p>
            <p className="text-small text-stone mt-6 max-w-[34ch]">
              {siteConfig.footerNote}
            </p>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <Eyebrow className="mb-5">Explore</Eyebrow>
            <ul className="space-y-0 lg:space-y-3">
              {/* Mobile: each row is a ~45px tap target (17px text + py-3.5).
                  Desktop returns to a tight list. Measured at 17px before
                  this, which fails a comfortable touch target. */}
              {navigation.map((item) => (
                <li key={item.href}>
                  <TextLink
                    href={item.href}
                    className="text-small text-stone hover:text-charcoal block py-3.5 lg:py-0"
                  >
                    {item.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <Eyebrow className="mb-5">Contact</Eyebrow>
            <ul className="space-y-0 lg:space-y-3">
              {/* Mobile: each row is a ~45px tap target (17px text + py-3.5).
                  Desktop returns to a tight list. Measured at 17px before
                  this, which fails a comfortable touch target. */}
              {hasEmail ? (
                <li>
                  <TextLink
                    href={`mailto:${contact.email}`}
                    className="text-small text-stone hover:text-charcoal block py-3.5 lg:py-0"
                  >
                    {contact.email}
                  </TextLink>
                </li>
              ) : (
                <li>
                  <Badge tone="placeholder">TODO: email</Badge>
                </li>
              )}
              {hasPhone ? (
                <li>
                  <TextLink
                    href={`tel:${contact.phone}`}
                    className="text-small text-stone hover:text-charcoal block py-3.5 lg:py-0"
                  >
                    {contact.phone}
                  </TextLink>
                </li>
              ) : (
                <li>
                  <Badge tone="placeholder">TODO: phone</Badge>
                </li>
              )}
              <li className="text-small text-stone py-3.5 lg:py-0">
                {contact.address ?? <Badge tone="placeholder">TODO: address</Badge>}
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <Eyebrow className="mb-5">Follow</Eyebrow>
            {socials.length > 0 ? (
              <ul className="space-y-0 lg:space-y-3">
                {/* Mobile: each row is a ~45px tap target (17px text + py-3.5).
                  Desktop returns to a tight list. Measured at 17px before
                  this, which fails a comfortable touch target. */}
                {socials.map((profile) => (
                  <li key={profile.url}>
                    <TextLink
                      href={profile.url}
                      className="text-small text-stone hover:text-charcoal block py-3.5 lg:py-0"
                    >
                      {profile.label}
                      <span className="text-stone-400"> · {profile.handle}</span>
                    </TextLink>
                  </li>
                ))}
              </ul>
            ) : (
              <Badge tone="placeholder">TODO: socials</Badge>
            )}
          </div>
        </div>

        <div className="rule-t text-micro mt-section flex flex-col gap-3 pt-6 text-stone-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>
            {siteConfig.isPlaceholder ? (
              <span className="text-clay">
                Placeholder content — not for publication.
              </span>
            ) : null}
          </p>
        </div>
      </Container>
    </Section>
  );
}
