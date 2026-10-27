"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  sampleLeads,
  leadStages,
  sampleFollowups,
} from "@/demo/modules/growth";
import { filterLeads, moveLead } from "@/lib/module-state";
import type { LeadStage } from "@/types/modules";
import {
  ModuleFrame,
  Panel,
  Input,
  Select,
  Tabs,
  TableWrap,
  Disconnected,
  Notice,
} from "../shared/module-ui";
export function Crm() {
  const [leads, setLeads] = useState([...sampleLeads]);
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState("All");
  const [sort, setSort] = useState("asc");
  const [selected, setSelected] = useState("lead-1");
  const [notice, setNotice] = useState(
    "Fictional records only. No customer database is connected.",
  );
  const rows = filterLeads(leads, query, stage, sort as "asc" | "desc");
  const lead = leads.find((l) => l.id === selected)!;
  function change(id: string, value: string) {
    setLeads((old) => moveLead(old, id, value as LeadStage));
    setNotice(
      "Lead stage changed in local demo state only. No record was saved.",
    );
  }
  return (
    <ModuleFrame
      slug="crm"
      tagline="A clearer view of every relationship, before real data connects."
      related={["sales", "booking", "documents"]}
    >
      <div className="tool-stack">
        <Panel title="Relationship directory" kicker="FICTIONAL SAMPLE RECORDS">
          <div className="tool-fields">
            <Input
              label="Search sample leads"
              value={query}
              onChange={setQuery}
            />
            <div className="tool-row">
              <Select
                label="Filter lead stage"
                value={stage}
                onChange={setStage}
                options={["All", ...leadStages]}
              />
              <Select
                label="Sort leads"
                value={sort}
                onChange={setSort}
                options={[
                  { value: "asc", label: "Name A–Z" },
                  { value: "desc", label: "Name Z–A" },
                ]}
              />
            </div>
          </div>
          <Tabs
            label="CRM views"
            items={[
              {
                id: "list",
                label: "Customer list",
                content: (
                  <TableWrap label="Sample lead table">
                    <table>
                      <caption>
                        {rows.length} fictional leads · Local status changes
                        only
                      </caption>
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Context</th>
                          <th scope="col">Stage</th>
                          <th scope="col">Detail</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((l) => (
                          <tr key={l.id}>
                            <th scope="row">{l.name}</th>
                            <td>{l.detail}</td>
                            <td>{l.stage}</td>
                            <td>
                              <Button
                                variant="ghost"
                                onClick={() => setSelected(l.id)}
                                aria-label={`Inspect ${l.name}`}
                              >
                                Inspect
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </TableWrap>
                ),
              },
              {
                id: "pipeline",
                label: "Sales pipeline",
                content: (
                  <div className="crm-pipeline">
                    {leadStages.map((s) => (
                      <section key={s} aria-label={`${s} pipeline`}>
                        <h3>
                          {s} <small>· DEMO</small>
                        </h3>
                        {rows
                          .filter((l) => l.stage === s)
                          .map((l) => (
                            <button
                              key={l.id}
                              aria-pressed={selected === l.id}
                              onClick={() => setSelected(l.id)}
                            >
                              <strong>{l.name}</strong>
                              <span>{l.detail}</span>
                            </button>
                          ))}
                        {!rows.some((l) => l.stage === s) && (
                          <p>No sample leads in this stage.</p>
                        )}
                      </section>
                    ))}
                  </div>
                ),
              },
            ]}
          />
          {!rows.length && (
            <p role="status">No fictional leads match your filters.</p>
          )}
        </Panel>
        <div className="tool-split">
          <Panel title="Lead detail" kicker="SELECTED FICTIONAL RECORD">
            <h3>{lead.name}</h3>
            <p>
              {lead.detail}
              <br />
              {lead.channel}
            </p>
            <Select
              label="Selected lead stage"
              value={lead.stage}
              onChange={(value) => change(lead.id, value)}
              options={leadStages}
            />
            <Notice>{notice}</Notice>
            <div className="tool-row">
              <Disconnected action="Import contacts" />
              <Disconnected action="Export contacts" />
            </div>
          </Panel>
          <Panel
            title="Follow-up timeline"
            kicker="FIXTURE / NOT LIVE ACTIVITY"
          >
            <ol className="tool-mini-list">
              {sampleFollowups.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            <p>No follow-up was sent and no customer record is stored.</p>
          </Panel>
        </div>
      </div>
    </ModuleFrame>
  );
}
