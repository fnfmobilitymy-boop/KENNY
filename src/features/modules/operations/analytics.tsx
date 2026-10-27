"use client";
import { useState } from "react";
import { analyticsMetrics, analyticsSources } from "@/demo/modules/operations";
import {
  ModuleFrame,
  Panel,
  Select,
  TableWrap,
  Disconnected,
} from "../shared/module-ui";
export function Analytics() {
  const [range, setRange] = useState("7");
  const [filter, setFilter] = useState("All sample series");
  const count = Number(range);
  const metrics = analyticsMetrics
    .filter((m) => filter === "All sample series" || m.label === filter)
    .map((m) => ({ ...m, values: m.values.slice(-count) }));
  const metric = metrics[0];
  return (
    <ModuleFrame
      slug="analytics"
      tagline="See the shape of information. Connect real data later."
      related={["marketing", "seo-ads", "crm"]}
    >
      <div className="tool-row analytics-controls">
        <Select
          label="Sample date range"
          value={range}
          onChange={setRange}
          options={[
            { value: "7", label: "Nov 2–8, 2026 · 7 sample days" },
            { value: "3", label: "Nov 6–8, 2026 · 3 sample days" },
          ]}
        />
        <Select
          label="Sample metric filter"
          value={filter}
          onChange={setFilter}
          options={[
            "All sample series",
            ...analyticsMetrics.map((m) => m.label),
          ]}
        />
      </div>
      <div className="tool-metrics">
        {metrics.map((m) => (
          <div key={m.label} className="tool-metric">
            <span>{m.label} · DEMO</span>
            <strong>{m.values.reduce((a, b) => a + b, 0)}</strong>
            <small>Fictional fixture total · Not business performance</small>
          </div>
        ))}
      </div>
      <div className="tool-split">
        <Panel
          title="Fictional trend example"
          kicker="FIXED VALUES / NO LIVE PERFORMANCE"
        >
          <h3>{metric.label}</h3>
          <svg
            className="analytics-chart"
            viewBox="0 0 600 230"
            role="img"
            aria-label={`${metric.label}, fictional values: ${metric.values.join(", ")}. Data table below.`}
          >
            <path d="M40 20v160h530" fill="none" stroke="var(--border)" />
            {[0, 40, 80].map((value) => (
              <g key={value}>
                <line
                  x1="40"
                  x2="570"
                  y1={180 - value * 1.8}
                  y2={180 - value * 1.8}
                  stroke="var(--border)"
                  strokeDasharray="4 6"
                />
                <text
                  x="8"
                  y={184 - value * 1.8}
                  fill="var(--muted)"
                  fontSize="12"
                >
                  {value}
                </text>
              </g>
            ))}
            <polyline
              points={metric.values
                .map(
                  (v, i) =>
                    `${40 + (i / (metric.values.length - 1)) * 530},${180 - v * 1.8}`,
                )
                .join(" ")}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
            />
            {metric.values.map((v, i) => (
              <g key={i}>
                <circle
                  cx={40 + (i / (metric.values.length - 1)) * 530}
                  cy={180 - v * 1.8}
                  r="4"
                  fill="var(--accent)"
                />
                <text
                  x={40 + (i / (metric.values.length - 1)) * 530}
                  y="208"
                  fill="var(--muted)"
                  fontSize="12"
                  textAnchor="middle"
                >
                  Nov {9 - count + i}
                </text>
              </g>
            ))}
          </svg>
          <p>
            Not actual traffic, revenue, ROI or business activity. Filters
            change only which fixed sample rows are shown.
          </p>
          <TableWrap label="Fictional analytics data">
            <table>
              <caption>Accessible values for the fixed sample chart</caption>
              <thead>
                <tr>
                  <th scope="col">Sample date</th>
                  {metrics.map((m) => (
                    <th scope="col" key={m.label}>
                      {m.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: count }, (_, i) => (
                  <tr key={i}>
                    <th scope="row">Nov {9 - count + i}, 2026</th>
                    {metrics.map((m) => (
                      <td key={m.label}>{m.values[i]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        </Panel>
        <Panel title="Data sources" kicker="ALL DISCONNECTED">
          <div className="channel-cards">
            {analyticsSources.map((s) => (
              <div key={s}>
                <strong>{s}</strong>
                <span className="tool-mini-badge">Not connected</span>
              </div>
            ))}
          </div>
          <Disconnected action="Connect analytics data" />
          <Disconnected
            action="Export report"
            reason="No report export exists. No real business metrics are available."
          />
        </Panel>
      </div>
    </ModuleFrame>
  );
}
