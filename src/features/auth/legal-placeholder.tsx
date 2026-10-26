import { Brand } from "@/components/brand/brand";
import { ButtonLink } from "@/components/ui/button-link";
export function LegalPlaceholder({
  kind,
}: {
  kind: "Terms" | "Privacy notice";
}) {
  return (
    <div className="account-page">
      <header className="account-header">
        <Brand />
      </header>
      <main id="main" className="legal-placeholder card">
        <p className="eyebrow">LEGAL CONTENT / PLACEHOLDER</p>
        <h1>{kind}</h1>
        <div className="demo-notice">
          <span className="tiny-dot" />
          <div>
            <strong>Not a final legal document</strong>
            <p>
              This placeholder is provided only for navigation and design
              review. It is not a published policy or binding set of terms.
            </p>
          </div>
        </div>
        <p className="muted">
          Final legal content, privacy disclosures and consent requirements must
          be reviewed before production registration is enabled. Authentication
          and data collection services are not connected in this milestone.
        </p>
        <p className="muted">
          Please use sample information in the interface. Do not enter passwords
          you use elsewhere or confidential business information.
        </p>
        <ButtonLink href="/signup" variant="secondary">
          Back to registration preview
        </ButtonLink>
      </main>
    </div>
  );
}
