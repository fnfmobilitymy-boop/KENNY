"use client";
import { useState } from "react";
import {
  sampleAppointments,
  bookingDays,
  bookingMonthDays,
} from "@/demo/modules/operations";
import { appointmentConflicts } from "@/lib/module-state";
import {
  ModuleFrame,
  Panel,
  Select,
  Input,
  Catalog,
  Disconnected,
  Notice,
  Checks,
} from "../shared/module-ui";
export function Booking() {
  const [view, setView] = useState("Week");
  const [day, setDay] = useState("2026-11-02");
  const [selected, setSelected] = useState("appt-1");
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("17:00");
  const [time, setTime] = useState("10:15");
  const [duration, setDuration] = useState("30");
  const rows = sampleAppointments.filter((a) => a.day === day);
  const active = sampleAppointments.find((a) => a.id === selected)!;
  const conflict = appointmentConflicts(
    sampleAppointments,
    day,
    time,
    Number(duration),
  );
  const dates = view === "Month" ? bookingMonthDays : bookingDays;
  return (
    <ModuleFrame
      slug="booking"
      tagline="Plan availability with a little more breathing room."
      related={["crm", "sales", "automations"]}
    >
      <div className="tool-stack">
        <Panel
          title="Sample appointment calendar"
          kicker="FIXED NOVEMBER 2026 / NO SYNC"
        >
          <Select
            label="Calendar view"
            value={view}
            onChange={setView}
            options={["Week", "Month"]}
          />
          <div
            className="booking-calendar"
            data-view={view}
            role="group"
            aria-label="Sample booking dates"
          >
            {dates.map((d) => (
              <button
                key={d.id}
                aria-pressed={day === d.id}
                onClick={() => setDay(d.id)}
              >
                <strong>{d.label}</strong>
                <span>
                  {sampleAppointments.some((a) => a.day === d.id)
                    ? "Sample appointment"
                    : "Empty"}
                </span>
              </button>
            ))}
          </div>
        </Panel>
        <div className="tool-split">
          <div className="tool-stack">
            <Panel title="Appointment list">
              <Catalog
                title="Sample appointments"
                items={rows}
                selected={selected}
                onSelect={setSelected}
              />
              {!rows.length && <p>No fictional appointments on this date.</p>}
              <div className="tool-divider" />
              <h3>Selected sample details</h3>
              <p>
                {active.name}
                <br />
                {active.day} · {active.time} · {active.duration} minutes
                <br />
                {active.detail}
              </p>
              <Disconnected action="Create real booking" />
            </Panel>
            <Panel title="Reminder configuration">
              <Checks
                label="Reminder preferences"
                items={[
                  "Email reminder preview",
                  "Human review before reminders",
                ]}
              />
              <p>Local settings only. No reminders are scheduled or sent.</p>
              <Disconnected action="Sync calendar" />
            </Panel>
          </div>
          <div className="tool-stack">
            <Panel title="Availability draft">
              <Select
                label="Availability day"
                value={day}
                onChange={setDay}
                options={bookingMonthDays.map((d) => ({
                  value: d.id,
                  label: d.label,
                }))}
              />
              <div className="tool-fields">
                <Input
                  label="Local opening time"
                  value={start}
                  onChange={setStart}
                  type="time"
                />
                <Input
                  label="Local closing time"
                  value={end}
                  onChange={setEnd}
                  type="time"
                />
              </div>
              <Notice>
                {!start || !end || start >= end
                  ? "Choose an opening time earlier than closing time."
                  : `Local availability draft: ${start}–${end}. Not saved to a calendar.`}
              </Notice>
            </Panel>
            <Panel
              title="Conflict example"
              kicker="COMPARE AGAINST FICTIONAL FIXTURES"
            >
              <div className="tool-fields">
                <Input
                  label="Conflict preview time"
                  value={time}
                  onChange={setTime}
                  type="time"
                />
                <Select
                  label="Conflict preview duration"
                  value={duration}
                  onChange={setDuration}
                  options={["15", "30", "60"]}
                />
              </div>
              <Notice>
                {!time
                  ? "Choose a sample time."
                  : conflict
                    ? "Sample conflict: this interval overlaps a fictional appointment. No booking was attempted."
                    : "No overlap in the selected fixture interval. This is not a live availability check."}
              </Notice>
            </Panel>
          </div>
        </div>
      </div>
    </ModuleFrame>
  );
}
