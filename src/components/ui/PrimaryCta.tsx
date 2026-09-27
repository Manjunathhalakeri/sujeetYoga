import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button, type ButtonSize } from '@/components/ui/Button';
import { primaryAction } from '@/lib/contact';

/**
 * THE PRIMARY CALL TO ACTION, as a component.
 *
 * Every "the main thing we want you to do" button on the site renders through
 * this: header, hero, each programme page, and the closing CTA on every
 * interior page. It asks `primaryAction()` where it goes and what it says, so
 * the destination is one decision in `siteConfig` rather than eight decisions
 * scattered across eight files.
 *
 * Why the label names WhatsApp: tapping this leaves the website and opens a
 * different application, with a message already typed. A button that does that
 * has to say so before it is pressed — "Enquire" would be a small lie about
 * where the tap goes. The icon reinforces it; the label carries it, because the
 * icon is aria-hidden and a screen reader never sees it.
 *
 * `target="_blank"` is deliberate. On a phone the OS hands off to the WhatsApp
 * app and the site stays loaded behind it; on a desktop it opens WhatsApp Web
 * in a new tab rather than navigating the visitor off the site entirely. The
 * accessible warning is the label itself, which already names the destination.
 *
 * If the WhatsApp number is ever unset, `primaryAction()` returns the enquiry
 * form instead and this component quietly becomes an internal link with an
 * arrow. Nothing here has to handle that case.
 */
export function PrimaryCta({
  size = 'md',
  block = false,
  /** Use the short label. For the header, where horizontal space is tight. */
  short = false,
  className,
  /** Side effect on tap — the mobile menu uses it to close itself. */
  onClick,
}: {
  size?: ButtonSize;
  block?: boolean;
  short?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const action = primaryAction();
  const iconSize = size === 'sm' ? 15 : 17;

  return (
    <Button
      href={action.href}
      size={size}
      block={block}
      className={className}
      onClick={onClick}
      {...(action.isWhatsapp ? { target: '_blank' } : {})}
      icon={
        action.isWhatsapp ? (
          <MessageCircle size={iconSize} strokeWidth={1.75} />
        ) : (
          <ArrowRight size={iconSize} strokeWidth={1.75} />
        )
      }
    >
      {short ? action.shortLabel : action.label}
    </Button>
  );
}
