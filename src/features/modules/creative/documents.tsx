"use client";
import { useState } from "react";
import {
  documentTemplates,
  documentSamples,
  sampleDocumentDraft,
} from "@/demo/modules/creative";
import { documentTotal } from "@/lib/module-state";
import {
  ModuleFrame,
  Panel,
  Catalog,
  Select,
  Input,
  Editor,
  Disconnected,
  Notice,
} from "../shared/module-ui";
export function Documents() {
  const [template, setTemplate] = useState("Proposal");
  const [selected, setSelected] = useState("doc-1");
  const [recipient, setRecipient] = useState(sampleDocumentDraft.recipient);
  const [subject, setSubject] = useState(sampleDocumentDraft.subject);
  const [quantity, setQuantity] = useState(
    String(sampleDocumentDraft.quantity),
  );
  const [amount, setAmount] = useState(String(sampleDocumentDraft.unitAmount));
  const [notes, setNotes] = useState(sampleDocumentDraft.notes);
  const total = documentTotal(Number(quantity), Number(amount));
  return (
    <ModuleFrame
      slug="documents"
      tagline="Thoughtful documents, with room for human review."
      related={["crm", "ecommerce", "workspace"]}
    >
      <div className="tool-split">
        <Panel title="Document desk" kicker="UNSAVED / FICTIONAL">
          <Catalog
            title="Sample documents"
            items={documentSamples}
            selected={selected}
            onSelect={(id) => {
              setSelected(id);
              setTemplate(id === "doc-1" ? "Proposal" : "Quotation");
            }}
          />
          <Select
            label="Document template"
            value={template}
            onChange={setTemplate}
            options={documentTemplates}
          />
          <Input
            label="Recipient label"
            value={recipient}
            onChange={setRecipient}
          />
          <Input
            label="Document subject"
            value={subject}
            onChange={setSubject}
          />
          <div className="tool-fields">
            <Input
              label="Illustrative quantity"
              value={quantity}
              onChange={setQuantity}
              type="number"
              min={0}
              max={9999}
            />
            <Input
              label="Sample unit amount"
              value={amount}
              onChange={setAmount}
              type="number"
              min={0}
              max={999999}
              step={0.01}
            />
          </div>
          <Editor label="Scope or body" value={notes} onChange={setNotes} />
          <Notice>
            Unsaved demo edits. No document, invoice or legal agreement has been
            issued.
          </Notice>
        </Panel>
        <Panel
          title="Live local document preview"
          kicker="NOT A LEGAL OR FINANCIAL RECORD"
        >
          <article
            className="document-paper"
            aria-label="Local document preview"
          >
            <header>
              <span className="document-watermark">
                SAMPLE / DEMO · NOT ISSUED
              </span>
              <h3>{template}</h3>
              <p>Kenny Studio · Illustrative workspace</p>
            </header>
            <p>
              Prepared for:{" "}
              <strong>{recipient || "Recipient placeholder"}</strong>
            </p>
            <h3>{subject || "Untitled local draft"}</h3>
            <p className="tool-preview-copy">
              {notes || "Your local draft text appears here."}
            </p>
            {["Quotation", "Invoice", "Proposal"].includes(template) && (
              <div className="document-total">
                <span>Illustrative total</span>
                <strong>
                  {total === null
                    ? "Invalid amount"
                    : `${total.toFixed(2)} demo units`}
                </strong>
              </div>
            )}
            <p>
              Example units are not a price offer, payable balance or tax
              calculation. This preview is not a contract or actual invoice.
            </p>
            <hr className="tool-divider" />
            <small>
              No signatures, delivery, legal review or issuance service is
              connected.
            </small>
          </article>
          <Disconnected
            action="Export PDF"
            reason="PDF creation is not implemented. No downloadable document is fabricated."
          />
        </Panel>
      </div>
    </ModuleFrame>
  );
}
