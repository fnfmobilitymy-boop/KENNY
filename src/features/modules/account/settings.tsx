"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { ThemeToggle } from "@/components/providers/theme-provider";
import {
  profileSample,
  teamSamples,
  integrationSamples,
  notificationSamples,
} from "@/demo/modules/account";
import { industries } from "@/demo/onboarding";
import { validateLocalName } from "@/lib/module-state";
import {
  ModuleFrame,
  Panel,
  Input,
  Select,
  Tabs,
  Checks,
  Disconnected,
  Notice,
  TableWrap,
} from "../shared/module-ui";
function ProfileSettings() {
  const [name, setName] = useState<string>(profileSample.name);
  const [email, setEmail] = useState<string>(profileSample.email);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [notice, setNotice] = useState(
    "Local profile draft only. No authenticated account is connected.",
  );
  return (
    <Panel title="Profile draft">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          const next = {
            name: validateLocalName(name) || undefined,
            email:
              /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254
                ? undefined
                : "Use a valid sample email address.",
          };
          setErrors(next);
          if (next.name || next.email) {
            setNotice("Check the marked local fields. Nothing was saved.");
            const form = e.currentTarget;
            requestAnimationFrame(() =>
              form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
            );
            return;
          }
          setNotice(
            "Local profile draft checked. No account was updated or saved.",
          );
        }}
      >
        <Input
          label="Demo display name"
          value={name}
          onChange={setName}
          error={errors.name}
        />
        <Input
          label="Demo email address"
          value={email}
          onChange={setEmail}
          type="email"
          error={errors.email}
        />
        <Button type="submit">Check local profile draft</Button>
      </form>
      <Notice>{notice}</Notice>
    </Panel>
  );
}
function WorkspaceSettings() {
  const [name, setName] = useState<string>(profileSample.workspace);
  const [industry, setIndustry] = useState<string>(profileSample.industry);
  const [timezone, setTimezone] = useState<string>(profileSample.timezone);
  return (
    <Panel title="Workspace details draft">
      <Input
        label="Local workspace name"
        value={name}
        onChange={setName}
        error={validateLocalName(name) || undefined}
      />
      <Select
        label="Workspace industry draft"
        value={industry}
        onChange={setIndustry}
        options={industries}
      />
      <Select
        label="Workspace timezone draft"
        value={timezone}
        onChange={setTimezone}
        options={[
          "Asia/Kuala_Lumpur",
          "Europe/London",
          "America/New_York",
          "Etc/UTC",
        ]}
      />
      <Notice>
        Unsaved local draft for {name || "an unnamed concept"}. No organization
        or global workspace identity is updated.
      </Notice>
    </Panel>
  );
}
function AppearanceSettings() {
  const [density, setDensity] = useState("Comfortable");
  return (
    <Panel title="Appearance">
      <p>
        The theme control uses the existing shared theme preference. Theme is
        the only persistent preference here; module contents are never stored.
      </p>
      <ThemeToggle />
      <Select
        label="Local density preview"
        value={density}
        onChange={setDensity}
        options={["Comfortable", "Compact"]}
      />
      <div className="density-preview" data-density={density}>
        <div>Sample panel spacing</div>
        <div>Sample row spacing</div>
      </div>
      <Notice>
        Density changes only this local spacing example. Motion follows your
        device’s reduced-motion preference.
      </Notice>
    </Panel>
  );
}
function TeamSettings() {
  const [role, setRole] = useState("Editor concept");
  return (
    <Panel
      title="Team & roles preview"
      kicker="FICTIONAL MEMBERS / NO AUTHORIZATION"
    >
      <TableWrap label="Fictional team table">
        <table>
          <caption>Illustrative team, not actual workspace membership</caption>
          <thead>
            <tr>
              <th scope="col">Fictional member</th>
              <th scope="col">Role concept</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {teamSamples.map((m) => (
              <tr key={m.id}>
                <th scope="row">{m.name}</th>
                <td>{m.id === "member-2" ? role : m.role}</td>
                <td>Sample only</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>
      <Select
        label="Morgan role concept"
        value={role}
        onChange={setRole}
        options={["Editor concept", "Viewer concept", "Reviewer concept"]}
      />
      <Notice>
        Role labels change locally. No permissions, membership or tenant
        isolation are enforced.
      </Notice>
      <Disconnected action="Invite team member" />
    </Panel>
  );
}
export function Settings() {
  return (
    <ModuleFrame
      slug="settings"
      tagline="Make the studio feel familiar. Connect real account controls later."
      related={["billing", "workspace"]}
    >
      <Tabs
        label="Settings sections"
        items={[
          { id: "profile", label: "Profile", content: <ProfileSettings /> },
          {
            id: "workspace",
            label: "Workspace details",
            content: <WorkspaceSettings />,
          },
          {
            id: "appearance",
            label: "Appearance",
            content: <AppearanceSettings />,
          },
          {
            id: "notifications",
            label: "Notifications",
            content: (
              <Panel title="Notification preferences">
                <Checks
                  label="Local notification preferences"
                  items={notificationSamples}
                />
                <Notice>
                  Unsaved preference preview. No notifications, emails or
                  reminders are delivered.
                </Notice>
              </Panel>
            ),
          },
          { id: "team", label: "Team and roles", content: <TeamSettings /> },
          {
            id: "security",
            label: "Security",
            content: (
              <Panel title="Security connections">
                <p>
                  No authentication session or security policy service is
                  connected. MFA, active sessions and account security status
                  cannot be verified by this frontend.
                </p>
                <Disconnected action="Change password" />
                <Disconnected action="Configure MFA" />
                <Disconnected
                  action="Delete account"
                  reason="Account deletion is not implemented. No destructive server action is available."
                />
              </Panel>
            ),
          },
          {
            id: "integrations",
            label: "Integrations",
            content: (
              <Panel title="Integration connections">
                <div className="channel-cards">
                  {integrationSamples.map((name) => (
                    <div key={name}>
                      <strong>{name} · Not connected</strong>
                      <Disconnected action={`Connect ${name}`} />
                    </div>
                  ))}
                </div>
                <p>
                  No API keys or credentials are requested in this frontend.
                </p>
              </Panel>
            ),
          },
          {
            id: "billing",
            label: "Billing entry",
            content: (
              <Panel title="Billing settings">
                <p>
                  Review proposed plan directions and disconnected payment/usage
                  states. No checkout or actual billing changes are available.
                </p>
                <ButtonLink href="/app/billing">
                  Open Billing preview
                </ButtonLink>
              </Panel>
            ),
          },
        ]}
      />
    </ModuleFrame>
  );
}
