"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  websiteProjects,
  websitePages,
  websiteVersions,
  websiteSampleCopy,
} from "@/demo/modules/creative";
import { validateLocalName } from "@/lib/module-state";
import {
  ModuleFrame,
  Panel,
  Catalog,
  Editor,
  Select,
  Input,
  DemoDialog,
  Disconnected,
  Notice,
  Tabs,
} from "../shared/module-ui";
import { SampleArt } from "../shared/sample-art";
export function WebsiteBuilder() {
  const [projects, setProjects] = useState([...websiteProjects]);
  const [selected, setSelected] = useState("site-1");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [prompt, setPrompt] = useState("");
  const [page, setPage] = useState("Home");
  const [viewport, setViewport] = useState("Desktop");
  const [style, setStyle] = useState("Editorial");
  const [version, setVersion] = useState(websiteVersions[0] as string);
  const [notice, setNotice] = useState(
    "Fixed sample website. Your prompt does not generate or change it.",
  );
  return (
    <ModuleFrame
      slug="website-builder"
      tagline="Give your next website a considered starting point."
      related={["workspace", "image-studio", "documents"]}
    >
      <div className="tool-split">
        <div className="tool-stack">
          <Panel
            title="Project library"
            kicker="CONCEPTS, NOT DEPLOYMENTS"
            actions={
              <DemoDialog
                trigger="New project demo"
                title="Name a local concept"
              >
                {
                  <form
                    noValidate
                    onSubmit={(e) => {
                      e.preventDefault();
                      const invalid = validateLocalName(name);
                      setError(invalid || "");
                      if (invalid) {
                        const form = e.currentTarget;
                        requestAnimationFrame(() =>
                          form
                            .querySelector<HTMLElement>('[aria-invalid="true"]')
                            ?.focus(),
                        );
                        return;
                      }
                      const id = `local-${projects.length}`;
                      setProjects((old) => [
                        ...old,
                        {
                          id,
                          name: name.trim(),
                          detail: "Local empty concept · Unsaved",
                        },
                      ]);
                      setSelected(id);
                      setName("");
                      setNotice(
                        "Local concept added. No website or files were created.",
                      );
                      e.currentTarget.closest("dialog")?.close();
                    }}
                  >
                    <Input
                      label="Project name"
                      value={name}
                      onChange={setName}
                      error={error}
                    />
                    <Button type="submit">Add local concept</Button>
                  </form>
                }
              </DemoDialog>
            }
          >
            <Catalog
              title="Website projects"
              items={projects}
              selected={selected}
              onSelect={setSelected}
            />
          </Panel>
          <Panel title="Direction & structure">
            <Editor
              label="Website brief"
              value={prompt}
              onChange={setPrompt}
              hint="Draft only; sample composition is independent of this prompt."
            />
            <Disconnected action="Generate website" />
            <Select
              label="Sample style"
              value={style}
              onChange={setStyle}
              options={["Editorial", "Violet", "Minimal"]}
            />
            <Select
              label="Page structure"
              value={page}
              onChange={setPage}
              options={websitePages}
            />
            <Notice>{notice}</Notice>
          </Panel>
        </div>
        <Panel
          title="Website concept preview"
          kicker="FIXED SAMPLE / NO IFRAME OR EXECUTION"
        >
          <div className="tool-row">
            <Select
              label="Preview viewport"
              value={viewport}
              onChange={setViewport}
              options={["Desktop", "Tablet", "Mobile"]}
            />
            <span className="tool-mini-badge">
              {projects.find((p) => p.id === selected)?.name}
            </span>
          </div>
          {selected.startsWith("local-") ? (
            <div className="tool-empty">
              <h3>A new concept, ready for direction.</h3>
              <p>
                This local project has no generated website. Select a fixed
                project to inspect its sample.
              </p>
            </div>
          ) : (
            <div
              className="website-preview"
              data-viewport={viewport}
              data-style={style}
            >
              <nav aria-label="Sample page structure">
                <strong>
                  {selected === "site-1" ? "FORMA / DEMO" : "MOSS / DEMO"}
                </strong>
                <span>{page} · Fixed composition</span>
              </nav>
              <h3>
                {
                  websiteSampleCopy[page as keyof typeof websiteSampleCopy]
                    .heading
                }
              </h3>
              <p>
                {websiteSampleCopy[page as keyof typeof websiteSampleCopy].body}
              </p>
              <SampleArt
                name="Website editorial study"
                palette={style === "Violet" ? "violet" : "blue"}
                variant={selected === "site-1" ? 1 : 0}
              />
            </div>
          )}
          <Tabs
            label="Website concept details"
            items={[
              {
                id: "history",
                label: "Version history",
                content: (
                  <>
                    <Select
                      label="Fixed version history"
                      value={version}
                      onChange={setVersion}
                      options={websiteVersions}
                    />
                    <p>
                      {version}. Historical descriptions only; no actual
                      revision is restored.
                    </p>
                  </>
                ),
              },
              {
                id: "handoff",
                label: "Handoff",
                content: (
                  <p>
                    Future handoff will require real generation, file validation
                    and deployment authorization. No deployable files exist in
                    this prototype.
                  </p>
                ),
              },
            ]}
          />
          <div className="tool-row">
            <Disconnected action="Publish" />
            <Disconnected action="Export files" />
          </div>
        </Panel>
      </div>
    </ModuleFrame>
  );
}
