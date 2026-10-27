"use client";
import { useState } from "react";
import { plans } from "@/demo/landing";
import {
  ModuleFrame,
  Panel,
  Select,
  Disconnected,
  Notice,
  TableWrap,
} from "../shared/module-ui";
export function Billing() {
  const [plan, setPlan] = useState("Team");
  const [cycle, setCycle] = useState("Monthly concept");
  return (
    <ModuleFrame
      slug="billing"
      tagline="A transparent view of what is—and is not—connected."
      related={["settings", "analytics"]}
    >
      <div className="tool-split">
        <Panel
          title="Current plan preview"
          kicker="NO SUBSCRIPTION DATA CONNECTED"
        >
          <span className="tool-mini-badge">Frontend demo access</span>
          <h3>No active plan is verified.</h3>
          <p>
            This frontend has no billing account, entitlements or subscription
            status. Access to demo screens is not a paid plan.
          </p>
          <Select
            label="Plan direction to compare"
            value={plan}
            onChange={setPlan}
            options={plans.map((p) => p.name)}
          />
          <Select
            label="Billing period concept"
            value={cycle}
            onChange={setCycle}
            options={["Monthly concept", "Annual concept"]}
          />
          <Notice>
            Selected direction: {plan} · {cycle}. This does not change any
            subscription. Pricing to be announced.
          </Notice>
          <Disconnected
            action="Upgrade plan"
            reason="No checkout or payment provider is connected. No finalized price or allowance has been defined."
          />
        </Panel>
        <Panel title="AI credits & usage" kicker="NO LIVE BALANCE">
          <div className="tool-empty">
            <h3>Usage data not connected.</h3>
            <p>
              No real credit balance, allowance or AI usage is available. No AI
              calls are made by these prototypes.
            </p>
          </div>
          <p>
            Future usage will require authenticated metering, entitlement checks
            and billing enforcement on the backend.
          </p>
          <Disconnected
            action="Manage payment method"
            reason="No card details are requested, captured or simulated."
          />
        </Panel>
      </div>
      <Panel
        title="Plan direction comparison"
        kicker="PROPOSED / NOT COMMERCIAL TERMS"
      >
        <div className="billing-plans">
          {plans.map((p) => (
            <article key={p.name} data-selected={plan === p.name}>
              <span className="tool-mini-badge">PLAN CONCEPT</span>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <strong>Pricing to be announced</strong>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <TableWrap label="Plan direction summary">
          <table>
            <caption>
              All limits, availability and commercial terms remain unfinalized
            </caption>
            <thead>
              <tr>
                <th scope="col">Concept</th>
                <th scope="col">Intended use</th>
                <th scope="col">Pricing / allowances</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((p) => (
                <tr key={p.name}>
                  <th scope="row">{p.name}</th>
                  <td>{p.for}</td>
                  <td>To be announced</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </Panel>
      <Panel title="Billing history">
        <div className="tool-empty">
          <h3>No billing records connected.</h3>
          <p>
            No invoice, payment, refund or checkout has been created in this
            demo. A real account history is unavailable.
          </p>
        </div>
      </Panel>
    </ModuleFrame>
  );
}
