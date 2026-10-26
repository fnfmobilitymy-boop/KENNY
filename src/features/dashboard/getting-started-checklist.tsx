"use client";
import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { demoChecklist } from "@/demo/dashboard";
import { DemoBadge } from "./components";
export function GettingStartedChecklist() {
  const [checked, setChecked] = useState<string[]>([]);
  return (
    <Card className="getting-started-card">
      <div className="panel-heading">
        <h2>Make it your studio.</h2>
        <DemoBadge>Local checklist</DemoBadge>
      </div>
      <p className="panel-description">
        A few places to explore. Checkmarks reset when this page is left or
        refreshed.
      </p>
      <ul className="getting-started-list">
        {demoChecklist.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={checked.includes(item.id)}
                onChange={() =>
                  setChecked((current) =>
                    current.includes(item.id)
                      ? current.filter((id) => id !== item.id)
                      : [...current, item.id],
                  )
                }
              />
              <span>{item.label}</span>
            </label>
            <Link href={item.href} aria-label={`Open ${item.label}`}>
              Open
            </Link>
          </li>
        ))}
      </ul>
      <p className="checklist-status" role="status">
        {checked.length} of {demoChecklist.length} explored in this preview.
        Nothing saved.
      </p>
    </Card>
  );
}
