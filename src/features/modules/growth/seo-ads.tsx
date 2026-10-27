"use client";
import { useState } from "react";
import { keywordSamples, seoDraftSample } from "@/demo/modules/growth";
import { planningEstimate } from "@/lib/module-state";
import {
  ModuleFrame,
  Panel,
  Input,
  Select,
  Editor,
  Checks,
  Disconnected,
  TableWrap,
  Notice,
} from "../shared/module-ui";
export function SeoAds() {
  const [url, setUrl] = useState("");
  const [query, setQuery] = useState("");
  const [text, setText] = useState(seoDraftSample.content);
  const [objective, setObjective] = useState("Awareness");
  const [campaign, setCampaign] = useState(seoDraftSample.campaign);
  const [daily, setDaily] = useState(seoDraftSample.daily);
  const [days, setDays] = useState(seoDraftSample.days);
  const estimate = planningEstimate(Number(daily), Number(days));
  const rows = keywordSamples.filter((k) =>
    k.term.includes(query.toLowerCase().trim()),
  );
  return (
    <ModuleFrame
      slug="seo-ads"
      tagline="Organize search ideas before connecting a single account."
      related={["marketing", "website-builder", "analytics"]}
    >
      <div className="tool-split">
        <div className="tool-stack">
          <Panel title="Website audit brief">
            <Input
              label="Website address"
              value={url}
              onChange={setUrl}
              type="url"
              hint="Local text only. This URL is never fetched or crawled."
            />
            <Disconnected
              action="Run website audit"
              reason="No crawler, keyword provider or Google account is connected."
            />
            <Checks
              label="SEO review checklist"
              items={[
                "Use a clear page title",
                "Write descriptive headings",
                "Review alternative text",
                "Check useful internal links",
              ]}
            />
          </Panel>
          <Panel title="Google Ads draft" kicker="NOT CONNECTED">
            <Input
              label="Campaign draft name"
              value={campaign}
              onChange={setCampaign}
            />
            <Select
              label="Campaign objective"
              value={objective}
              onChange={setObjective}
              options={["Awareness", "Consideration", "Leads"]}
            />
            <div className="tool-fields">
              <Input
                label="Illustrative daily budget units"
                value={daily}
                onChange={setDaily}
                type="number"
                min={0}
                max={10000}
              />
              <Input
                label="Planning days"
                value={days}
                onChange={setDays}
                type="number"
                min={1}
                max={90}
              />
            </div>
            <Notice>
              {estimate === null
                ? "Use a nonnegative budget up to 10,000 units and 1–90 days."
                : `Illustrative planning envelope: ${estimate} demo units. Not a quote, charge or performance forecast.`}
            </Notice>
            <Disconnected action="Send campaign to Google Ads" />
          </Panel>
        </div>
        <div className="tool-stack">
          <Panel
            title="Keyword research samples"
            kicker="FICTIONAL VALUES / NOT LIVE RESEARCH"
          >
            <Input
              label="Filter sample keywords"
              value={query}
              onChange={setQuery}
            />
            <TableWrap label="Sample keyword table">
              <table>
                <caption>
                  Fixed illustrative values, not actual search volumes
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Keyword</th>
                    <th scope="col">Intent</th>
                    <th scope="col">Sample volume</th>
                    <th scope="col">Difficulty example</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((k) => (
                    <tr key={k.term}>
                      <td>{k.term}</td>
                      <td>{k.intent}</td>
                      <td>{k.volume}</td>
                      <td>{k.difficulty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableWrap>
            {!rows.length && <p role="status">No sample keywords match.</p>}
          </Panel>
          <Panel title="Content optimization draft">
            <Editor label="Content draft" value={text} onChange={setText} />
            <p>
              {text.trim() ? text.trim().split(/\s+/).length : 0} local words ·
              No quality, ranking or optimization score is calculated.
            </p>
            <div className="tool-empty">
              <h3>Analytics not connected.</h3>
              <p>No site traffic or advertising performance is available.</p>
            </div>
          </Panel>
        </div>
      </div>
    </ModuleFrame>
  );
}
