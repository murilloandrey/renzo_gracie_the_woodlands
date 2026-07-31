import { createFileRoute, Link } from "@tanstack/react-router";

import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
});

function Privacy() {
  return (
    <div className="min-h-screen bg-obsidian text-bone">
      <Seo
        title="Privacy Policy | Renzo Gracie The Woodlands"
        description="Learn what information Renzo Gracie The Woodlands collects, how it is used, and how to request deletion."
        path="/privacy"
        noindex={false}
      />

      <header className="grain border-b border-border px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-4xl">
          <Link to="/" className="eyebrow transition-colors hover:text-primary">
            Renzo Gracie The Woodlands
          </Link>
          <h1 className="font-display mt-5 text-5xl leading-none md:text-7xl">
            Privacy Policy
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">
            A plain-language explanation of what this website collects and how
            that information is used.
          </p>
        </div>
      </header>

      <main className="px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-4xl space-y-12">
          <PolicySection title="What We Collect">
            <p>
              When you submit a free-trial form, we collect the name, email
              address, and phone number you provide.
            </p>
            <p>
              We also use Google Analytics and Microsoft Clarity to understand
              how visitors use the site. These tools may collect information
              about your device, browser, pages visited, and interactions.
              Microsoft Clarity also provides session recordings and heatmaps.
            </p>
          </PolicySection>

          <PolicySection title="Why We Collect It">
            <p>
              We use form information to respond to trial requests and help
              schedule a visit. We use analytics to understand how visitors use
              the site and where the experience can be improved.
            </p>
          </PolicySection>

          <PolicySection title="How Information Is Shared">
            <p>
              We do not sell your data. We do not share it beyond the services
              named on this page: Google Analytics and Microsoft Clarity, which
              process analytics data on our behalf.
            </p>
          </PolicySection>

          <PolicySection title="Your Choices">
            <p>
              To request deletion of information you submitted, email{" "}
              <a
                href="mailto:info@renzograciethewoodlands.com"
                className="text-bone underline decoration-primary underline-offset-4 hover:text-primary"
              >
                info@renzograciethewoodlands.com
              </a>
              .
            </p>
          </PolicySection>

          <PolicySection title="Third-Party Policies">
            <ul className="space-y-3">
              <li>
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noreferrer"
                  className="text-bone underline decoration-primary underline-offset-4 hover:text-primary"
                >
                  Google Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://www.microsoft.com/en-us/privacy/privacystatement"
                  target="_blank"
                  rel="noreferrer"
                  className="text-bone underline decoration-primary underline-offset-4 hover:text-primary"
                >
                  Microsoft Privacy Statement
                </a>
              </li>
            </ul>
          </PolicySection>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border pt-8">
      <div className="eyebrow mb-3">Privacy</div>
      <h2 className="font-display text-3xl md:text-4xl">{title}</h2>
      <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
        {children}
      </div>
    </section>
  );
}
