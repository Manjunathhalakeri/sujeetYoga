import type { Metadata } from 'next';
import { MessageCircle, Mail, Phone, AtSign, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Mark } from '@/components/ui/Rule';
import { Reveal } from '@/components/ui/Reveal';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { contactState, mailtoUrl, telUrl, whatsappUrl } from '@/lib/contact';
import { siteConfig } from '@/content/siteConfig';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Placeholder description for the contact page. TODO: replace once real contact details are supplied.',
  alternates: { canonical: '/contact' },
};

/**
 * CONTACT — a conversation, not a support desk.
 *
 * Composition: the page opens with a large centred statement rather than the
 * offset PageHeader used elsewhere. After five left-weighted pages a centred
 * opening reads as an invitation and a deliberate change of pace — this is the
 * one page where symmetry is the stronger choice.
 *
 * Below that it returns to the house asymmetry: contact options in a narrow
 * left rail, the form in the wider right column.
 *
 * ⚠ Every contact method is guarded by lib/contact.ts. While a value is still
 * the placeholder, the row renders a TODO badge and NOT a link — so no visitor
 * can ever tap a fake phone number or a dead WhatsApp deep link. The moment a
 * real value is set in siteConfig, each row becomes live with no code change.
 */

function ContactRow({
  icon,
  label,
  value,
  href,
  todo,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string | null;
  todo: string;
}) {
  return (
    <div className="rule-b py-5">
      <div className="text-eyebrow text-bone-faint flex items-center gap-2 uppercase">
        <span aria-hidden="true" className="text-bone-faint">
          {icon}
        </span>
        {label}
      </div>
      <div className="mt-2">
        {href ? (
          <a
            href={href}
            className="link-underline hover:text-sage tap-44 rounded-xs transition-colors"
            {...(href.startsWith('http')
              ? { rel: 'noopener noreferrer', target: '_blank' }
              : {})}
          >
            {value}
          </a>
        ) : (
          <Badge tone="placeholder">{todo}</Badge>
        )}
      </div>
    </div>
  );
}

export default function ContactPage() {
  const wa = whatsappUrl('Hello — I would like to ask about classes.');
  const tel = telUrl();
  const mail = mailtoUrl('Class enquiry');
  const instagram = contactState.instagram;
  const address = contactState.address;

  return (
    <>
      {/* ---------------- Centred opening ------------------------------------ */}
      <Section spacing="none" className="pb-section pt-[calc(var(--header-h)+4rem)]">
        <Container>
          <Reveal>
            <div className="max-w-measure mx-auto text-center">
              <Mark className="mx-auto mb-5" />
              <Eyebrow className="mb-4">Contact</Eyebrow>
              <h1 className="text-display-1 font-display text-balance">Say hello.</h1>
              <p className="text-lead text-bone-dim mx-auto mt-7 max-w-[42ch]">
                Placeholder. A warm, plain invitation to get in touch — no experience
                assumed, no obligation implied, and a note on how quickly a reply usually
                comes.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------- Options rail + form -------------------------------- */}
      <Section surface="raised" spacing="loose">
        <Container>
          <div className="gap-block grid lg:grid-cols-12 lg:gap-x-10">
            {/* Direct options */}
            <div className="lg:col-span-4">
              <Reveal>
                <h2 className="text-h3 font-display">
                  Reach {siteConfig.personName} directly
                </h2>
                <p className="text-small text-bone-dim mt-3 max-w-[34ch]">
                  Placeholder. The quickest ways to get an answer.
                </p>

                {/* WhatsApp first — it is how most enquiries actually arrive in
                    India. Rendered as a real CTA only once a number exists. */}
                <div className="mt-8">
                  {wa ? (
                    <Button
                      href={wa}
                      size="lg"
                      block
                      icon={<MessageCircle size={17} strokeWidth={1.75} />}
                    >
                      Message on WhatsApp
                    </Button>
                  ) : (
                    <div className="rule-t rule-b bg-ink-raised/60 px-4 py-5">
                      <div className="text-eyebrow text-bone-faint flex items-center gap-2 uppercase">
                        <MessageCircle size={13} strokeWidth={1.75} aria-hidden="true" />
                        WhatsApp
                      </div>
                      <p className="mt-3">
                        <Badge tone="placeholder">TODO: WhatsApp number</Badge>
                      </p>
                      <p className="text-micro text-bone-faint mt-3 max-w-[32ch]">
                        No number has been supplied, so no WhatsApp link is shown. Add it
                        to <code>siteConfig.contact.whatsapp</code> and this becomes a
                        direct CTA.
                      </p>
                    </div>
                  )}
                </div>

                <div className="rule-t mt-8">
                  <ContactRow
                    icon={<Mail size={13} strokeWidth={1.75} />}
                    label="Email"
                    value={siteConfig.contact.email}
                    href={mail}
                    todo="TODO: email address"
                  />
                  <ContactRow
                    icon={<Phone size={13} strokeWidth={1.75} />}
                    label="Phone"
                    value={siteConfig.contact.phone}
                    href={tel}
                    todo="TODO: phone number"
                  />
                  <ContactRow
                    icon={<AtSign size={13} strokeWidth={1.75} />}
                    label="Instagram"
                    value={instagram ? instagram.handle : ''}
                    href={instagram ? instagram.url : null}
                    todo="TODO: Instagram"
                  />
                  <ContactRow
                    icon={<MapPin size={13} strokeWidth={1.75} />}
                    label="Where"
                    value={address ?? ''}
                    href={null}
                    todo="TODO: location & directions"
                  />
                </div>
              </Reveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal delay={0.06}>
                <h2 className="text-display-2 font-display max-w-[16ch] text-balance">
                  Or send a message.
                </h2>
                <p className="text-small text-bone-dim mt-5 max-w-[44ch]">
                  Placeholder. Tell us a little about what you are looking for — there is
                  no wrong answer, and no experience is assumed.
                </p>

                {/* Honest about the current state. Remove this notice in the same
                    commit that connects a real submitter. */}
                <p className="text-micro text-clay border-clay/40 mt-8 border-l-2 py-2 pl-4">
                  Development note: this form is not connected to a backend yet, so
                  nothing is sent. Use the direct options for now.
                </p>

                <div className="mt-10">
                  <EnquiryForm />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------- Location ------------------------------------------- */}
      <Section spacing="loose">
        <Container>
          <Reveal>
            <div className="max-w-measure mx-auto text-center">
              <h2 className="text-eyebrow text-bone-faint uppercase">Finding us</h2>
              {address ? (
                <p className="text-lead mt-6">{address}</p>
              ) : (
                <>
                  <p className="mt-6">
                    <Badge tone="placeholder">TODO: address &amp; directions</Badge>
                  </p>
                  <p className="text-small text-bone-dim mx-auto mt-5 max-w-[40ch]">
                    No address is published because none has been supplied. A map will be
                    added here once the location is confirmed.
                  </p>
                </>
              )}
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
