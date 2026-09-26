import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

/**
 * PLACEHOLDER HOMEPAGE.
 *
 * Phase 2 delivered the design system only. This page exists so the route
 * resolves; it is replaced wholesale in Phase 3.
 */
export default function HomePage() {
  return (
    <main id="main">
      <Section spacing="loose">
        <Container width="measure">
          <Badge tone="placeholder">Phase 2 — design system only</Badge>
          <SectionHeading
            level={1}
            size="display-2"
            className="mt-8"
            lead="The homepage is built in Phase 3. The design system it will be assembled from is ready to review."
          >
            Foundations in place
          </SectionHeading>
          <div className="mt-10">
            <Button href="/design-system" size="lg">
              View the design system
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
